package de.sveneppler.guestbook_classic;

import javax.inject.Singleton;
import javax.ws.rs.core.Application;

import org.glassfish.hk2.api.Immediate;
import org.glassfish.hk2.utilities.binding.AbstractBinder;
import org.glassfish.jersey.server.ResourceConfig;
import org.glassfish.jersey.server.mvc.jsp.JspMvcFeature;

import com.sun.xml.bind.v2.runtime.unmarshaller.XsiNilLoader.Single;

public class AppConfig extends ResourceConfig {

    public AppConfig() {
        packages("de.sveneppler");
        property(JspMvcFeature.TEMPLATE_BASE_PATH, "/WEB-INF");
        register(JspMvcFeature.class); 
    }
}