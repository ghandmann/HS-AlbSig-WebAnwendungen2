package de.sveneppler.guestbook_classic;

import java.util.HashMap;

import javax.annotation.ManagedBean;
import javax.annotation.Resource;
import javax.websocket.Session;
import javax.ws.rs.ApplicationPath;

import org.glassfish.hk2.api.Immediate;

public class InMemoryWebsocketRegistry {
	HashMap<String, Session> WebSocketSessionsRgistry;
	
	private static InMemoryWebsocketRegistry instance;
	
	public static InMemoryWebsocketRegistry GetInstance() {
		if(instance == null) {
			instance = new InMemoryWebsocketRegistry();
		}
		
		return instance;
	}
	
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
