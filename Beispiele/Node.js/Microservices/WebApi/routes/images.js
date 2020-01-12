var express = require('express');
var router = express.Router();
const { uuid } = require('uuidv4');
const fs = require('fs');

let channel = null;
const storageBasePath = '/tmp/shared';

const mimeTypeLookup = {
    JPEG: "image/jpg",
    PNG: "image/png",
};

const rabbitMq = require('amqplib').connect('amqp://' + (process.env.RABBITMQ_HOST || 'localhost'))
    .then(conn => conn.createChannel())
    .then((ch) => {
        ch.assertQueue("ImageUploaded", { durable: false });
        channel = ch;
    });

// List all uploaded images
router.get('/', async (req, res) => {
    const doneFolder = '/tmp/shared/done';
    const files = await fs.promises.readdir(doneFolder);

    const imageIds = files.filter((f) => f.endsWith(".meta.json")).map((f) => f.substr(0, 36));

    res.send(JSON.stringify(imageIds));
});

router.post('/upload', (req, res) => {
    // Pipe the request-stream into the busboy requsest parser
    req.pipe(req.busboy);

    // Whenever busboy detects a file-upload field
    req.busboy.on('file', (fieldname, file, filename) => {
        console.log(" * Processing file upload for '" + filename + "'");

        var newImageId = uuid();
        
        const uploadDestination = storageBasePath + '/in-flight/' + newImageId;
        const fstream = fs.createWriteStream(uploadDestination);
        file.pipe(fstream);     

        fstream.on('close', () => {
            console.log(" * File upload of '" + filename + "' done, uploadDestination='" + uploadDestination + "'");

            publishImageUploadedEvent(newImageId, uploadDestination);
        });
    });

    // When busboy is done with the request parsing
    req.busboy.on('finish', () => {
        res.sendStatus(200);
    })
});

router.get("/:imageId", async (req, res) => {
    const imageId = req.params.imageId;
    const imagePath = '/tmp/shared/done/' + imageId;

    // Check if the image acutally exists
    try {
        await fs.promises.stat(imagePath);
    }
    catch(ex) {
        return res.sendStatus(404);
    }

    // Read the metadata from disk
    const metaPath = imagePath + '.meta.json';
    var metadata = JSON.parse(await fs.promises.readFile(metaPath));

    // Set correct Content-Type header
    res.type(mimeTypeLookup[metadata.format]);
    // Send back the bytes
    res.sendFile(imagePath);
});

function publishImageUploadedEvent(imageId, uploadDestination) {
    const imageUploadedEvent = {
        imageId: imageId,
        uploadDestination: uploadDestination,
        timestamp: new Date().toISOString(),
    };

    channel.sendToQueue("ImageUploaded", Buffer.from(JSON.stringify(imageUploadedEvent)));
}


module.exports = router;
