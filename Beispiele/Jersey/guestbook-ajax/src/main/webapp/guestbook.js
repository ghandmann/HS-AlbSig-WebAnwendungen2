// This line is the entry-point of this script,
// run the function named 'onDocumentReady' when the document has been loaded
// https://learn.jquery.com/using-jquery-core/document-ready/
$(onDocumentReady);

// Called by jQuery when the document is ready
function onDocumentReady() {
	loadGuestbookEntries();
	connectReloadButton();
}

// Fetches the guestbook entries from the server asynchronously via XmlHttpRequests (AJAX) 
function loadGuestbookEntries() {
	console.log("Called loadGuestbookEntries()");
	// This is an async call which instantly returns a promise (aka deffered) object which represents the ongoing request
	// https://learn.jquery.com/code-organization/deferreds/
	let promise = $.get("guestbook/entries.html");
	
	// Tell jQuery to call the function 'onGuestbookEntriesReady' when the promise succeeded
	promise.done(onGuestbookEntriesReady);
	
	// Tell jQuery to call the function 'onGuestbookEntriesFailed' when the promise failed
	promise.fail(onGuestbookEntriesFailed);
	
	// Typically the above lines are concatenated in a fluent-api-style:
	// $.get("entries").done(onGuestbookEntriesReady).fail(onGuestbookEntriesFailed);
	
	console.log("Exited loadGuestbookEntries()");
}

// When jQuery calls this function via the promise, it provides 3 params:
// 1) The Response-Body
// 2) The HTTP-Status Text
// 3) The XmlHttpRequest Object used to send the original request
function onGuestbookEntriesReady(fetchedHtml) {
	console.log("Called onGuestbookEntriesReady()");
	
	// Get the div with the id=entry-container from the guestbook page
	let entryContainer = $("#entry-container");
	
	// Clear all child elements
	entryContainer.empty();
	
	// Create a DOM Object of the received HTML string
	let parsedEntriesDOM = $(fetchedHtml);
	// Append the new DOM Object to the entryContainer
	entryContainer.append(parsedEntriesDOM);
	
	console.log("Exited onGuestbookEntriesReady()");
}

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