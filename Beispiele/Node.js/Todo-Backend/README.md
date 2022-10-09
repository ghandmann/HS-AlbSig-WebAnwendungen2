# Todo Backend
Dieser Ordner ist ein Platzhalter für die kommende Entwicklung eines einfachen Todo Backends.

## REST API

* `GET /api/v1/todos` Listet alle Todo Items auf
* `POST /api/v1/todos` Fügt ein neues Todo hinzu
* `DELETE /api/v1/todos/:itemid` Löscht das Todo mit der entsprechenden ID

## Datenmodel

### Todo Item
```json
{
  "text": "Der Text des TodoItems",
  "id": "RandomNanoId",
  "created": "2022-10-01T12:00:00Z"
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

## Bonus
## Todo
- Styling with Bootstrap
  - Themes with Bootswatch
