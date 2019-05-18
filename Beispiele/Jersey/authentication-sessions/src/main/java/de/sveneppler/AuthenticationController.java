package de.sveneppler;

import java.util.HashMap;
import java.util.Map;

import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpSession;
import javax.ws.rs.*;
import javax.ws.rs.QueryParam;
import javax.ws.rs.core.Context;
import javax.ws.rs.core.Response;

@Path("auth")
public class AuthenticationController {
	// We need access to the Request-Object of the Servlet in order to use Sessions
	@Context private HttpServletRequest request;
	// Create a in-memory user database for demonstration only
	public HashMap<String, String> UserDatabase;
	
	public AuthenticationController() {
		UserDatabase = new HashMap<String, String>();
		
		// Inject some default users with passwords
		// Key = username
		// Value = password
		UserDatabase.put("admin", "password");
		UserDatabase.put("user1", "s3cr3t");
	}
	@Path("login")
	@GET
	public Response login(@QueryParam("username") String username, @QueryParam("password") String password) {
		for(Map.Entry<String, String> dbUserEntry : UserDatabase.entrySet()) {
			String usernameCandidate = dbUserEntry.getKey();
			String passwordCandidate = dbUserEntry.getValue();
			
			if(username.equals(usernameCandidate) && password.equals(passwordCandidate)) {
				// Create a new Session
				HttpSession session = request.getSession(true);
				// Store the currently logged in user in the session
				session.setAttribute("username", username);
				
				// Respond with success
				return Response.status(200).entity("Login Successfull").build();
			}
		}
		
		// No Username/Password combination matched, respond with 401 Unauthorized
		return Response.status(401).entity("Unauthorized").build(); 
	}
	
	@Path("logout")
	@GET
	public Response logout() {
		// Try to get a session, prevent creation if there is none (false param)
		HttpSession session = request.getSession(false);
		
		// If there is no session, tell the user
		if(session == null) {
			return Response.status(400).entity("Please login to logout!").build();
		}
		
		// invalidate the session
		session.invalidate();
		
		// Tell the user he is now logged out
		return Response.status(200).entity("You are logged out!").build();
	}
}
