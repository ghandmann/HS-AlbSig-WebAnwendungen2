#!/bin/env perl
use warnings;
use strict;
use 5.10.0;
use Mojo::UserAgent;

my $agent = Mojo::UserAgent->new();

# Read all entries via guestbook rest api
sub readEntries() {
	my $tx = $agent->get("http://localhost:8080/guestbook-rest/webapi/guestbook/entries.json");
	my $entries = $tx->res->json;

	foreach my $entry (@$entries) {
		say "Eintrag von: $entry->{poster}";
		say "Eintrag: $entry->{entry}";
		say "\n##########################################\n";
	}
}

# Create a new entry via guestbook rest api
sub createEntry() {
	print "Wie ist ihr Name? ";
	chomp(my $name = <STDIN>);
	print "Wie lautet ihre Email? ";
	chomp(my $email = <STDIN>);
	print "Wie lautet ihr Eintrag? ";
	chomp(my $entry = <STDIN>);

	my $jsonData = {
		poster => $name,
		email => $email,
		entry => $entry
	};

	my $tx = $agent->post("http://localhost:8080/guestbook-rest/webapi/guestbook", json => $jsonData);
	if($tx->res->is_success) {
		say "Super. Der Eintrag ist angekommen!";
	}
	else {
		say "Sorry! Aber da ging was schief!";
	}
}


say "$0: Möchten sie";
say "\t1) Alle Einträge anzeigen";
say "\t2) Einen Eintrag schreiben";
print "?> ";

my $choice = <STDIN>;
chomp($choice);

if($choice == 1) {
	readEntries();
}
if($choice == 2) {
	createEntry();
}