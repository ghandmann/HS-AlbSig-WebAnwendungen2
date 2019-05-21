package de.sveneppler.guestbook_classic;

import javax.inject.Singleton;

import org.glassfish.hk2.utilities.binding.AbstractBinder;
import org.glassfish.jersey.server.ResourceConfig;
import org.glassfish.jersey.server.mvc.jsp.JspMvcFeature;

public class AppConfig extends ResourceConfig {

    public AppConfig() {
        packages("de.sveneppler");
        property(JspMvcFeature.TEMPLATE_BASE_PATH, "/WEB-INF");
        register(JspMvcFeature.class);
        
        register(InMemoryWebsocketRegistry.class);
        register(new AbstractBinder() {
            @Override
            protected void configure() {
                //bind(InMemoryWebsocketRegistry.class).to(InMemoryWebsocketRegistry.class).in(Singleton.class);
            	bindAsContract(InMemoryWebsocketRegistry.class);
            }
        });
         
    }
}