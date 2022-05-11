# Todo-Backend mit WebSockets

## Starten

```shell
$ npm install
$ npm run start
```

Öffnen Sie dann einen Browser auf [http://localhost:3000/todo.html](http://localhost:3000/todo.html).

Um die Multi-User-Synchronisation zu sehen, müssen sie die WebSeite am besten in zwei Browsern gleichzeitig öffnen.

### Websocat

Mit dem Tool [websocat](https://github.com/vi/websocat) können Sie sich zum WebSocket-Server auch via Kommandozeilen-Client verbinden.
Dort werden dann die JSON-Nachrichten direkt auf der Konsole angezeigt, immer wenn ein Todo-Item hinzugefügt oder gelöscht wird.

```shell
$ websocat ws://localhost:3000/live-updates/
```

Das Programm können Sie jederzeit mit `ctrl+c` beenden.


## Server

Serverseitig wird das Node.JS Modul [ws](https://www.npmjs.com/package/ws) eingesetzt.

## Client

Auf Clientseite wird die standard Browser-API für [Websockets](https://developer.mozilla.org/de/docs/Web/API/WebSocket) verwendet.