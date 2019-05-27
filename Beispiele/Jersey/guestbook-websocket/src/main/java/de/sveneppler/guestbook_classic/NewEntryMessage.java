package de.sveneppler.guestbook_classic;

// This class represents a WebSocket message informing
// all clients that a new Entry has been created
public class NewEntryMessage {
	private EntryModel NewEntry;
	private final String type = "NewEntryMessage";
	
	public EntryModel getNewEntry() {
		return NewEntry;
	}
	public void setNewEntry(EntryModel newEntry) {
		NewEntry = newEntry;
	}
	public String getType() {
		return type;
	}
}
