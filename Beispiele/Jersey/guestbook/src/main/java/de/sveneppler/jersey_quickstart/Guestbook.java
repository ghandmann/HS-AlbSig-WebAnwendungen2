package de.sveneppler.jersey_quickstart;

import java.net.URI;
import java.sql.Connection;
import java.sql.DriverManager;
import java.sql.ResultSet;
import java.sql.Statement;
import java.util.Hashtable;
import java.util.Vector;

import javax.ws.rs.FormParam;
import javax.ws.rs.GET;
import javax.ws.rs.POST;
import javax.ws.rs.Path;
import javax.ws.rs.QueryParam;
import javax.ws.rs.core.Response;

import org.glassfish.jersey.server.mvc.Viewable;

@Path("guestbook")
public class Guestbook {

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
    
    @GET
    public Viewable Template() throws Exception {
    	Connection connection = getConnection();
    	Statement sth = connection.createStatement();
    	
    	ResultSet rs = sth.executeQuery("SELECT * FROM Entries ORDER BY ROWID DESC");
    	Vector<EntryModel> entries = new Vector<EntryModel>();
    	while(rs.next()) {
    		EntryModel entry = new EntryModel(rs.getInt("id"), rs.getString("poster"), rs.getString("email"), rs.getString("entry"));
    		entries.add(entry);
    	}
    	
    	Hashtable<String, Object> model = new Hashtable<String, Object>();
    	model.put("entries", entries);
    	
    	return new Viewable("/guestbook", model);
    }
    
    @POST
    public Response AddEntry(@FormParam("poster") String poster, @FormParam("email") String email, @FormParam("entry") String entry) throws Exception {
    	Connection connection = getConnection();
    	Statement sth = connection.createStatement();
    	
    	// SQL Injection all the way :)
    	String query = String.format("INSERT INTO Entries (poster, email, entry) VALUES (\"%s\", \"%s\", \"%s\");", poster, email, entry);
    	System.out.println("Sending Query=" + query);
    	sth.execute(query);
    	
    	System.out.println("OK  Poster=\" + poster + \"; Email=\" + email + \"; Entry=\" + entry");
    	URI redirectURI = new URI("/jersey-quickstart/webapi/guestbook");
		return Response.seeOther(redirectURI).build();
    }
    
    @GET
    @Path("delete")
    public Response DeleteEntry(@QueryParam("id") int id) throws Exception {
    	Connection connection = getConnection();
    	Statement sth = connection.createStatement();
    	
    	sth.execute("DELETE FROM Entries WHERE ROWID = " + id);
    	
    	URI redirectURI = new URI("/jersey-quickstart/webapi/guestbook");
		return Response.seeOther(redirectURI).build();
    	
    }
}
