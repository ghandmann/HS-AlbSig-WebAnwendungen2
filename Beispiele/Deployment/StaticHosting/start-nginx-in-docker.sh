#!/bin/bash

docker run --rm -p 8000:80 -v ./nginx.conf:/etc/nginx/conf.d/default.conf -v $(pwd)/wwwroot/:/usr/share/nginx/html:ro nginx:alpine
