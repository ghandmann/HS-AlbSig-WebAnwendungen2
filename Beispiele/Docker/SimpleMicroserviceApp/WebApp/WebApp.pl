#!/usr/bin/env perl
use Mojolicious::Lite;
use Mojo::Pg;
use Mojo::Pg::Migrations;
use Mojo::Redis;
use Mojo::JSON qw/j/;

plugin Minion => {Pg => 'postgresql://postgres:ZTonmqNDYedo@postgres/postgres'};
plugin 'Minion::Admin';

my $pg = Mojo::Pg->new('postgresql://postgres:ZTonmqNDYedo@postgres/postgres');
my $migrations = Mojo::Pg::Migrations->new($pg);
$migrations->from_data;

my $redis = Mojo::Redis->new("redis://redis:6379/");


get '/' => sub {
  my $c = shift;
  $c->render(template => 'index');
};

post '/message' => sub {
  my $c = shift;
  my $data = $c->req->json;

  $c->minion->enqueue("filter-message", [$data]);

  $c->render(text => "OK");
};

websocket '/updates' => sub {
  my $c = shift;

  my $pubsub = $redis->pubsub;

  $pubsub->listen("chatroom" => sub {
    my ($self, $message) = @_;
    $c->send($message);
  });

  $c->on("finish" => sub {
    # Websocket connection went away, stop listening for the chatroom
    $pubsub->unlisten("chatroom");
  });

  # Don't autoclose this connection
  $c->inactivity_timeout(9999999);
};

app->start;
__DATA__

@@ index.html.ep
% layout 'default';
% title 'Welcome';
<h1>Welcome to the real time chat filter microservice thing</h1>
<form class="form">
<input type="text" name="nickname" placeholder="Pick a nickname" />
<input type="text" name="message" placeholder="Write a message" />
<a id="sendBtn" class="btn btn-primary">Submit</a>
<div id="messageBox"></div>


@@ layouts/default.html.ep
<!DOCTYPE html>
<html>
  <head>  
    <title><%= title %></title>
    <link rel="stylesheet" href="https://stackpath.bootstrapcdn.com/bootstrap/4.3.1/css/bootstrap.min.css" integrity="sha384-ggOyR0iXCbMQv3Xipma34MD+dH/1fQ784/j6cY/iJTQUOhcWr7x9JvoRxT2MZw1T" crossorigin="anonymous">
    <link rel="stylesheet" href="/style.css">
    <script src="https://code.jquery.com/jquery-3.3.1.min.js" crossorigin="anonymous"></script>
    <script src="https://cdnjs.cloudflare.com/ajax/libs/popper.js/1.14.7/umd/popper.min.js" integrity="sha384-UO2eT0CpHqdSJQ6hJty5KVphtPhzWj9WO1clHTMGa3JDZwrnQq4sF86dIHNDz0W1" crossorigin="anonymous"></script>
    <script src="https://stackpath.bootstrapcdn.com/bootstrap/4.3.1/js/bootstrap.min.js" integrity="sha384-JjSmVgyd0p3pXB1rRibZUAYoIIy6OrQ6VrjIEaFf/nJGzIxFDsf4x0xIM+B07jRM" crossorigin="anonymous"></script>
    <script src="/app.js"></script>
  </head>
  <body>
    <div class="container">
      <%= content %>
    </div>
  </body>
</html>


@@ migrations
-- 1 up
create table messages (message text);
-- 1 down
drop table messages;
