# GuestbookWebsocket

This node.js Express project is an example for a simple GuestbookWebsocket including a JavaScript based HTML5 client.

## Getting Started

Before running this example you need to install the dependencies with

```
$ npm install
```

afterwards you can run the buildin express webserver with

```
$ npm start
```

You can visit the guestbook via it's included HTML5 frontend on http://localhost:3000/

## API Documentation

The project includes a Swagger-UI Documentation on http://localhost:3000/swagger.html

## Major changes to GuestbookAPI Project

### Server Side
The Server now makes use of the node module `express-ws` to provide a new WebSocket endpoint via `/ws/live-updates`.

Clients that connect to this endpoint have a statefull WebSocket connection.

The API-Routes than emit specific message to all connected clients when a new entry is created or an entry is deleted.
This way all clients get live updates, when the guestbook state changes.

### Client Side
The HTML5 client now needs to connect to the WebSocket endpoint the Server provides. In case this fails or the connection get interrupted, a error message is displayed with an button to reconnect.

The whole entry handling has changed too. The client now has it's own `localGuestbookStore` which stores all known guestbook entries. In this simple example this is just an array of Entry-Objects.

When then client receives an `EntryCreated`-Event, it just inserts a new entry into the `localGuestbookStore`. When receiving a `EntryDeleted`-Event, the client removes the matching entry from the `localGuestbookStore`. This functionality is in the `handleWebSocketMessage` function of the client.

The whole rendering now relies on managing the `localGuestbookStore` and just re-rendering the whole page everytime something changes.