<%@ page language="java" contentType="text/html; charset=UTF-8"
    pageEncoding="UTF-8"%>
<%@taglib uri="http://java.sun.com/jsp/jstl/core" prefix="c"%>
<!DOCTYPE html>
<html>
<head>
<meta charset="UTF-8">
<title>Gästebuch</title>
<link rel="stylesheet" href="https://stackpath.bootstrapcdn.com/bootstrap/4.3.1/css/bootstrap.min.css" integrity="sha384-ggOyR0iXCbMQv3Xipma34MD+dH/1fQ784/j6cY/iJTQUOhcWr7x9JvoRxT2MZw1T" crossorigin="anonymous">
<style>
.entry {
	margin-bottom: 50px;
}

.entry .card-header a {
	color: white;
}
</style>

<!-- Include jQuery in our Guestbook -->
<script
  src="https://code.jquery.com/jquery-3.4.0.min.js"
  integrity="sha256-BJeo0qm959uMBGb65z40ejJYGSgR7REI4+CW1fNKwOg="
  crossorigin="anonymous"></script>
  
<!-- Include our JavaScript sources for the guestbook -->
<script src="../guestbook.js"></script>
</head>
<body>
	<div class="container">
		<h1>Dein Gästebuch!</h1>
		<h3>Neuer Eintrag</h3>
		<form method="post">
			<div class="form-group">
				<label for="poster">Dein Name:</label>
				<input class="form-control" type="text" id="poster" name="poster" placeholder="Dein Name"/><br/>
			</div>
			<div class="form-group">
				<label for="email">Deine eMail:</label>
				<input class="form-control" id="email" type="email" name="email" placeholder="Deine EMail"/><br/>
			</div>
			
			<div class="form-group">
				<label for="entry">Dein Text:</label>
				<textarea class="form-control" id="entry" name="entry" placeholder="Dein text"></textarea><br/>
			</div>
			
			<button class="btn btn-primary" type="submit">Eintragen!</button>
		</form>
		<hr/>
		
		<h2>Gästebucheinträge <a href="javascript:void(0)" id="reload-button" class="btn btn-success">Reload</a></h2>
		
		<div id="entry-container"></div>
	</div>
</body>
</html>