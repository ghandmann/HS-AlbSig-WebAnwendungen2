#!/usr/bin/env perl

use strict;
use warnings;
use feature 'say';
use Mojo::UserAgent;

my $userAgent = Mojo::UserAgent->new();
# Keep the WebSocket connections open forever
$userAgent->inactivity_timeout(0);

$userAgent->websocket("ws://localhost:3000/ws/live-updates" => sub {
    my ($ua, $tx) = @_;

    say 'WebSocket handshake failed!' and return unless $tx->is_websocket;

    $tx->on('message' => sub {
        my ($tx, $msg) = @_;
        say " * Received WebSocket Message: $msg";
    });

    $tx->on('finish' => sub {
        my ($tx, $code) = @_;
        say " * WebSocket closed with code=$code";
    });
});

Mojo::IOLoop->start unless Mojo::IOLoop->is_running;