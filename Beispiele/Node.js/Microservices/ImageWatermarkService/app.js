var amqp = require('amqplib/callback_api');
var imagemagick = require('imagemagick');

console.log(" [*] ImageFingerprintService starting...");

const incomingQueue = 'ImageWatermark';
const doneQueue = 'ImageReady';
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

        channel.assertQueue(doneQueue, {
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

function createImageFingerprint(inconmingMessage, channel) {
    const rawJson = inconmingMessage.content.toString();
    console.log(" [x] Received raw message=%s", rawJson);
    const msg = JSON.parse(rawJson);
    console.log(" [x] Adding watermark to imageId='" + msg.imageId + "'");

    // Artificiall delay processing of the message by using a timeout
    setTimeout(() => {
        const args = [ msg.uploadDestination, "./watermark.png", "-gravity", "southeast", "-composite", msg.uploadDestination ];
        imagemagick.convert(args, (err, result) => {
            if(err) {
                console.log(" [E] Failed to add watermark for imageId='" + msg.imageId + "'. Error=" + err);
                msg.watermarkError = err.toString();
                channel.sendToQueue(uploadFailedQueue, Buffer.from(JSON.stringify(msg)));
            }
            else {
                console.log(" [x] Watermark added.");
                channel.sendToQueue(doneQueue, Buffer.from(JSON.stringify(msg)));
            }
        });
    }, 1000);
}