const amqp = require('amqplib/callback_api');
const fs = require('fs');

console.log(" [*] ImageHouskeeper service starting...");

const uploadFinishedQueue = 'ImageReady';
const uploadFailedQueue = 'ImageFailed';

amqp.connect('amqp://localhost', function(connectError, connection) {
    if (connectError) {
        throw connectError;
    }
    connection.createChannel(function(createChannelError, channel) {
        if (createChannelError) {
            throw createChannelError;
        }

        channel.assertQueue(uploadFinishedQueue, {
            durable: false
        });

        channel.assertQueue(uploadFailedQueue, {
            durable: false,
        });

        console.log(" [*] Waiting for messages in %s or %s. To exit press CTRL+C", uploadFinishedQueue, uploadFailedQueue);

        channel.consume(uploadFinishedQueue, (msg) => finalizeImageUpload(msg, channel), {
            noAck: true
        });

        channel.consume(uploadFailedQueue, (msg) => removeFailedUpload(msg, channel), {
            noAck: true
        });
    });
});

function finalizeImageUpload(inconmingMessage, channel) {
    const rawJson = inconmingMessage.content.toString();
    console.log(" [x] Received raw message=%s", rawJson);
    const msg = JSON.parse(rawJson);
    console.log(" [x] Moving imageId='" + msg.imageId + "' into done folder");

    const doneLocation = '/tmp/shared/done/' + msg.imageId;
    fs.rename(msg.uploadDestination, doneLocation, () => {
        console.log(" [X] Storing metadata for imageId='" + msg.imageId + "'");
        const metadataLocation = '/tmp/shared/done/' + msg.imageId + ".meta.json";
        const stream = fs.createWriteStream(metadataLocation);
        stream.write(JSON.stringify(msg.imageInformation));
        stream.end();

        console.log(" [X] Upload of imageId='" + msg.imageId + "' done.");
    });
}

function removeFailedUpload(incomingMessage, channel) {
    const rawJson = incomingMessage.content.toString();
    console.log(" [x] Received raw message=%s", rawJson);
    const msg = JSON.parse(rawJson);
    console.log(" [x] Removing imageId='" + msg.imageId + "' from in-flight folder.");

    fs.unlink(msg.uploadDestination, () => {
        console.log(" [X] Failed upload of imageId='" + msg.imageId + "' cleaned up.");
    });
}