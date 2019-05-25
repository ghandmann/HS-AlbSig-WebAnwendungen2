package de.sveneppler.guestbook_classic;

import java.net.URI;
import java.sql.Connection;
import java.sql.DriverManager;
import java.sql.ResultSet;
import java.sql.Statement;
import java.util.Hashtable;
import java.util.Vector;

import javax.inject.Inject;
import javax.ws.rs.Consumes;
import javax.ws.rs.DELETE;
import javax.ws.rs.FormParam;
import javax.ws.rs.GET;
import javax.ws.rs.POST;
import javax.ws.rs.Path;
import javax.ws.rs.PathParam;
import javax.ws.rs.Produces;
import javax.ws.rs.QueryParam;
import javax.ws.rs.core.MediaType;
import javax.ws.rs.core.Response;

import org.glassfish.jersey.server.mvc.Viewable;

@Path("guestbook")
public class Guestbook {
	private InMemoryWebsocketRegistry registry;
	
	public Guestbook() {
		registry = InMemoryWebsocketRegistry.GetInstance();
	}
	
    @GET
    public Viewable Template() throws Exception {    	
    	// This method is only here to deliver the base HTML
    	// which then includes the needed client side javascript to fetch JSON data.
    	return new Viewable("/guestbook");
    }
	
	@GET
	@Path("entries.json")
	// Tell Jersey we want to return JSON
	@Produces(MediaType.APPLICATION_JSON)
	public Response EntriesJSON() throws Exception {
		Vector<EntryModel> entries = getGuestbookEntriesFromDatabase();

		// By setting our Vector<EntryModel> into the entity method
		// Jersey now tries to convert our POJO (Plain Old Java Object) into JSON
		return Response.status(200).entity(entries).build();
	}
	
    
    @POST
    // Tell Jersey we expect JSON in the HTTP Body
    @Consumes(MediaType.APPLICATION_JSON)
    // Jersey now tries to instantiate the needed EntryModel-Param based on the HTTP Body
    public Response AddEntry(EntryModel model) throws Exception {    	
    	Connection connection = getConnection();
    	Statement sth = connection.createStatement();
    	
    	// SQL Injection all the way :)
    	String query = String.format(
			"INSERT INTO Entries (poster, email, entry) VALUES (\"%s\", \"%s\", \"%s\");",
			model.poster,
			model.email,
			model.entry
    	);
    	System.out.println("Sending Query=" + query);
    	sth.execute(query);
    	
    	System.out.println("OK  Poster=\" + poster + \"; Email=\" + email + \"; Entry=\" + entry");
		return Response.ok().build();
    }
    
    @DELETE
    @Path("entries/{id}")
    public Response DeleteEntry(@PathParam("id") int id) throws Exception {
    	Connection connection = getConnection();
    	Statement sth = connection.createStatement();
    	
    	sth.execute("DELETE FROM Entries WHERE ROWID = " + id);
    	
    	URI redirectURI = new URI("/guestbook-websocket/webapi/guestbook");
		return Response.seeOther(redirectURI).build();
    	
    }
    
    // These two method are Database related
	private Connection getConnection() throws Exception {
    	// WTF, without this line, i get weird cannot find driver errors...
    	Class.forName("org.sqlite.JDBC");
    	
    	// This only works for Linux people...
    	// Change this path to the real location of the sample.db
    	// See $repo/sql/ folder for create scripts
    	String sqliteDatabasePath = "/tmp/sample.db";
    	
    	Connection connection = DriverManager.getConnection("jdbc:sqlite:" + sqliteDatabasePath);
    	return connection;
	}
	private Vector<EntryModel> getGuestbookEntriesFromDatabase() throws Exception {
		Connection connection = getConnection();
    	Statement sth = connection.createStatement();
    	
    	ResultSet rs = sth.executeQuery("SELECT * FROM Entries ORDER BY ROWID DESC");
    	Vector<EntryModel> entries = new Vector<EntryModel>();
    	while(rs.next()) {
    		EntryModel entry = new EntryModel(rs.getInt("id"), rs.getString("poster"), rs.getString("email"), rs.getString("entry"));
    		entries.add(entry);
    	}
		return entries;
	}
}
