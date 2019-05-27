// This line is the entry-point of this script,
// run the function named 'onDocumentReady' when the document has been loaded
// https://learn.jquery.com/using-jquery-core/document-ready/
$(onDocumentReady);

// Called by jQuery when the document is ready
function onDocumentReady() {
	loadGuestbookEntries();
	connectReloadButton();
	connectEntryButton();
	openWebsocket();
}

function connectEntryButton() {
	$("#entry-button").click(createEntry);
}

// Fetches the guestbook entries from the server asynchronously via XmlHttpRequests (AJAX) 
function loadGuestbookEntries() {
	console.log("Called loadGuestbookEntries()");
	// This is an async call which instantly returns a promise (aka deffered) object which represents the ongoing request
	// https://learn.jquery.com/code-organization/deferreds/
	let fetchEntriesPromise = $.getJSON("guestbook/entries.json");
	
	// Tell jQuery to call the function 'onGuestbookEntriesReady' when the promise succeeded
	fetchEntriesPromise.done(onGuestbookEntriesReady);
	
	// Tell jQuery to call the function 'onGuestbookEntriesFailed' when the promise failed
	fetchEntriesPromise.fail(onGuestbookEntriesFailed);
	
	// Typically the above lines are concatenated in a fluent-api-style:
	// $.get("entries").done(onGuestbookEntriesReady).fail(onGuestbookEntriesFailed);
	
	console.log("Exited loadGuestbookEntries()");
}

// Generate a client specific HTML representation of the received JSON
function onGuestbookEntriesReady(fetchedJSON) {
	let entryContainer = $("#entry-container");
	entryContainer.empty();
	
	fetchedJSON.forEach((entry) => {
		let newEntry = renderEntry(entry);
		entryContainer.append(newEntry);
	});
}

function renderEntry(entry) {
	let entryCard = $("<div/>");
	entryCard.addClass("card entry");
	
	let entryHeader = $("<div/>");
	entryHeader.addClass("card-header text-white bg-secondary");
	let entryHeaderContet = $("<strong>" + entry.poster + "</strong>");
	entryHeader.append("Von ");
	entryHeader.append(entryHeaderContet);
	
	let deleteEntryLink = $("<a>Eintrag löschen</a>");
	deleteEntryLink.attr("href", "javascript:void(0)")
	deleteEntryLink.attr("data-id", entry.id);
	deleteEntryLink.addClass("float-right");
	deleteEntryLink.click(deleteEntry);
	
	entryHeader.append(deleteEntryLink);
	
	entryCard.append(entryHeader);
	
	let entryBody = $("<div/>");
	entryBody.addClass("card-body bg-dark text-white");
	
	let entryParagraph = $("<p>" + entry.entry + "</p>");
	entryParagraph.addClass("card-text");
	
	entryBody.append(entryParagraph);
	entryCard.append(entryBody);
	
	return entryCard;
	
	/* The above Javascript generates this HTML structure:
	<div class="card entry">
	  <div class="card-header text-white bg-secondary">
	    Von <strong>${ entry.poster }</strong> (${ entry.email })
	    <a href="javascript:void(0)" data-id="${ entry.id }" class="float-right">Eintrag Löschen</a>
	  </div>
	  <div class="card-body bg-dark text-white">
	    <p class="card-text">${ entry.entry }</p>
	  </div>
	</div>
	*/
}

// When the 'fetchEntriesPromise' fails, jQuery calls this function.
// Meaning the HTTP-Request failed for some reason
function onGuestbookEntriesFailed() {
	console.log("Called onGuestbookEntriesFailed()");
	
	// Display a message box to inform the users, that something went wrong
	alert("Failed to retrieve data from the server!");
	
	console.log("Exited onGuestbookEntriesFailed()");
}

// This function connects the reload button with the actual javascript function to reload the guestbook entries
function connectReloadButton() {
	// Find the element with the id=reload-button
	var button = $("#reload-button");
	
	// Call the function 'loadGuestbookEntries' when the button is clicked.
	button.click(loadGuestbookEntries);
}

function createEntry(e) {
	let posterInput = $("#poster");
	let emailInput = $("#email");
	let entryTextarea = $("#entry");
	
	
	// Create a JSON-Object which represents our HTTP-Request Parameters
	let postData = {
		poster: posterInput.val(),
		email: emailInput.val(),
		entry: entryTextarea.val(),
	};
	
	let postDataJsonString = JSON.stringify(postData);
	
	// Start an async HTTP-Post request, returning a promise
	let createEntryPromise = $.ajax("guestbook",
		{
			data: postDataJsonString,
			type: "POST",
			contentType: "application/json",
		});

	// Call the function 'onCreateEntrySucceeded' if the HTTP-Request succeeds
	createEntryPromise.done(onCreateEntrySucceeded);
	
	// Call the function 'onCreateEntryFailed' if the HTTP-Request failed
	createEntryPromise.fail(onCreateEntryFailed);
}

function onCreateEntrySucceeded() {
	// Clear the Form-Fields
	$("#poster, #email, #entry").val("");
	
	// Update the list of Guestbook entries
	loadGuestbookEntries();
}

// Called when creating a gb entry failed
function onCreateEntryFailed() {
	alert("Failed to create an new gustbook entry!");
}

function deleteEntry(clickEventArgs) {
	// Retrieve the clicked element
	let clickedElement = $(clickEventArgs.currentTarget);
	
	let entryId = clickedElement.attr("data-id");
	
	let deleteURL = "guestbook/entries/" + entryId;
	
	// Send a HTTP DELETE request to the deleteURL
	let deleteEntryPromise = $.ajax(deleteURL,
		{
			type: "delete",
		}
	);
	
	// Inline lambda example for promises
	deleteEntryPromise.fail(() => alert("Failed to delete entry!"));
}

function removeEntryFromDOM(entryId) {
	let deleteLink = $("a[data-id='" + entryId + "']");
	let parentDiv = deleteLink.parents("div.entry");
	
	// Nested Lambda. After the Entry has been faded out, remove it from the DOM.
	let fadeOutFinished = () => {
		parentDiv.remove();
	}
	
	// FadeOut the parent div element, afterwards call 'fadeOutFinished'
	parentDiv.fadeOut(300, fadeOutFinished);
}

function openWebsocket() {
	var ws = new WebSocket("ws://localhost:8080/guestbook-websocket/echo");
	ws.addEventListener('open', (eventObject) => {
		console.log("Websocket connection opened!");
	});
	
	ws.addEventListener('close', (eventObject) => {
		console.log("Websocket connection closed!");
	});
	
	ws.addEventListener('error', (eventObject) => {
		console.log("Websocket connection error!");
	});
	
	ws.addEventListener('message', (msgEvent) => {
		let msg = msgEvent.data;
		console.log("Websocket received message: " + msg);
		handleWebsocketMessage(msg);
	});
}

function handleWebsocketMessage(jsonMessage) {
	let message = JSON.parse(jsonMessage);
	
	// Check if the message object has a type property
	if("type" in message) {
		if(message.type == "NewEntryMessage") {
			console.log("* Received NewEntryMessage prepending new entry.")
			// Crate the HTML-DOM elements for the new entry
			let newEntry = renderEntry(message.newEntry);
			// Inject the entry into the #entry-container div
			$("#entry-container").prepend(newEntry);
		}
		else if(message.type == "EntryDeletedMessage") {
			console.log("* Received EntryDeletedMessage removing entry.")
			// Server informed us, that the entry has been deleted, so we remove it.
			removeEntryFromDOM(message.deletedEntryId);
		}
	}
}