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

## Unsatified Link error (Linux)

If you get an error saying something like `java.lang.UnsatisfiedLinkError: org.sqlite.core.NativeDB._open ...` 

Go to `/usr/share/tomcat8` or where ever tomcat is installed, this might differ depending on your distro. Type `ls -l` you will see all the files and permissions in this directory. There are some symlinks in this folder, they are identifiable by the arrow. Navigate to the path behind the arrow for, example go to `/etc/tomcat8`. 

Type `ls -l` you will see all the files and permissions in this directory. There are two columns which contain the user and the group this file belongs to. For me the owner is `root` and the group is `tomcat8`.
Now type `sudo usermod -aG tomcat8 $USER`. Change `tomcat8` to whatever the group is on your system. Now log off and try again.