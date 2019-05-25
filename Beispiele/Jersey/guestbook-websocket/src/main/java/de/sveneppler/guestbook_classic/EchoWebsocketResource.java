package de.sveneppler.guestbook_classic;

import javax.inject.Inject;
import javax.websocket.*;
import javax.websocket.server.ServerEndpoint;

@ServerEndpoint(value = "/echo")
public class EchoWebsocketResource {
	// This is a dirty hack to persist the websocket registry
	// globally as long as the app is running in tomcat
	//public static final InMemoryWebsocketRegistry registry = new InMemoryWebsocketRegistry();

	private InMemoryWebsocketRegistry registry;
	
	public EchoWebsocketResource() {
		registry = InMemoryWebsocketRegistry.GetInstance();
	}
	
	@OnClose
	public void onClose(Session session) {
		System.out.println("WebSocket with ID=" + session.getId() + " closed");
		registry.Remove(session);
	}
	
	@OnError
	public void onError(Session session, Throwable t) {
		registry.Remove(session);
		System.out.println("WebSocket with ID=" + session.getId() + " error!");
		System.out.println("Exception: " + t.getMessage());
	}
	
	@OnMessage
	public void onMessage(String message, Session session) {
		System.out.println("WebSocket with ID=" + session.getId() + " received message: " + message);
	}
	
	@OnOpen
	public void onOpen(Session session) {
		registry.Add(session);
		System.out.println("WebSocket new SessionID=" + session.getId() + "; There are now " + registry.Count() + " Connections");
		
		try {
			// Greet the new client
			session.getBasicRemote().sendText("Welcome!");
		}
		catch(Exception ex) {
			System.out.println("WebSocket: Failed to send text!");
		}
		
	}
}
