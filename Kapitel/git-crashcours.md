# Git Crashcours

## Was ist ein Versionskontrollsystem (VCS)?
* Erfassen aller Änderungen am Quellcode "Change Management":
   * Was hat sich geändert?
   * Wer hat was geändert?
   * Wann hat sich was geändert?
* Vereinfacht die Kollaboration mehrerer Autoren
* Reproduzierbares wiederherstellen alter Versionen

## Was ist git?
* Ein VCS entwickelt von Linus Torvalds zum Verwalten des Linux Kernels
* Ein sog. dezentrales VCS (vergleiche: Mercurial)
   * Strenge Unterscheidung zwische "lokal" und "remote" Zustand
   * Volle Funktion auch ohne Netzwerkverbindung gewährleistet
* Leichtgewichtige Implementirung mithilfe von Dateien und sog. Symlinks
* Abbildung der Vergangenheit als "gerichteter azyklischer Graph"

## Installation
* Linux: Einach aus dem lokalen Repository installieren. Z.B. `apt get install git`
* Windows:
    * Git for windows: https://git-scm.com/download/win
    * **NICHT EMPFOHLEN**: TortoiseGit
* MaxOS: Einfach `git` im Terminal eingeben, MacOS bietet die Installation dann an
  Siehe "Installation unter macOS" unter https://git-scm.com/book/de/v2/Erste-Schritte-Git-installieren

## Tools
* gitg (https://wiki.gnome.org/Apps/Gitg/)
* Atlassian SourceTree (https://www.sourcetreeapp.com)
* Meld als Diff-Viewer (https://meldmerge.org)

## Grundbegriffe
### Working Copy
Die "working copy" ist für git die aktuell "ausgecheckte" Version an dem der Benutzer arbeiten kann.

Da bei git "alles nur dateien" sind, sind in einem Repository auch immer alle Versionen vorhanden. Lediglich eine Version kann als "working copy" aktuell editiert werden.

Sonderfall "dirty working copy": Eine "schmutzige" working copy ist ein spezieller Zustand bei dem eine Version ausgecheckt wurde, es zu der zuletzt im Repository "eingecheckten" Version aber Änderungen gibt. Diese Änderungen sind aber von git noch nicht erfasst.

### Commit
Ein "Commit" erfasst Änderungen an der "working copy" und fügt diese Änderungen zur "Versionsgeschichte" hinzu.

Ein Commit besteht im wesentlichen aus:
* Commitbeschreibung
* Autor
* Zeitstempel
* Zeiger auf den Vorgänger-Commit
* Die gemachten Änderungen

All diese Informationen werden mit dem SHA-1 verfahren gehasht. Der resultierende Hash wird als sog. "commit hash" bzw. "commit id" bezeichnet. Mit diesem Hash ist jeder Commit in einem repository eindeutig indentifizierbar.

Mehrere Commits bilden druch den Zeiger auf Ihre vorgänger einen gerichteten azyklischen Graphen (DAG).

Wichtig: Fügt man zu einem repository einen commit hinzu, existiert dieser commit zunächst lediglich im lokalen clone des repository. 

Fun Fact: Das ist im wesentlichen eine Blockchain ohne Proof-of-work.

### Clone / Checkout
Unter einem "Clone" versteht man bei Git eine lokale kopie eines entfernt gehosteten git repository (z.B. bei GitHub). Ein "Clone" ist im wesentlichen genau das: Es ist eine 1:1 Kopie des gesamten Repositories mit allen Versionen.

Innerhalb des "Clone" kann sich der Entwickler auf dem lokalen System frei bewegen. D.H. er kann jede Version "auschecken", verändern und neu "einchecken". Damit verändert er zunächst aber nur den eigenen "Clone".

Bei einem "checkout" wechselt der Benutzer auf dem lokalen System zwischen verschiedenen Versionen des lokalen Repository. Dadurch ändert sich i.d.R. auch die "working copy".


### History
Die Commits in einem git repository erzeugen die sog. "history", also die Vergangenheit. Da ein einzelner Commit immer nur die Veränderung zu seinem Vorgänger enthält, muss für eine vollständige Wiederherstellung einer Version immer die komplette History vom gewünschten Zeitpunkt bis zum Ursprung "initialer commit" durchgegangen werden.

Rewriting-History: Einige git Bfehle sind in der lage, die Vergangenheit eines git repositories zu ändern (z.B. `git rebase`). Diese Befehle erzeugen einen "history rewrite". Für unbedarfte nutzer sollten solche rewrites vermieden werden.

### Branch
Ein "Branch" bezeichnet das Konzept einer "Abzweigung" innerhalb des DAG. Dabei kann man sich die folge der git Commits wie einen Baum vorstellen.

Es können mehrere Branches parallel laufen, dadurch ermöglicht git eine hohe Parallelisierung der Entwickler innerhalb des repositories.

Jeder branch hat einen "ursprungs commit" ab dem der Branch vom bestehenden Hauptbranch abzweigt.

Unterschiedliche branches können den selben "usprungs commit" haben.

Auf einem branch werden dann commits hinzugefügt. Zu einem späteren Zeitpunkt kann der Branch dann wieder mit dem Hauptzweig zusammen geführt werden.

Ein branch hat einen Namen über den er identifziert werden kann. Besonderheit: Der Name zeigt automatisch immer auf den neusten Commit auf einem Branch.

### Remote
Ein "Remote" beschreibt in git ein entferntes git repository. Zu diesen remote repositories kann mit speziellen Befehlen (`push`, `fetch`, `pull`) Verbindung aufgenommen werden und es können entsprechend commits ausgetauscht werden.

Das Konzept von Remote- und Local-Repository sorgt häufig für Verwirrungen. Grundsätzlich findet in git **keine** automatische Synchronisierung zwischen lokalem und entfernten repository statt. Diese Synchronisation muss manuell mit hilfe der passenden begriffe (`push`, `pull`, `fetch`) durchgeführt werden!

## Wichtige Git Befehle
### Einleitung
* Git selber ist ein reines CLI-Tool ohne grafische Oberfläche
* Gesteuert wird es über spezielle Befehle
* Es empfiehlt sich vor der Verwendung eines grafischen Tools mit den Grundbefehlen auf dem Terminal auseinander zu setzen
* Unter Windows am besten mit der "git bash"

### init
* Mit `git init` wird ein neues git repository im aktuellem Verzeichnis angelegt
* Dabei ist egal, ob das Verzeichnis bereits Code enthält oder leer ist

### clone
* Mit `git clone $remoteUrl` kann ein entferntes Repository (z.B. GitHub) lokal geclont werden
* Git unterstützt dabei zwei Protokolle: HTTP(S) und SSH
* `git clone https://github.com/ghandmann/HS-AlbSig-WebAnwendungen2.git`
* `git clone git@github.com:ghandmann/HS-AlbSig-WebAnwendungen2.git`

### status
* Mit `git status` kann vor und nach Aktionen immer eine aktuelle Übersicht über das repository erzeugt werden.
* Git liefert hier meist auch schon nützliche weitere Kommandos für die nächsten Schritte
* Wenn man nicht genau weiß, in welchem Zustand das Repository ist, einfach `git status` eintippen

### add
* Mit `git add $fileName` können Dateien zum Repository hinzugefügt werden.
* Durch den `add` Befehl werden Änderung zunächst nur in die sog. `staging area` abgelegt. Das ist eine Art "wartezimmer" um alle Änderungen zusammen zu tragen um diese dann in einem commit tatsächlich fest ins repository zu integrieren.
* Hat man Dateien mit dem `add` Befehle hinzugefügt, kann man mit `git status` eine Auflistung erhalten, welche Dateien "staged" sind und welche "unstaged" sind.

### diff
* Mit `git diff` kann man sich die Unterschiede zwischen der aktuellen working copy und der ausgecheckten Version anschauen.
* Dabei kommt ein spezielles Diff-Format zum einsatz das zum teil nicht leicht zu interpretieren ist
* Mit `git diff -- $filename` kann man sich den diff einer bestimmten Datei anzeigen
* Mit `git diff $OldRevision $NewRevision` kann man sich den Unterschied zweier Versionen im Repository ansehen
* Mit `git diff --cached` kann man sich der Unterschied von Dateien die im "staging" mode sind ansehen.

### commit
* Mit `git commit` wird aus den Änderungen die im "staging" bereich sind ein commit erzeugt.
* Achtung: Der Befehl startet den standard-editor auf ihrem System damit sie für den commit eine Beschreibung eingeben können. Unter linux wird dies durch die `$EDITOR` Umgebungsvariable gesteuert. Der Mechnismus unter Windows ist mir leider nicht bekannt
* Mit der Option `-m` kann direkt eine sog. "commit message" angegeben werden: `git commit -m "Meine commit beschreibung"`, dann startet auch kein Editor

### log
* Mit `git log` kann man sich die commit history ansehen. Standardmäßig listet der Befehle die history vom aktuell ausgecheckten commit zurück bis zum Ursprungscommit
* Mit `git log $commithash` kann der startpunkt der history geändert werden, so kann die history ab einem bestimmten commit angesehen werden
* Hier kann man auch Branch-Namen verwenden, z.B. `git log main`, dadurch kann man auch bequem auf "andere" branches schauen

### restore
* Mit `git restore $filename` werden alle Änderungen an dieser Datei in der aktuellen working copy rückgängig gemacht. **WICHTIG** Diese Operation zerstört die Änderungen, diese können nicht wiederhergestellt werden. Denn die Änderungen an der working copy waren noch nicht "committed".
* Mit `git restore .` machen sie alle Änderungen in allen Unterverzeichnissen rückgängig. Es gilt die selbe Warnung wie oben!

### fetch
* Mit `git fetch` weisen sie git an, die mit dem repository verbundenen remote repositories auf Neuigkeiten zu überprüfen
* Der `fetch` Befehl verändert niemals ihr repository, sondern schaut lediglich nach, ob Neuigkeiten vorhanden sind
* Nach einem `git fetch` ist es oft hilfreich ein `git status` auszführen um Informationen zu bekommen, wie die Neuigkeiten evtl. intergriert werden können.

### push
* Mit `git push` veröffentlichen sie alle ihre gemachten commits aus dem lokalen repository im verbundenen remote repository.
* Erst nachdem sie `git push` gemacht haben, können andere Entwickler ihre commits sehen.
* Wenn mehrere Entwickler auf dem selben Branch arbeiten, kann es durchaus sein, dass ihr `push` Befehl vom Server "rejected" wird, weil auf dem Branch bereits neuere Änderungen vorhanden sind. Häufig können Sie das Problem damm mit `git pull --rebase` und anschließendem `git push` korrigieren.
* Empfehlung: Vermeiden Sie das mehrere Entwickler auf dem selben branch arbeiten!

### pull
* Mit `git pull` weisen sie git an, Änderungen die es auf dem remote repository gibt, in ihre lokale "working copy" zu übernehmen.
* Wenn sich auf ihrem lokalem branch commits befinden, die remote nicht existieren, erzeugt `git pull` automatisch einen sog. "merge commit". Dieser sollte anschließend geprüft werden, da hier oft unerwartet Änderungen passieren.
* Um diesen "merge commit" zu vermeiden, empfiehlt sich die Verwendung von `git pull --ff-only`. Dabei werden Änderungen vom remote nur übernommen, wenn es keine commits gibt, die im Konflikt stehen.

### checkout
* Mit `git checkout $commitHash` können sie einen beliebigen commit aus dem repository auschecken, d.H. ihre "working copy" wechselt zu dieser version
* Mit `git checkout $branchName` können sie auf einen anderen branch wechseln
* Manchmal schlägt `git checkout` fehl, wenn sie noch lokale Änderungen haben, die nicht committed sind. Generell sollten sie `git checkout` nur verwenden, wenn sie eine "clean working copy" haben.
* Mit `git checkout -b $newBranchName` können sie vom aktuellen commit aus einen neuen branch anlegen und diesen direkt auschecken. Dies ist hilfreich um z.B. einen schnellen bugfix branch zu erzeugen.

### merge
* Mit `git merge $branchName` bringen sie alle Änderungen von `$branchName` auf den aktuell ausgecheckten branch. Dabei entsteht ein sog. "merge commit".
* Beim mergen von branches kann es auch zu konflikten kommen. Dies wird in der Konsole angezeigt und der merge wird unterbrochen. Sie können dann mit `git status` nachsehen, welche Dateien einen Konflikt haben.
* Sobald sie die Konflikte aufgelöst haben, müssen die Konfliktdateien mit `git add $filename` als "resolved" markiert werden.
* Danach kann mit `git merge --continue` der merge fortgesetzt werden.
* Sollten Sie den merge aus irgendwelchen gründen abbrechen wollen, können sie mit `git merge --abort` den merge vorgang abbrechen. Achtung: Das geht nur, wenn der merge nicht konfliktfrei durchläuft!

## Gefährliche Befehle
### reset
* Mit `git reset --hard $commitHash` verändern sie manuell den zeiger des aktuell ausgecheckten branches. Dabei gehen möglicherweise commits für immer verloren!

### rebase
* Mit `git rebase $startPoint` verändern sie für den aktuell ausgecheckten branch, den Ursprungscommit. Dabei wird die history neu geschrieben. Sofern die history bereits mit `git push` veröffentlicht wurde, sind sie jetzt im zustand "diverged".

## Besondere Dateien
### .git/
Das Verzeichnis `.git/` wird vom git programm gemanaged. Darin enthalten sind alle Konfigurations-Einstellungen für das aktuelle repository sowie die komplette history aller commits.

Hier sollten keine Änderungen vorgenommen werden, da sonst das repository möglicherweise beschädigt wird und commits verloren gehen könnten.

### .git/config
Diese Datei enthält einige wichtige Konfigurations-Einstellungen für das git repository. Die datei sollte nicht direkt editiert werden. Sondern über das Kommando `git config` entsprechend verändert werden.

### .gitignore
In Projekten finden sich auch immer wieder Dateien, die nicht zum eigentlich Projekt gehören. Oder auch oft Dateien, die sowieso bei jedem Entwickler lokal neu erzeugt werden. Hierzu gehören zum Beispiel:
* Einstellungsdateien der verwendete IDE
* Binärdaten nach dem Kompilieren
* Im Projektordner abgelegte Tools
* Datenbankdateien
Um diese Dateien nicht ständig bei `git status` aus "untracked" aufgelistet zu bekommen, kann man solche Dateien in die Datei `.gitignore` eintragen. Das git programm filtert dann alle dort aufgelistet Dateien aus den gängigen Operationen heraus.

Wichtig: Die Datei `.gitignore` sollte ins Repository eingecheckt werden. Wird diese also geändert, muss diese auch mit `git add .gitignore` und `git commit` "committed" werden. Sonst sind die Änderungen nur lokal.

Auf GitHub gibt es eine umfangreiche Sammlung an default `.gitignore` files für verschiedene Projekte/Programmiersprachen:

* https://github.com/github/gitignore
* Node.JS: https://github.com/github/gitignore/blob/master/Node.gitignore

## Was ist GitHub (oder GitLab)
* Bei GitHub/GitLab handelt es sich im wesentlichen im git repository hoster.
* Diese Dienste bieten es an, ein git repository zu erzeugen und dieses dann lokal zu klonen
* Ĺokale änderungen können dann an diese Dienst gepusht werden
* Dadurch vereinfacht sich die zusammenarbeit im Team, da alle über den selben Server Daten austauschen
* Private und öffentliche Repositories (Empfehlung: Nutzen sie einfach öffentliche Repos für das Praktium)
* Neben dem reinen hosten von repositories bieten diese Dienste mittlerweile viele Zusatzfeatures:
   * Issue Tracking
   * Merge/Pull-Requests
   * Branching-Workflows
   * Continious Integration (CI) und Continious Deployment (CD) Pipelines
   * Web-IDEs

* Im weiteren gehen wir nur noch auf die Besonderheiten von GitHub ein
## Authentifizierung
* Sie müssen sich zunächst bei GitHub einen Account anlegen
* Anschließend können sie dort neue repositories anlegen, diese sind immer mit ihrem Account verbunden
* Um anderen Teammitgliedern ebenfalls den (schreibenden) Zugriff auf das Repository zu ermöglichen, müssen sie deren accounts in den "Repository Settings" unter "Manage Access" in ihr repository einladen
### HTTP(S)
* Wenn Sie zum klonen ihres GitHub-Repository die HTTPS-URL wählen, fragt sie der git client auf der Kommandozeile nach ihrem GitHub Benutzer und Passwort
* Dieses müssen sie bei jeder Interaktion mit dem remote-repository erneut eintippen
### SSH
* Mittels SSH ist es möglich, SSH-Public-Key-Authentication mit GitHub zu nutzen. Hier muss nur einmalig ein Passwort eingegeben werden, um ihren SSH-Private-Key zu entschlüsseln.
* Dazu benötigten sie aber ein SSH-Schlüsselpaar. Gerade unter Windows ist das nicht ganz einfach
* Eine Anleitung für Windows: https://danielhuesken.de/git-fur-windows-installieren-und-ssh-keys-nutzen/
* Unter Linux haben sie i.d.R. bereits ein Schlüsselpar, bzw. können bequem mit `ssh-keygen` eines erzeugen.
* Den öffentlichen schlüssel (public key) müssen Sie nun bei GitHub hinterlegen, dazu gibt es extra Dokumentation bei GitHub: https://docs.github.com/en/github/authenticating-to-github/connecting-to-github-with-ssh

## Feature Branch Development
* Um Konflikte zwischen Entwicklern zu vermeiden, sollten Entwickler niemals parallel auf dem selben Branch arbeiten.
* Unter git hat sich daher das Konzept von "feature branches" etabliert. Für jede zu erledigende Aufgabe wird ein neuer feature-branch angelegt.
* Auf diesem feature-branch arbeitet ein Entwickler an genau dieser Aufgabe
* Ist die Aufgabe abgeschlossen, wird ein sog. "Merge-Request"/"Pull-Request" gestellt. Dieser drückt den Wunsch aus, den feature-branch jetzt in den Hauptzweit zu integrieren.
* Ein Integrator (in kleinen Teams ist das der selbe Entwickler) akzeptiert jetzt den Merge-/Pull-Request und fügt die Änderungen so in den Hauptzweig ein.
* Für die nächste Aufgabe wird jetzt wieder in komplett neuer feature-branch angelegt und der Prozess entsprechend wiederholt.
* Anleitung von GitHub dazu: https://guides.github.com/introduction/flow/

## VSCode Integration
* VSCode bestitzt eine sehr gute integration von Git
* Alle wichtigen git Operationen können so direkt aus VSCode heraus gesteuert werden
* Nützliche Extensions:
   * GitLens (`eamodio.gitlens`)
   * GitHub Pull Requests and Issues (`github.vscode-pull-request-github`)

## Was bleibt
* Commit fast, commit early!
   * Es gibt niemals zuviele commits, immer nur zu wenige!
* Interaktiver JavaScript Git-Course: https://learngitbranching.js.org/?locale=de_DE
* Üben, Üben, Üben!
   * Ereugen sie lokale repositories, probieren sie sachen aus
   * Irgendwann kommt der erste merge-conflict, keine angst! Stellen Sie sich der Herausforderunge
   * git ist nicht für den Inhalt verantwortlich: Wenn Sie den code nicht verstehen, dann kann Ihnen git auch nicht helfen! Und am Ende müssen sie entscheiden: Ist der commit/merge gut oder nicht?
* Wenns gar nicht mehr weiter geht: Fragen Sie mich einfach, sofern ich Zeit habe, schaue ich auch gerne kurz remote mit drauf.
