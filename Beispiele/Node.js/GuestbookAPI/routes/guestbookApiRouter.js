var express = require('express');
var router = express.Router();

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
router.post('/entries', (req, res, next) => {
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

    // Respond with 200 OK
    res.sendStatus(200);
});

// Delete an entry from the guestbook
router.delete('/entries/:id', (req, res, next) => {
    // .filter() returns only the entries of the in-memory guestbook array
    // with an ID different from the one to the HTTP DELETE request
    let filterResult = inMemoryGuestbookStore.filter((entry) => {
        if(entry.id != req.params["id"]) {
            return entry;
        }
    });

    // No entry filtered out, so the id was invalid
    if(filterResult.length == inMemoryGuestbookStore.length) {
        res.sendStatus(404);
    }
    else {
        inMemoryGuestbookStore = filterResult

        // Respond with 200 OK
        res.sendStatus(200);
    }
});

module.exports = router;
