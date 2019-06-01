# SimpleWebApp Docker Example

For this example you need to install docker on your machine. See the [getting started guide](https://docs.docker.com/get-started/).

This document should give a quick guidance to reproduce the demo from the lecture.

## Building the container

Running the `docker build` command will create a new image on your system.

```
$ docker build -t hochschule/simple-web-app .
```


## Running the container on a random local port

Running the `docker run` command will start up a container on your system.

```
docker run --rm -P hochschule/simple-web-app
```

You can stop the container by hitting `ctrl+c`.

### Find out on which port the container is listening

In order to get information about running containers you can use the `docker ps` command in a different shell.

Example Output:
```
docker ps
CONTAINER ID        IMAGE                      COMMAND                  CREATED             STATUS              PORTS                     NAMES
c4f952ad9bdd        ghandmann/simple-web-app   "morbo SimpleWebApp"     7 seconds ago       Up 6 seconds        0.0.0.0:32769->3000/tcp   awesome_poitras
```

The `PORTS` column is telling you, on which port the container is listening. In the example above the line `0.0.0.0:32769->3000/tcp` means that on your local machine on port `32769` all traffic is forwarded inside the container on port `3000`.

## Running the container on a fixed local port

Running the `docker run` command will start up a container on your system.

```
docker run --rm -p 4711:3000 hochschule/simple-web-app
```

With the statement `-p 4711:3000` you tell docker to forward local traffic on port `4711` into the container on port `3000`.

You can stop the container by hitting `ctrl+c`.

## Removing the Images

Simply use the `docker rmi` command:

```
docker rmi hochschule/simple-web-app
```

Images can only be deleted, if there are no more containers using it. With the `-f` option deletion can be forced.
