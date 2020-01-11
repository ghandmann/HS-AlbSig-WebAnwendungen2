var amqp = require('amqplib/callback_api');
const fs = require('fs');
const imagemagick = require('imagemagick');

console.log(" [*] ImageFingerprintService starting...");

const incomingQueue = 'ImageUploaded';
const fingerprintQueue = 'ImageFingerprint';
const uploadFailedQueue = 'ImageFailed';

amqp.connect('amqp://localhost', function(connectError, connection) {
    if (connectError) {
        throw connectError;
    }
    connection.createChannel(function(createChannelError, channel) {
        if (createChannelError) {
            throw createChannelError;
        }

        channel.assertQueue(incomingQueue, {
            durable: false
        });

        channel.assertQueue(fingerprintQueue, {
            durable: false,
        });

        channel.assertQueue(uploadFailedQueue, {
            durable: false,
        });

        console.log(" [*] Waiting for messages in %s. To exit press CTRL+C", incomingQueue);

        channel.consume(incomingQueue, (msg) => createImageFingerprint(msg, channel), {
            noAck: true
        });
    });
});

function createImageFingerprint(incomingMessage, channel) {
    const json = incomingMessage.content.toString();
    console.log(" [x] Received raw message=%s", json);
    const msg = JSON.parse(json);
    console.log(" [x] Validating imageId='" + msg.imageId + "'");

    // Artificiall delay processing of the message by using a timeout
    setTimeout(() => {
        imagemagick.identify(msg.uploadDestination, (err, metadata) => {
            if(err) {
                console.log(" [E] Image with imageId='" + msg.imageId + "' seems not to be an image. Error=" + err);
                // Delete the already uploaded image from disk
                fs.unlinkSync(msg.uploadDestination);
                // Add error to message
                msg.validationError = err.toString();
                // Send a notification that the upload failed
                channel.sendToQueue(uploadFailedQueue, Buffer.from(JSON.stringify(msg)));
            }
            else {
                // read some of the metadata gathered by ImageMagick
                const imageInfo = {
                    format: metadata.format,
                    width: metadata.width, 
                    height: metadata.height
                };

                console.log(" [x] Information about imageId='" + msg.imageId + "': " + JSON.stringify(imageInfo));

                // Attach image information to msg
                msg.imageInformation = imageInfo;
                
                // Foward processing to fingerprint service
                channel.sendToQueue(fingerprintQueue, Buffer.from(JSON.stringify(msg)));
            }
        });
    }, 1000);
}