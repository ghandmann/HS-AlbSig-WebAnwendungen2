package de.sveneppler;

import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpSession;
import javax.ws.rs.*;
import javax.ws.rs.core.Context;

@Path("home")
public class HomeController {
	// Inject the ServletRequest Object to access session
	@Context HttpServletRequest request;
	
	@GET
	@Produces("text/plain; charset=utf-8")
	public String index() {
		// Get the session object, prevent creation if there is none
		HttpSession session = request.getSession(false);
		
		// If there is a session, greet the user
		if(session != null) {
			String username = (String) session.getAttribute("username");
			return "Hallo " + username + "! Willkommen zurück!";
		}
		// If there is no session, greet the unknown person
		else {
			return "Hallo Unbekannter! Bitte einloggen via /auth/login?username=XXX&password=YYY";
		}
	}
}
