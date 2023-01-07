# JWT Authentication Beispiel

In diesem Ordner befinden sich zwei in JavaScript geschriebene Anwendungen: `TokenIssuer` und `ShoeShop`.

Der `TokenIssuer` kann JSON Web Tokens (JWT) ausstellen, die entsprechend für den `ShoeShop` genutzt werden können um eine geschütze URL zu erreichen. Dies simuliert einen Login bei einer WebSeite und anschließend kann der Dienst dann genutzt werden.

## Erzeugen eines JWT

Im Ordner `TokenIssuer` kann mit dem Kommando `node app.js` ein gültiges JWT erzeugt werden. Das erzeugte JWT wird einfach auf der Konsole ausgegeben.

Um den Inhalt des Tokens anzupassen - die sog. Claims - muss die Datei `app.js` bearbeitet werden. Dort findet sich die Variable `claims`. Hier können die Werte beliebig angepasst werden. Durch erneutes ausführen der Anwendung erhält man dann ein neues JWT mit den neuen Claims.

## Der ShoeShop

Der `ShoeShop` ist eine gewöhnliche Express-Anwendung die mit `npm run start` gestartet werden kann. Danach ist die Anwendung unter `http://localhost:3000` erreichbar.

### Abrufen des Profils

Unter der Adresse `/profile` bietet der `ShoeShop` an, dass Profil eines angemeldeten Nutzers anzuzeigen. Um diese URL aufzurufen, muss der Request einen gültigen JWT enthalten.

JWTs werden i.d.R. mithilfe des `Authorization` HTTP-Headers an den Server geschickt. Um einen solchen Request an die `ShoeShop` Anwendung zu schicken kann z.B. curl verwendet werden:
```
curl http://localhost:3000/profile \
  -H "Authorization: Bearer $JWT"
```

Anstellen von `$JWT` muss dann in das Kommando der generierte JWT vom `TokenIssuer` eingefügt werden, Beispiel:

```
curl http://localhost:3000/profile \
  -H "Authorization: Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJzdWIiOiJNYWdpY01pa2UiLCJzaG9lc2l6ZSI6NDcsImJpcnRoZGF0ZSI6IjE5OTAtMDEtMDEiLCJpYXQiOjE2NzMxMjMyNzB9.fIxUSNhYNL6hJH22KlKDKulz7aGmYXDfMdhBLKV7b9I"
```
**Hinweis**: Der Token aus dem Beispiel ist bereits abgelaufen!

### Abrufen der Admin-Seite

Zusätzlich zum Profil, dass jeder angemeldete User abrufen darf, gibt es einen fiktiven Admin-Bereich unter `/admin`.

Um dort Zugang zu erhalten, muss ein gültiges JWT übermittelt werden, dass den Claim `isAdmin` enthält und dessen Wert auf `true` gesetzt wurde.

Ein solches Token kann mithilfe des `TokenIssuers` erzeugt werden, der `isAdmin` Claim muss entsprechend in der Datei `app.js` auf `true` gesetzt werden. Danach kann erneut ein Token erzeugt werden, welches dann für den Request auf `/admin/` verwendet wird.

## Token Manipulation
Das generierte Token kann bequem mithilfe der WebSite [jwt.io](https://jwt.io) dekodiert werden. So können die gesetzten Claims im Token nochmals überprüft werden.

Des weiteren ermöglicht die Seite auch die Veränderung des Tokens. So ist es beispielsweise möglich, den `isAdmin`-Claim von `false` auf `true` zu setzen. Im linken Textfeld wird dann automatisch ein neuer Token generiert. Dieser ist aber ungültig, da er nicht die korrekte digitale Signatur enthält. Dennoch kann so testweise ein manipulierter Token erzeugt werden, der dann an den `/profile` oder `/admin` Endpunkt geschickt werden kann.
