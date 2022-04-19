const { Console } = require('console');
let fileSystem = require('fs');
let fileSystemPromises = require('fs/promises');

let testFile = "lorem-ipsum.txt";

// Immediately Invoked Function Expression see https://developer.mozilla.org/en-US/docs/Glossary/IIFE
(async () => {
    callbackStyle();
    promiseStyle();
    await asyncAwaitStyle();
})();

function callbackStyle() {
    fileSystem.open(testFile, "r", (err, fileHandle) => {
        if(err) {
            console.log(err);
            return;
        }

        let buffer = [];
        fileSystem.readFile(fileHandle, (err, data) => {
            if(err) {
                console.log(err);
                return;
            }

            console.log("File contents via callbacks:", data.toString());
        });
    })
}

function promiseStyle() {
    fileSystemPromises.open(testFile)
        .then(
            fileHandle => {
                return fileSystemPromises.readFile(fileHandle);
            }
        )
        .then(
            data => {
                console.log("File contents via promise:", data.toString());
            }
        )
        .catch(err => console.log(err));
}

async function asyncAwaitStyle() {
    try {
        let fileHandle = await fileSystemPromises.open(testFile);
        let data = await fileSystemPromises.readFile(fileHandle);

        console.log("File contents via async-await:", data.toString());
    }
    catch(err) {
        console.log(err);
    }
}
