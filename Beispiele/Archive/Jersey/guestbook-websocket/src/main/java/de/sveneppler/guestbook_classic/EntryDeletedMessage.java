package de.sveneppler.guestbook_classic;

public class EntryDeletedMessage {
	private int deletedEntryId;
	private final String type = "EntryDeletedMessage";

	public String getType() {
		return type;
	}

	public int getDeletedEntryId() {
		return deletedEntryId;
	}

	public void setDeletedEntryId(int deletedEntryId) {
		this.deletedEntryId = deletedEntryId;
	}
	
	
}
