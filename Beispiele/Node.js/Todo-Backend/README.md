Platzhalter für die kommende Implementierung eines Todo-App backends.

## Todo

1) Include nanoid:
  ```javascript
<script type="module">
    import { nanoid } from 'https://cdn.jsdelivr.net/npm/nanoid/nanoid.js';
    // make nanoid globally available
    window.nanoid = nanoid;
</script>
```

2) Refactor Todo-Item-Struktur
  - Todo-Item Objekt: `{ "text": "todo-item-text", "id": 4711 }`
  - `renderTodoListItem`
  - `saveBtn.addEventListener("click", ...`
  - `removeTodoItem`
  - `saveTodoListItemInBackend`
  - `deleteTodoItemFromBackend`
  
3) Anpassen des `POST /todo-items` Endpoints
4) Remove obsolete functions
5) Styling with Bootstrap
  - Themes with Bootswatch
