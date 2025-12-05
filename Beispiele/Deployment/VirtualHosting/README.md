# Virtual Hosting Beispiel

In diesem Beispiel wird ein lokaler NGINX server gestartet der auf die beiden Domains:

1) alpha.dev.sveneppler.de
1) beta.dev.sveneppler.de

konfiguriert ist. Jede der beiden Domains bekommt ein eigenes `wwwroot` zugewiesen und der WebServer liefert ausschließlich Daten die zu der Domain passen, die angefragt wurde.

Mittels `./start-nginx-in-docker.sh` kann der WebServer gestartet werden.

Über `curl http://alpha.dev.sveneppler.de` oder `curl beta.dev.sveneppler.de` können dann die jeweiligen Virtual Hosts abgerufen werden. Funktioniert natürlich auch im Browser.

Hinweis: Die Domain `*.dev.sveneppler.de` zeigt immer auf `127.0.0.1` bzw. `::1`, also das Loopback-Device. Bestimmte NAT-Router (insbesondere Fritz.Boxen) verhindern die Auflösung solcher Domains (aka DNS Rebind Schutz). Das lässt sich testen indem man auf der Konsole den Host auflöst:

```
$ host alpha.dev.sveneppler.de
```

Kommt hier nur eine leere Antwort, ist vermutlich der DNS Rebind Schutz aktiv und verhindert die Auflösung.
