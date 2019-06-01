FROM perl:5.30

# Install the Mojolicious WebFramework inside the container
RUN cpanm Mojolicious

# Copy the SimpleWebApp file into the Container
COPY ./src/SimpleWebApp /opt/SimpleWebApp

# Define the default working directory when starting the container
WORKDIR /opt/

# Tell the Docker Daemon that this image provides some service on port 3000
EXPOSE 3000

# What to start when the container starts
CMD ["morbo", "SimpleWebApp"]
