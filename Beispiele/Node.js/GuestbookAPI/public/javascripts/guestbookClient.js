// Shorthand function for $(document).ready(...);
$(async () => {
    // When the "reloadEntries" button is clicked, fetch the guestbook entries
    $("#reloadEntries").click(() => loadGuestbookEntries());

    // when the page is done loading, fetch the guestbook entries
    await loadGuestbookEntries();
});

async function loadGuestbookEntries() {
    let entries = undefined;
    try {
        const response = await fetch("/api/v1/");
        entries = await response.json();
    }
    catch(exception) {
        showError("Failed to fetch guestbook entries", exception);
        return;
    };

    renderGuestbookEntries(entries);
}

function renderGuestbookEntries(entries) {
    // Reverse the entries array, we want the newest entries on top
    entries = entries.reverse();

    const entriesContainer = $('#guestbookEntriesContainer');
    // Make sure the container is empty.
    entriesContainer.empty();

    if(entries.length == 0) {
        // Tell the user there are no entries.
        const noEntriesInfo = $('<div class="alert alert-info" />');
        noEntriesInfo.text("Keine Einträge im Gästebuch vorhanden");
        entriesContainer.append(noEntriesInfo);
        return;
    }

    entries.forEach((entry) => {
        const newEntry = renderEntry(entry);
        entriesContainer.append(newEntry);
    });
}

function renderEntry(entry) {
    const card = $('<div class="card"/>');
    const cardHeader = $('<div class="card-header" />');
    cardHeader.text("Eintrag #" + entry.id + " von " + entry.name + " am " + entry.date);
    card.append(cardHeader);

    const cardBody = $('<div class="card-body" />');
    cardBody.text(entry.text);
    card.append(cardBody);

    return card;
}

function showError(msg, exception) {
    console.log(msg, exception);
    alert(msg);
}