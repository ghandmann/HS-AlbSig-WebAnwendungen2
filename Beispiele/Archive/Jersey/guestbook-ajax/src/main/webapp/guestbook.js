// This line is the entry-point of this script,
// run the function named 'onDocumentReady' when the document has been loaded
// https://learn.jquery.com/using-jquery-core/document-ready/
$(onDocumentReady);

// Called by jQuery when the document is ready
function onDocumentReady() {
	loadGuestbookEntries();
	connectReloadButton();
	connectEntryButton();
}

function connectEntryButton() {
	$("#entry-button").click(createEntry);
}

// Fetches the guestbook entries from the server asynchronously via XmlHttpRequests (AJAX) 
function loadGuestbookEntries() {
	console.log("Called loadGuestbookEntries()");
	// This is an async call which instantly returns a promise (aka deffered) object which represents the ongoing request
	// https://learn.jquery.com/code-organization/deferreds/
	let fetchEntriesPromise = $.get("guestbook/entries.html");
	
	// Tell jQuery to call the function 'onGuestbookEntriesReady' when the promise succeeded
	fetchEntriesPromise.done(onGuestbookEntriesReady);
	
	// Tell jQuery to call the function 'onGuestbookEntriesFailed' when the promise failed
	fetchEntriesPromise.fail(onGuestbookEntriesFailed);
	
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
	
	registerDeleteActions();
	
	console.log("Exited onGuestbookEntriesReady()");
}

// Add a click handler to all 'delete links' inside a gb entry
function registerDeleteActions() {
	// Find all delete links on the page
	var allDeleteLinks = $("div#entry-container .entry a");
	
	allDeleteLinks.click(deleteEntry);
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
	
	// Start an async HTTP-Post request, returning a promise
	let createEntryPromise = $.post("guestbook", postData);

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
	
	// Create JSON-Object for HTTP-Request
	let deleteData = { id: entryId };
	
	let deleteEntryPromise = $.get("guestbook/delete", deleteData);
	
	// Here we only define the lambda, the code is NOT run!
	// The code gets executed by the promise done() function when the delete request succeeds.
	let entryDeletedLambda = () => {
		// Traverse the DOM-Tree upwards, until we find a div-tag with the class 'entry'
		let parentDiv = clickedElement.parents("div.entry");
		
		// Nested Lambda. After the Entry has been faded out, remove it from the DOM.
		let fadeOutFinished = () => {
			parentDiv.remove();
		}
		
		// FadeOut the parent div element, afterwards call 'fadeOutFinished'
		parentDiv.fadeOut(300, fadeOutFinished);
	};
	
	// Call the 'entryDeletedLambda' when the promise succeeds
	deleteEntryPromise.done(entryDeletedLambda);
	
	// Inline lambda example for promises
	deleteEntryPromise.fail(() => alert("Failed to delete entry!"));
}