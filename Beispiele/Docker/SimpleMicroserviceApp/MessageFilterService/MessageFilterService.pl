#!/usr/bin/env perl

use Mojolicious::Lite;
use Mojo::JSON qw/j/;
 
plugin Minion => {Pg => 'postgresql://postgres:ZTonmqNDYedo@postgres/postgres'};

app->minion->add_task("filter-message" => sub {
  my ($job, $data) = @_;
  $job->app->log->info("Received new job! With msg=" . j($data));

  my @blackListedWords = ("microsoft", "windows", "outlook");

  $job->app->log->info("Message before filtering: " . $data->{message});

  foreach my $word (@blackListedWords) {
    $data->{message} =~ s/$word/***/gi;
  }

  $job->app->log->info("Message after filtering: " . $data->{message});

  $job->finish;

  $job->minion->enqueue("filter-nickname", [$data]);
});
 
app->start;
