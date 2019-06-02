FROM perl:5.30

RUN cpanm Mojolicious Mojo::Pg Mojo::Redis Minion

COPY WebApp.pl /opt/WebApp.pl

EXPOSE 3000

CMD ["morbo", "/opt/WebApp.pl"]

