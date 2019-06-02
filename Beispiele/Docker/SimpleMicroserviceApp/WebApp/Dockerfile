FROM perl:5.30

RUN cpanm Mojolicious Mojo::Pg Mojo::Redis Minion

COPY . /opt/

EXPOSE 3000

CMD ["morbo", "/opt/WebApp.pl"]

