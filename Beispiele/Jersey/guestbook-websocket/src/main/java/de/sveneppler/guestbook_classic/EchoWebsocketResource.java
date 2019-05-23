package de.sveneppler.guestbook_classic;

import javax.inject.Inject;
import javax.websocket.*;
import javax.websocket.server.ServerEndpoint;

@ServerEndpoint(value = "/echo")
public class EchoWebsocketResource {
	// This is a dirty hack to persist the websocket registry
	// globally as long as the app is running in tomcat
	//public static final InMemoryWebsocketRegistry registry = new InMemoryWebsocketRegistry();

	@Inject
	private InMemoryWebsocketRegistry registry;
	
//	@Inject
//	public EchoWebsocketResource(InMemoryWebsocketRegistry registry) {
//		System.out.println("EchoWebsocketResource()");
//		this.registry = registry;
//	}
	
	@OnClose
	public void onClose(Session session) {
		System.out.println("WebSocket closed");
		//registry.Remove(session);
	}
	
	@OnError
	public void onError(Session session, Throwable t) {
		//registry.Remove(session);
		System.out.println("WebSocket error");
		System.out.println("Exception: " + t.getMessage());
	}
	
	@OnMessage
	public void onMessage(String message, Session session) {
		System.out.println("WebSocket onMessage: " + message);
	}
	
	@OnOpen
	public void onOpen(Session session) {
		System.out.println("WS onOpen(); registry=" + registry);
		//registry.Add(session);
		//System.out.println("WebSocket new SessionID=" + session.getId() + "; There are now " + registry.Count() + " Connections");
		
		try {
			// Greet the new client
			session.getBasicRemote().sendText("Welcome!");
		}
		catch(Exception ex) {
			System.out.println("WebSocket: Failed to send text!");
		}
		
	}
}
