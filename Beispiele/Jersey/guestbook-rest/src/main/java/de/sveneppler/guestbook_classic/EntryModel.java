package de.sveneppler.guestbook_classic;

public class EntryModel {
	int id;
	String poster;
	String email;
	String entry;
	
	public EntryModel() {}
	
	public EntryModel(int id, String poster, String email, String entry) {
		this.id = id;
		this.poster = poster;
		this.email = email;
		this.entry = entry;
	}
	
	public int getId() {
		return id;
	}
	
	public String getEmail() {
		return email;
	}
	
	public String getPoster() {
		return poster;
	}
	
	public String getEntry() {
		return entry;
	}
	
	public void setPoster(String poster) {
		this.poster = poster;
	}
	
	public void setEmail(String email) {
		this.email = email;
	}
	
	public void setEntry(String entry) {
		this.entry = entry;
	}
}
