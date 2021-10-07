<!-- 
	This template is a "partial" template, since it has no HTML-Root-Tag.
	Therefore the result can be used to inject the generated HTML into an existing HTML-Page 
-->

<%@ page language="java" contentType="text/html; charset=UTF-8"
    pageEncoding="UTF-8"%>
<%@taglib uri="http://java.sun.com/jsp/jstl/core" prefix="c"%>

<c:forEach var="entry" items="${ model.entries }">
	<div class="card entry">
	  <div class="card-header text-white bg-secondary">
	    Von <strong>${ entry.poster }</strong> (${ entry.email })
	    <a href="javascript:void(0)" data-id="${ entry.id }" class="float-right">Eintrag Löschen</a>
	  </div>
	  <div class="card-body bg-dark text-white">
	    <p class="card-text">${ entry.entry }</p>
	  </div>
	</div>
</c:forEach>