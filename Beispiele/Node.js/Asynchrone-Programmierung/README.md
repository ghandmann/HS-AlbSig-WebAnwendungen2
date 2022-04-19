# Asynchrone Programmierung in JavaScript/Node.JS

In diesem Projekt werden drei verschiedene syntaktische Möglichkeiten gezeigt, wie in JavaScript asynchrone Programmierung aussehen kann.

Dabei erfüllen alle drei Beispiele die exakt gleiche Aufgabe (im Erfogls- als auch im Fehlerfall).

## callbackStyle

Die Funktion `callbackStyle` zeigt auf, wie die Syntax aussieht, wenn für jede asynchrone Funktion die aufgerufen wird, direkt ein passender Callback übergeben werden muss.

Hierbei entsteht schnell eine sog. [callback hell](http://callbackhell.com). Jeder weitere asynchrone Aufrufe, muss innerhalb des Callback des vorgänger ausgeführt werden, um eine sequentielle Abarbeitung zu erreichen. Das liegt daran, dass eine asynchrone Funktion nach dem Aufruf **sofort** zum Aufrufer zurück kehrt und entsprechend später, wenn der asynchrone Vorgang beendet ist, denn Callback aufruft.

Die Fehlerbehandlung muss hier immer manuell durchgeführt werden. Jedes Callback enthält typischerweise zwei Parameter:

1) Das Ergebnis des asynchronen Aufruf
2) Ein Error-Object

Hat das Error-Object einen wert (also ist es nicht `undefined`) ist keine Ergebnis vorhanden, sondern ein Fehler aufgetreten und die weitere Verarbeitung muss evtl. gestoppt werden.

## promiseStyle

Die Funktion `promiseStyle` zeigt wie man mithilfe von [Promises](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Promise) asynchrone Funktionen in einer sequentiellen Reihenfolge aufrufen kann, ohne das dabei eine `callback hell` entsteht. Dabei geben die asynchronen Funktionen als Ergebnis immer ein `Promise`-Objekt zurück. In jedem verketteten `then()` aufruf, wird das ergebnis des vorhergehenden asynchronen Aufrufs als Übergabeparameter übergeben.

Dadurch bleibt die Verschachtelungsebene konstant. Allerdings müssen immernoch zahlreiche Callbacks implementiert und übergeben werden. Was bei komplexeren Aufgaben weiterhin zu recht länglichem und unleserlichem Code führt.

Die Fehlerbehandlung wird in diesem Fall mit der speziellen Methode `catch()` umgesetzt. Sobald ein Promises in der Kette `rejected` wird - also nicht erfolgreich beendet wird - wird das Callback ausgeführt, dass über die `catch()` Methode gesetzt wurde.


## asyncAwaitStyle

Die Funktion `asyncAwaitStyle` zeigt auf, wie man mithilfe von [async](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Statements/async_function) und [await](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Operators/await) eine auf `Promises` basierende API auf eine scheinbar sequentielle art aufrufen kann.

Diese Syntax führt insgesamt zum aufgeräumtesten und "vertrautesten" Quellcode, der dennoch die gesamten Vorteile von asynchroner Programmierung nutzt.

Die Fehlerbehandlung kann hierbei durch das gewohnte try-catch-Konstrukt erfolgen, da dass `await` Keyword dafür sorgt, dass auftretende Fehler im asynchronen Prozess aus dem `Promise` in eine Exception umgewandelt werden.
