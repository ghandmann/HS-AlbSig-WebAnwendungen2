var express = require('express');
var router = express.Router();
const { check, validationResult } = require('express-validator');

const routerFactory = function factory(websocketServer) {
    const broadcastMessageViaWebSocket = (broadcastMessage) => {
        websocketServer.clients.forEach((websocketClient) => {
            websocketClient.send(broadcastMessage);
        });
    };

    const broadcastEntryCreated = (guestbookEntry) => {
        const broadcastMessage = JSON.stringify(
            {
                type: "EntryCreated",
                createdEntry: guestbookEntry,
            }
        );

        broadcastMessageViaWebSocket(broadcastMessage);
    };

    const broadcastEntryDeleted = (entryId) => {
        const broadcastMessage = JSON.stringify(
            {
                type: "EntryDeleted",
                deletedEntryId: entryId,
            }
        );

        broadcastMessageViaWebSocket(broadcastMessage);
    };

    // Represent the guestbook as a simple in-memory array
    // consiting of guestbook entry objects
    var inMemoryGuestbookStore = [];

    // Since every entry needs an ID, simply use an in-memory counter
    var nextEntryId = 1;

    // Return JSON array of entries
    router.get('/entries', (req, res, next) => {
        // Just return the in-memory guestbook array, express middleware
        // takes care of JSON serialization
        res.send(inMemoryGuestbookStore);
    });

    // Add a new entry to the guestbook
    // The HTTP POST body looks like: { "name": "Your name", "text": "Your text" }
    router.post(
        '/entries',
        // Inject validation middlewares which run before our action
        [
            check("name").not().isEmpty(),
            check("text").not().isEmpty(),
        ],
        // Our action code
        (req, res, next) => {
            // Validate the request with express-validator
            const errors = validationResult(req);
            if(!errors.isEmpty()) {
                return res.status(400).json({ errors: errors.array() });
            }

            // Retrieve the posted JSON from the request
            const postData = req.body;
            
            // Create a new guestbookEntry
            const guestbookEnty = {
                id: nextEntryId++,
                name: postData.name,
                date: new Date().toISOString(),
                text: postData.text,
            };

            // Push the entry object into the inMemory guestbook array
            inMemoryGuestbookStore.push(guestbookEnty);

            broadcastEntryCreated(guestbookEnty);

            // Respond with 200 OK
            res.sendStatus(200);
    });

    // Delete an entry from the guestbook
    router.delete(
        '/entries/:id',
        [
            check("id").isInt({ gt: 0 })
        ],
        (req, res, next) => {
            const errors = validationResult(req);
            if(!errors.isEmpty()) {
                return res.status(400).json( { errors: errors.array() } );
            }

            // .filter() returns only the entries of the in-memory guestbook array
            // with an ID different from the one to the HTTP DELETE request
            const deleteEntryId = req.params["id"];
            let filterResult = inMemoryGuestbookStore.filter((entry) => {
                if(entry.id != deleteEntryId) {
                    return entry;
                }
            });

            // No entry filtered out, so the id was invalid
            if(filterResult.length == inMemoryGuestbookStore.length) {
                res.sendStatus(404);
            }
            else {
                inMemoryGuestbookStore = filterResult

                broadcastEntryDeleted(deleteEntryId);

                // Respond with 200 OK
                res.sendStatus(200);
            }
    });

    return router;
};

module.exports = routerFactory;
