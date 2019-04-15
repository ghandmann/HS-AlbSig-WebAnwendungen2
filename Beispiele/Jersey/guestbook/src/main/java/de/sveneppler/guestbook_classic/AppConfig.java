package de.sveneppler.guestbook_classic;

import org.glassfish.jersey.server.ResourceConfig;
import org.glassfish.jersey.server.mvc.jsp.JspMvcFeature;

public class AppConfig extends ResourceConfig {

    public AppConfig() {
        packages("de.sveneppler");
        property(JspMvcFeature.TEMPLATE_BASE_PATH, "/WEB-INF");
        register(JspMvcFeature.class);
    }
}