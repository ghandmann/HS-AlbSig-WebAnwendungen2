#!/bin/bash

docker run --rm -p 80:80 \
	-v ./nginx.conf:/etc/nginx/conf.d/default.conf \
	-v $(pwd)/alpha/:/usr/share/nginx/html/alpha/:ro \
	-v $(pwd)/beta/:/usr/share/nginx/html/beta/:ro \
	nginx:alpine
