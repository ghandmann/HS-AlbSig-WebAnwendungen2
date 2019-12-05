// Shorthand function for $(document).ready(...);
$(async () => {
    // When the "reloadEntries" button is clicked, fetch the guestbook entries
    $("#reloadEntries").click(async () => await loadGuestbookEntries());

    $('#createEntryButton').click(async () => await createNewGuestbookEntry());

    // when the page is done loading, fetch the guestbook entries
    await loadGuestbookEntries();
});

async function loadGuestbookEntries() {
    let entries = undefined;
    try {
        const response = await fetch("/api/v1/entries");
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

    $(".delete-button", entriesContainer).click(async (clickedButtonEvent) => deleteEntry(clickedButtonEvent));
}

function renderEntry(entry) {
    const card = $('<div class="card"/>');
    const cardHeader = $('<div class="card-header" />');
    cardHeader.text("Eintrag #" + entry.id + " von " + entry.name + " am " + entry.date);
    const deleteButton = $('<button data-id="' + entry.id + '" class="btn btn-sm btn-danger float-right delete-button">Löschen</button>');
    cardHeader.append(deleteButton);

    card.append(cardHeader);

    const cardBody = $('<div class="card-body" />');
    // This allows HTML Injection! Demo purpose only! Better use .text()!
    cardBody.html(entry.text);
    card.append(cardBody);

    return card;
}

async function createNewGuestbookEntry() {
    const newEntryModal = $('#newEntryModal');
    const newEntryForm = $('form', newEntryModal).first();

    const nameInput = $('input[name="name"]', newEntryForm);
    const textInput = $('textarea[name="text"]', newEntryForm);

    const newEntry = {
        name: nameInput.val(),
        text: textInput.val(),
    };

    // Send the new entry via HTTP POST to the API
    var response = await fetch('/api/v1/entries', {
        method: "POST",
        headers: {
                "Content-Type": "application/json",
        },
        body: JSON.stringify(newEntry),
    });

    // In case something went wrong, show an error
    if(response.status != 200) {
        showError("Failed to create new Guestbook entry!");
        return;
    }

    // Reset the input fields
    textInput.val("");
    nameInput.val("");

    // Reload entries to show the new one.
    await loadGuestbookEntries();

    // Hide the newEntryModal
    newEntryModal.modal("hide");
}

async function deleteEntry(clickedButtonEvent) {
    const clickedButton = $(clickedButtonEvent.currentTarget);
    const entryIdToDelete = clickedButton.attr("data-id");

    const response = await fetch("/api/v1/entries/" + entryIdToDelete, {
        method: "DELETE",
    });

    if(response.status != 200) {
        showError("Failed to delete Guestbook entry with id=" + entryIdToDelete);
        return;
    }

    // Traverse the DOM upwards starting from the clickedButton element until
    // we find a element with the class "card"
    const entryCard = clickedButton.parents(".card");
    // Remove the card.
    entryCard.remove();
}

function showError(msg, exception) {
    console.log(msg, exception);
    alert(msg);
}