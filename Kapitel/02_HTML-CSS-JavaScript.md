---
marp: true
theme: vorlesung
backgroundImage: url('./images/background.svg')
paginate: true
footer: "Web Anwendungen  - Sommersemester 2026"
---


<!-- _class: lead -->

# HTML, CSS & JavaScript
## Web Anwendungen 2
## Sven Eppler

![width:1100px center](./images/sodge-hochschule.png)

---

<!-- _class: chapter -->

# HTML, CSS & JavaScript
## Building blocks of the web!

---

# HTML, CSS & JavaScript

- Diese Vorlesung ist als "schnelle" Einführung gedacht aka "Druckbetankung"
  - Im Grunde wird angenommen, dass Sie das alles schon können
- Sie gibt einen groben Überblick über diese drei Technolgien und wie sie miteinander interagieren
- Wenn Sie hierbei selbst Lücken identifizieren:
  - müssen Sie diese im Selbstudium schließen. ;)
  - Dennoch gilt: Wenn Fragen aufkommen, einfach Fragen!


---

<!-- _class: chapter -->

# HTML
## HyperText Markup Language

---

# HTML: Kurze Geschichte

- Erschaffen 1992 am CERN
- Antwort auf die Frage, wie man Informationen über das "junge" WWW mittels HTTP zugänglich macht
- Wird seit 1994 durch das W3C (World Wide Web Consortium) standartisiert
- HTML ist eine sog. Beschreibungssprache (markup language) **keine** Programmiersprache
  - HTML wird daher auch nicht "programmiert" sondern einfach "geschrieben"
---

# HTML: Kernelemente

- HTML wird einfach plain text in eine Datei geschrieben
- Ein HTML-Dokument besteht aus:
  - Den HTML-Tags, die einer Grundstruktur folgen
  - Dem eigentlichen Content, einfachem Text

---

# HTML: Tags

- HTML-Tags müssen vom Content unterscheidbar sein, daher werden sie in spitze Klammern gesetzt `<` & `>`
- HTML-Tags haben i.d.R. einen öffnenden und schließenden Tag, diese umschließen den Content
  - `<h1>Eine Überschrift</h1>`, `<footer>Fußzeile</footer>`
- Es gibt aber auch sog. "short tags", bei denen Content keinen Sinn macht
  - `<br/>`, `<img src="..." />`
- Es gibt "sichtbare" und "unsichtbare" HTML-Tags
  - z.B. `<html></html>` umschließt das gesamte Dokument, hat aber keine visuelle Representation
  - `<strong>Fettgedruckt</strong>` zeigt den Inhalt Fettgedruckt an

---

# HTML: Tags

- HTML-Tags beschreiben nur die Semantik, nicht aber das aussehen (siehe [Semantic Web](https://de.wikipedia.org/wiki/Semantic_Web))
  - Browser haben für bestimmte Tags bestimmtes aussehen "frei definiert"
- Ein HTML-Tag kann Attribute haben:
  - `<a href="https://google.com">google</a>`
  - `<img src="..." title="Some Title" />`
- HTML-Tags können beliebig verschachtelt werden:
  `<a href="https://google.com"><img src="image.jpg" /></a>`
---

# HTML: Basic File Structure

- HTML-Dokumente "brauchen" ein `<html>` Root Element
- Trennung zwischen Meta-Informationen (`<header>`) und Content (`<body>`)

```html
<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <title>Document Title</title>
</head>
<body>
    Hallo, ich bin der Inhalt.
</body>
</html>
```

---

# HTML: Basic File Structure

- Aus der Verschachtelung der HTML-Tags ergibt sich eine Baum-Struktur
  - Dieser Baum ist später wichtig, aka DOM (Document Object Model)
  - Wird in CSS und JavaScript genutzt, um Elemente innerhalb des Dokumentes zu "addressieren" (targeting)

---
# HTML: Header

- Im `<head>` werden diverse Metainformationen über das Dokument abgelegt
  - `<title></title>` Seitentitle
  - `<style></style>` Eingebettete Stylesheets
  - `<link rel="stylesheet" src="...">` Verlinke Stylesheets
  - `<meta>` Verschiende Meta-Informationen
  - `<script></script>` JavaScript

---

# HTML: Body

- Im `<body>` wird der angezeigt Content hinterlegt
- Typischerweise verschachtelt in HTML-Tags
- Hier dürfen z.B. auch beliebig weitere `<script>`-Tags vorkommen
  - Aber z.B. `<style>`-Tags sind nicht verlaubt

---

# HTML: "Schwacher" Standard

- Grundsätzlich ist HTML standardisiert (aktuell HTML5)
- Syntaxfehler in HTML führen aber nicht zu "Fehlern" im Browser
  - Lediglich die Darstellung ist evtl. überraschend
- Browser sind sehr "flexibel" was die HTML-Regeln angeht
  - Viele Fehler werden vom Browser automatisch gefixt (z.B. vergessene Closing-Tags)
- Mit dem [w3c Validator](https://validator.w3.org) kann ein HTML Dockument validiert werden

---

# HTML: Resourcen

- [Mozilla Developer Network](https://developer.mozilla.org/de/)
- [w3c Schools](https://www.w3schools.com/)
- [SelfHTML](https://wiki.selfhtml.org/)

---

<!-- _class: chapter -->

# CSS
## Cascading Stylesheets

---

# CSS: History

- CSS wurde 1994 durch HÃ¥kon Wium Lie erdacht
- 1998 dann offiziell durch das w3c standardisiert
- Grundidee: Eine spezielle Syntax um das Design von Beschreibungssprache zu steuern
  - Problem: HTML wurde immer "fetter" mit Design-Elementen statt einfach nur den Content zu transportieren.
  - Trennung von Daten und Design

---

# CSS: Idee

- Es sollen Formatierungsregeln definiert werden
  - Dazu nutzt man CSS Properties (Schriftgröße, Hintegrundfarbe, etc.)
- Diese Regeln sollen sich auf Elemente des HTML-Baums anwenden lassen
  - Dazu nutzt man CSS Selectoren

---

# CSS: Pseudo Syntax

  ```css
  selector {
      property1: value1;
      property2: value2;
  }
  ```

---

# CSS: Properties

- CSS Properties steuern die optischen Eigenschaften, gänge Properties sind z.B.:
  - `font-size` - Schriftgröße
  - `color` - Schriftfarbe
  - `background` - Hintergrundfarbe
  - `border` - Umrandung
- [Auflistung aller CSS Properties](https://developer.mozilla.org/en-US/docs/Web/CSS/Reference/Properties)

---
# CSS: Selectors

- Tag-Selector: Selektiert alle Elemente die genau diesen HTML-Tag haben
```css
// Alle a-Tags
a { color: orange }

// Alle h1-Tags
h1 { font-size: 60pt }
```

---

# CSS: Selectors

- Descendant-Selector: Selektiert alle "umschlossenen" Elemente mit dem passenden HTML-Tag
  - Dabei können beliebig viele "Zwischenelemente" existieren
```css
// Alle links innerhalb einer Tabelle pink
table a { color: pink; }
```

```html
<table>
  <tr>
    <td>Some <a href="">link</a></td> <!-- match -->
  </tr>
</table>
```

---

# CSS: Selectors

- Child-Selector: Selektiert alle unmittelbaren Kindelemente

```css
section > h1 { color: black; }
```
```html
<section>
  <h1>Überschrift</h1> <!-- match -->
  <div>
    <h1>Andere Überschrift</h1> <!-- no match -->
  </div>
</section>
  ```
---

# CSS: Selectors

- [Class-Selector](https://developer.mozilla.org/en-US/docs/Web/CSS/Reference/Selectors/Class_selectors): Selektiert alle Elemente die die passende Klasse haben

```css
.error { color: red; }
```

```html
<div class="error">Blubb</div> <!-- match -->
<table class="error"> ... </table> <!-- match -->
<h1>Hallo</h1> <!-- no match -->
```

---

# CSS: Selectors

- [Id-Selector](https://developer.mozilla.org/en-US/docs/Web/CSS/Reference/Selectors/ID_selectors): Selektiert das Element mit der passenden ID

```css
#home-link { color: white; }
```

```html
<a href="blubb.html">Some link</a> <!-- no match -->
<a href="home.html" id="home-link">Home</a> <!-- match -->
```

---

# CSS: Selectors

- [Pseudo-Classes](https://developer.mozilla.org/en-US/docs/Web/CSS/Reference/Selectors/Pseudo-classes): Spezielle "Klassen" die automatisch vom Browser erzeugt werden

```css
// Beim überfahren mit der Maus
a:hover { color: pink; }
```
---

# CSS: Selectors

- Nesting-Selectors: Browser unterstützen mitterlweile das verschachteln von Regeln

```css
a {
  color: blue;

  // Entspricht "a img" Selektor
  img { border: solid black 1px; }

  // Entspricht "a h1" Selektor
  h1 { color: orange; }
}
```

---

# CSS: Einheiten

- Absolut:
  - px, cm, pt
- Relativ:
  - %, rem, em
- Farben:
  - Hex `#FF0000`, `RGB(0, 0, 255)`, `RGBA(0, 255, 0, 0)`, Colornames `orange`
- [CSS Units](https://developer.mozilla.org/en-US/docs/Learn_web_development/Core/Styling_basics/Values_and_units)

---

# CSS: Deklaration

- Eigene CSS-Datei via `<link rel="stylesheet">` im `<head>`-Tag
- Eingebettet in den `<head>` via `<style> ... </style>`-Tags
- Inline am jeweiligen HTML-Element via `style="..."` Attribut
  `<a href="google.com" style="color: red; font-size: 20pt">Link</a>`
- Präzedenz:
  1. Inline
  1. Eingebettet
  1. CSS-Datei

---

# CSS: Infos

- Selector Game: [CSS Diner](https://flukeout.github.io)
- [CSS Zen Garden](https://csszengarden.com): Identisches HTML, unterschiedliches CSS
- [Mozilla Developer Network: CSS](https://developer.mozilla.org/en-US/docs/Web/CSS)
- [caniuse.com](https://caniuse.com): Zeigt an welche Browser welches CSS unterstützen

---

<!-- _class: chapter -->

# JavaScript
## Client side scripting

---

# JavaScript: History

- 1995 vom Netscape Navigator eingeführt
- Seit 1997 offizieller ECMA Standard (deshalb wird es auch oft ECMAScript genannt)
  - ECMA = European Computer Manufacturers Association
- Sollte mehr dynamik auf Client-Seite ermöglichen
- Heute unverzichtbarer Bestandteil des modernen Webs

---

# JavaScript: Einbinden

- JavaScript kann direkt in HTML eingebettet werden via `<script>`-Tag

```html
<html>
  <head>
  </head>
  <body>
    <script>
      console.log("Hello, World!");
    </script>
  </body>
</html>
```

---

# JavaScript: Einbinden

- JavaScript kann auch als externe Resource referenziert werden

```html
<html>
  <head>
  </head>
  <body>
    <script src="my-script.js"></script>
  </body>
</html>
```

---

# JavaScript: Ausführung

- Grundsätzlich wird JavaScript sofort ausgeführt, sobald der Browser es antrifft
  - Eingebettetes JavaScript wird entsprechend direkt ausgeführt
  - Referenziertes JavaScript wird erst vom Server geladen und dann ausgeführt
- Beides "blockiert" den Render-Thread und verzögert den "[first content paint](https://developer.mozilla.org/en-US/docs/Glossary/First_contentful_paint)"
- Daher nutzt man heutzutage meist das `defer` und/oder `async` Attribut
  - [Dokumentation](https://www.w3schools.com/tags/att_script_defer.asp)

---

# JavaScript: Syntax

- JavaScript ist eine multi-paradigmen Sprache und basiert stark auf:
  - C-Style Sprachen
  - LISP

```javascript
function sum(numbers) {
  let sum = 0;
  for(let i = 0; i<numbers.length; i++) {
    sum += numbers[i];
  }

  return sum;
}

const myNumbers = [1, 2, 3, 4];
const mySum = sum(myNumbers);
console.log("Summe=" + mySum);
```

---

# JavaScript: Scoping

- Default: Function-Level-Scope. Alle Variablen sind in der gesamten Funktion verfügbar. Bad Practice 👎
- Besser: `let` und `const` aktivieren Block-Level-Scope.

---
# JavaScript: Scoping

```javascript
function blockScopeBeispiel() {
  var funktionsVariable = "Ich bin überall in der Funktion sichtbar";
  
  if (true) { // Neuer Block-Scope
    let blockVariable = "Ich bin nur in diesem IF-Block sichtbar";
    const blockKonstante = "Ich auch!";
    var falscherFreund = "Ich ignoriere Blöcke (var)!";
    
    console.log("Innerhalb des IF-Blocks:");
    console.log(blockVariable); // Funktioniert
  }
  
  console.log("\nAußerhalb des IF-Blocks:");
  console.log(funktionsVariable); // Funktioniert
  console.log(falscherFreund);    // Funktioniert, weil 'var' keinen Block-Scope hat
  console.log(blockKonstante); // SyntaxError, weil blockKonstante nur im If-Block gültig ist
}
```

---

# JavaScript: First-Class-Functions

- In JavaScript können Funktionen nicht nur aufgerufen werden
- Sondern auch in Variablen verpackt werden und daher auch als Übergabeparameter genutzt werden

```javascript
function sayBlubb() { console.log("Blubb"); }

const myFuncVar = sayBlubb; // Nur Zueweisung, kein Aufruf! Fehlende ()!
myFuncVar(); // Ruft Funktion sayBlubb auf!

function callOther(otherFunc) {
  otherFunc();
}
callOther(myFuncVar); // Ruft ebenfall sayBlubb auf
```

---

# JavaScript: First-Class-Functions

- Entsprechend gibt es auch anonyme Funktionen die gar keinen Namen besitzen

```javascript
const someFunction = function { console.log("Ich bin eine anonyme Funktion"); }
someFunction();

const numbers = [1, 2, 3, 4];

const sayNumber = function (n) {
    console.log(n) 
};

numbers.forEach(sayNumber); // Gibt die Nummern von 1 bis 4 aus
```

---

# JavaScript: First-Class-Functions

- Da in funktionaler Programmierung anonyme Funktionen häufig vorkommen, gibt es einen extra shortcut, sog. Lambda-Syntax

```javascript
const sayNumber = (n) => {
  console.log(n)
};

const numbers = [1, 2, 3, 4];
numbers.forEach(sayNumber); // Gibt die Nummern von 1 bis 4 aus
```

```javascript
// JavaScript erlaubt einige Abkürzungen im Code ;)
// Macht genau das selbe wie oben
[1, 2, 3, 4].forEach(n => console.log(n));
// Gibt die Quadrate der Zahlen aus
[1, 2, 3, 4].forEach(n => console.log(n*n));
```

---

# JavaScript: Browser Integration

- Für die Verwendung von JavaScript im Browser gibt es eine spezielle Variable: `window`
  - Diese Existiert nur im Browser-Context
  - Ermöglicht den Zugriff auf:
    - Den DOM `window.document`
    - Zugriff auf Browser APIs z.B. localStorage `window.localStorage`
    - Zugriff auf `clientInformation` für z.B. Fenstergröße
- `window` hat eine spezielle "Magie":
  - Alle Properties die für das `window`-Objekt definiert werden, werden auch als globale Variable angeboten

---

# JavaScript: JSON

- JavaScript Object Notation ist eine einfache Sprache zum deklarieren von komplexen Datenstrukturen
- Jede JSON Struktur ist auch immer valides JavaScript!
- JSON Besteht aus:
  - Werten (Zahlen, Strings)
  - Arrays
  - Objects
- Siehe [json.org](https://www.json.org/json-en.html)

---

# JavaScript: JSON

- Ein JSON Objekt sind einfache Schlüssel-Wert-Paare
- Beispiel: Ein Buch als JSON representieren
```javascript
{
  "title": "The lord of the rings (1-3)",
  "author": "J.R.R.Tolkien",
  "released": "1954-07-29",
  "ISBN": "0-618-00225-1"
}
```

---

# JavaScript: JSON

- In JSON können aber auch Arrays deklariert werden
```javascript
[ 1, 2, 3, 4, 5 ]
```

- Diese können gemischte Werte enthalten
```javascript
[ "Sven", 1, 2, "Test", undefined, true, false ]
```

---

# JavaScript: JSON

- Ein Array kann auch aus Objekten bestehen

```json
[
  {
    "title": "The Fellowship of the Ring",
    "author": "J.R.R.Tolkien",
    "ISBN": "0-618-00222-7"
  },
  {
    "title": "The Two Towers",
    "author": "J.R.R.Tolkien",
    "ISBN": "0-618-00223-5"
  }
]
```

---

<!-- _class: image-only -->
# JavaScript: JSON

- So lassen sich komplexere Datenstrukturen erzeugen:

```javascript
{
  "authors": [
    { 
      "name": "J.R.R. Tolkien",
      "books": [
        { "title": "The Fellowship of the Ring", "ISBN": "0-618-00222-7" },
        { "title": "The Two Towers", "ISBN": "0-618-00223-5" }
      ]
    },
    {
      "name": "Dan Brown",
      "books": [
        { "title": "Sakrileg", "ISBN": "3785721528" }
      ]
    }
  ]
}
```

---

<!-- _class: chapter -->

# Ende
## Noch Fragen?