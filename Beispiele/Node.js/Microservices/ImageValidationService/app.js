var amqp = require('amqplib/callback_api');

console.log(" [*] ImageFingerprintService starting...");

const incomingQueue = 'ImageUploaded';
const watermarkQueue = "ImageFingerprint";

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

        channel.assertQueue(watermarkQueue, {
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
    console.log(" [x] Validating image...");

    // Artificiall delay processing of the message by using a timeout
    setTimeout(() => {
        console.log(" [x] Image validated.");
        channel.sendToQueue(watermarkQueue, Buffer.from("Validate the image!"));
    }, 100);
}