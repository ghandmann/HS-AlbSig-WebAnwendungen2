package de.sveneppler.guestbook_classic;

import java.util.HashMap;

import javax.annotation.ManagedBean;
import javax.annotation.Resource;
import javax.websocket.Session;
import javax.ws.rs.ApplicationPath;

import org.glassfish.hk2.api.Immediate;

import com.fasterxml.jackson.core.JsonProcessingException;
import com.fasterxml.jackson.databind.ObjectMapper;
import com.fasterxml.jackson.databind.ObjectWriter;

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
	
	public void BroadcastMessage(EntryDeletedMessage msg) throws JsonProcessingException {
		// Convert msg to JSON
		ObjectWriter mapper = new ObjectMapper().writer().withDefaultPrettyPrinter();
    	String json = mapper.writeValueAsString(msg);
    	
    	BroadcastMessage(json);
	}
	
	public void BroadcastMessage(NewEntryMessage msg) throws JsonProcessingException {
		// Convert msg to JSON
		ObjectWriter mapper = new ObjectMapper().writer().withDefaultPrettyPrinter();
    	String json = mapper.writeValueAsString(msg);
    	
    	BroadcastMessage(json);
	}
	
	private void BroadcastMessage(String message) {
		for(Session session : WebSocketSessionsRgistry.values()) {
			try {
				session.getBasicRemote().sendText(message);
			}
			catch(Exception ex) { /* left blank intentionally */ }
		}
	}
}
