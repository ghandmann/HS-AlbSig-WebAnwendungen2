FROM perl:5.30

COPY WebApp.pl /opt/WebApp.pl

RUN cpanm Mojolicious Mojo::Pg Mojo::Redis

EXPOSE 3000

CMD ["morbo", "/opt/WebApp.pl"]

