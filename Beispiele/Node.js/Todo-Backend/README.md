# Todo Backend
Dieser Ordner ist ein Platzhalter für die kommende Entwicklung eines einfachen Todo Backends.

## REST API

* `GET /api/v1/todos` Listet alle Todo Items auf
* `POST /api/v1/todos` Fügt ein neues Todo hinzu
* `DELETE /api/v1/todos/:itemid` Löscht das Todo mit der entsprechenden ID

## Datenmodel

### Todo Item
Ein konkretes Todo Item bilden wir in form eines JSON Objektes ab, dass aus drei Properties besteht:
 * `title`: Der eigentlich Titel des Todo Items
 * `id`: Die ID des Items um es zu referenzieren (z.B. beim löschen)
 * `created`: Ein Zeitstempel der angibt, wann das Item angelegt wurde

 Beispiel JSON-Objekt:
```json
{
  "title": "Der Text des TodoItems",
  "id": "RandomNanoId",
  "created": "2022-10-01T12:00:00Z",
}
```

## Nanoid

```javascript
<script type="module">
    import { nanoid } from 'https://cdn.jsdelivr.net/npm/nanoid/nanoid.js';
    // make nanoid globally available
    window.nanoid = nanoid;
</script>
```
