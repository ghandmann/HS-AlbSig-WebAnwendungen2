var amqp = require('amqplib/callback_api');

console.log(" [*] ImageFingerprintService starting...");

const incomingQueue = 'ImageWatermark';
const doneQueue = "ImageReady";

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

        console.log(" [*] Waiting for messages in %s. To exit press CTRL+C", incomingQueue);

        channel.consume(incomingQueue, (msg) => createImageFingerprint(msg, channel), {
            noAck: true
        });
    });
});

function createImageFingerprint(msg, channel) {
    console.log(" [x] Received raw message=%s", msg.content.toString());
    console.log(" [x] Adding watermark to image..");

    // Artificiall delay processing of the message by using a timeout
    setTimeout(() => {
        console.log(" [x] Watermark added.");
        channel.sendToQueue(doneQueue, Buffer.from("Validate the image!"));
    }, 100);
}