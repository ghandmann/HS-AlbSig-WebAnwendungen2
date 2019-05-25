# Minimal Jersey Guestbook Example

This is just a short example in how to use Jersey an for some live demonstration.

## SQLite Database

This project currently relies on a SQLite-Database located at `/tmp/sample.db`. This has to be changed in `Guestbook.java`.

## SQLite Databsae Creation (Linux)

The simplest way to create the Database is to navigate into the `./sql` folder and call this:

```
$ cat create.sql | sqlite3 /tmp/sample.db
```

## SQLite Databsae Creation (Windows)

You are on your own. Try the DBeaver tool.