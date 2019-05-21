package de.sveneppler.guestbook_classic;

import java.util.HashMap;

import javax.websocket.Session;

public class InMemoryWebsocketRegistry {
	HashMap<String, Session> WebSocketSessionsRgistry;
	
	public InMemoryWebsocketRegistry() {
		System.out.println("InMemoryWebsocketRegistry()");
		WebSocketSessionsRgistry = new HashMap<String, Session>();
	}
	
	public void Add(Session session) {
		WebSocketSessionsRgistry.put(session.getId(), session);
	}
	
	public void Remove(Session session) {
		WebSocketSessionsRgistry.remove(session.getId());
	}
	
	public int Count() {
		return WebSocketSessionsRgistry.size();
	}
}
