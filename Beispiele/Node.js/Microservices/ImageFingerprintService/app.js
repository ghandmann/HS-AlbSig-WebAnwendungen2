var amqp = require('amqplib/callback_api');
const crypto = require('crypto');
const fs = require('fs');

console.log(" [*] ImageFingerprintService starting...");

const incomingQueue = 'ImageFingerprint';
const watermarkQueue = 'ImageWatermark';

amqp.connect('amqp://' + (process.env.RABBITMQ_HOST || 'localhost'), function(connectError, connection) {
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

function createImageFingerprint(incomingMessage, channel) {
    const rawJson = incomingMessage.content.toString();
    console.log(" [x] Received raw message=%s",rawJson);
    const msg = JSON.parse(rawJson);

    console.log(" [x] Generating fingerprint for imageId='" + msg.imageId + "'");

    // Artificiall delay processing of the message by using a timeout
    setTimeout(() => {
        const hasher = crypto.createHash('sha256');
        const readStream = fs.createReadStream(msg.uploadDestination);
        readStream.on('readable', () => {
            const fileContet = readStream.read();
            if(fileContet) {
                hasher.update(fileContet);
            }
            else {
                const fingerprint = hasher.digest("hex");
                console.log(" [x] Generated fingerpint='" + fingerprint + "' for imageId='" + msg.imageId + "'");
                msg.fingerprint = fingerprint;
                channel.sendToQueue(watermarkQueue, Buffer.from(JSON.stringify(msg)));
            }
        });
        
    }, 1000);
}