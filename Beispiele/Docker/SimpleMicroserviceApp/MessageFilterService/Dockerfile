FROM perl:5.30

RUN cpanm Mojolicious Mojo::Pg Mojo::Redis Minion

COPY MessageFilterService.pl /opt/

CMD ["/opt/MessageFilterService.pl", "minion", "worker"]

