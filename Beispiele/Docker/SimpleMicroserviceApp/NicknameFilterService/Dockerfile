FROM perl:5.30

RUN cpanm Mojolicious Mojo::Pg Mojo::Redis Minion

COPY NicknameFilterService.pl /opt/

CMD ["/opt/NicknameFilterService.pl", "minion", "worker"]

