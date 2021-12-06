# Design RESTfull API für TodoApp

## Welche Entitäten gibt es?
1) Todo Item

## Was kann man mit einem Todo Item machen?

* Auflisten aller Todos
* Anlegen
* Löschen ein konkretes TodoItem
* Löschen alle TodoItems

## Todo Item Spezifikation

```
{
    "id": 123,
    "text": "Ein Todoitem ist einfach nur ein string",
}
```

### Todos auflisten

* `GET /v1/todos/`<br/>
   Response:
```
[
    { "id": X, "text": "Item 1" },
    { "id": X, "text": "Item 2" },
    { "id": X, "text": "Item 3" },
]
```

### Todo Item anlegen

* `POST /v1/todos/`<br/>
  Request-Body:
```
{
    "id": X,
    "text": "Ein neues Item"
}
```

### Todo Item löschen

* `DELETE /v1/todos/:todoItemId`

### Lösche alle Todo Items

* `DELETE /v1/todos/`