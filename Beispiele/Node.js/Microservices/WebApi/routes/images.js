var express = require('express');
var router = express.Router();
const { uuid } = require('uuidv4');
const fs = require('fs');

let channel = null;
const storageBasePath = '/tmp/shared';

const rabbitMq = require('amqplib').connect('amqp://' + (process.env.RABBITMQ_HOST || 'localhost'))
    .then(conn => conn.createChannel())
    .then((ch) => {
        ch.assertQueue("ImageUploaded", { durable: false });
        channel = ch;
    });

/* GET home page. */
router.get('/:imageId', (req, res) => {
  res.send("Images");
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

function publishImageUploadedEvent(imageId, uploadDestination) {
    const imageUploadedEvent = {
        imageId: imageId,
        uploadDestination: uploadDestination,
        timestamp: new Date().toISOString(),
    };

    channel.sendToQueue("ImageUploaded", Buffer.from(JSON.stringify(imageUploadedEvent)));
}


module.exports = router;
