var express = require('express');
var router = express.Router();

// create a simple in-memory gustbook
var inMemoryGuestbookStore = [];
// ceate a simple id sequence
var nextId = 1;

// Return JSON array of entries
router.get('/', (req, res, next) => {
  res.send(inMemoryGuestbookStore);
});

// Add a new entry to the guestbook
router.post('/', (req, res, next) => {
    const postData = req.body;
    
    const guestbookEnty = {
        id: nextId++,
        name: postData.name,
        date: new Date().toISOString(),
        text: postData.text,
    };

    inMemoryGuestbookStore.push(guestbookEnty);
    res.sendStatus(200);
});

// Delete an entry from the guestbook
router.delete('/:id', (req, res, next) => {
    inMemoryGuestbookStore = inMemoryGuestbookStore.filter((entry) => {
        if(entry.id != req.param["id"]) {
            return entry;
        }
    });

    res.sendStatus(200);
});

module.exports = router;
