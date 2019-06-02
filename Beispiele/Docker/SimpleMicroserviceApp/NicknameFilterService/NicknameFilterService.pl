#!/usr/bin/env perl

use Mojo::Redis;
use Mojolicious::Lite;
use Mojo::JSON qw/j/;
use Mojo::IOLoop;
 
plugin Minion => {Pg => 'postgresql://postgres:ZTonmqNDYedo@postgres/postgres'};

my $redis = Mojo::Redis->new("redis://redis:6379/");


app->minion->add_task("filter-nickname" => sub {
  my ($job, $data) = @_;
  $job->app->log->info("Received new job! With msg=" . $data->{nickname});

  my @blackListedNicknames = ("bill", "gates", "steve", "ballmer");

  $job->app->log->info("Nickname before filtering: " . $data->{nickname});

  foreach my $nick (@blackListedNicknames) {
    $data->{nickname} =~ s/$nick/***/gi;
  }

  $job->app->log->info("Nickname after filtering: " . $data->{nickname});
  
  my $pubsub = $redis->pubsub;

  # Publish the message in the chatroom.
  $pubsub->notify("chatroom", j($data))->wait;

  $job->finish;
});
 
app->start;
