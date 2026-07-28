# PWEB PROGETTO 2026

##### 

##### **1.Definizione del Caso d'Uso e del Dominio**



###### **1. Fase di Accesso e Istruzioni**

Quando l'utente atterra sulla pagina principale (index.php), non viene subito lanciato nell'azione. Deve esserci un momento di preparazione.



Manuale Operativo: La prima cosa che l'utente vede è il "Manuale di Emergenza" (che soddisfa il vincolo delle 20-25 righe descrittive). Spiegherà la lore in modo semplice: "Sei un amministratore di sistema. Un attacco hacker ha innescato il protocollo di blocco totale. Hai 5 minuti per trovare i codici di override sparsi nel sistema, dedurre la password di root e inserirla nel Terminale prima che i server vengano formattati."



Identificazione: Sotto il manuale, un modulo formale per il Login o la Registrazione. Questo serve per autenticare l'utente e legare la partita al suo account nel database.



Innesco: Un pulsante che, una volta premuto, fa partire l'ambiente di gioco vero e proprio.



###### **2. Fase di Esplorazione (Core Gameplay)**

Premuto il pulsante di avvio, l'interfaccia cambia drasticamente, simulando il desktop di un sistema operativo in allarme.



Il Timer dell'Apocalisse: In alto a destra (o in bella vista centrale), un conto alla rovescia rosso e ben visibile parte da 5:00 minuti. Questo crea l'urgenza e detta il ritmo della partita.



L'Ambiente Desktop: L'utente si ritrova davanti a uno sfondo con 3 o 4 icone cliccabili (ad esempio: Mail, Appunti Segreti, Log di Sistema, e Terminale).



Le Finestre (Modali): Cliccando sulle icone, si aprono delle finestre fluttuanti (gestite in HTML/CSS/JS) che l'utente può leggere e chiudere. All'interno di queste finestre si trovano messaggi apparentemente normali, ma che contengono i dati dinamici (gli indizi) generati per quella specifica partita.



Nessun Aiuto Esterno: Il giocatore deve leggere i testi, prendere mentalmente o fisicamente nota dei valori chiave trovati nelle varie app, e capire come combinarli secondo una logica che dedurrà leggendo i testi stessi.



###### **3. Fase di Risoluzione (Endgame)**

L'interazione finale avviene esclusivamente tramite l'applicazione "Terminale".



Inserimento Codice: L'utente apre il Terminale (che avrà l'aspetto di una classica console a riga di comando), digita la stringa alfanumerica o numerica finale che ha calcolato e preme Invio.



Condizione di Vittoria (Win State): Se il codice inserito è corretto, il timer si ferma istantaneamente. Lo schermo cambia colore, appare un messaggio di "Sistema Ripristinato" e il tempo rimanente viene inviato al server per calcolare il punteggio.



Condizione di Sconfitta (Loss State): Se il timer arriva a 00:00, l'interfaccia si blocca impedendo ulteriori clic. Compare un messaggio di "Sistema Compromesso - Formattazione in corso".



La Classifica: In entrambi gli scenari di fine partita, compare un pulsante per visualizzare la Classifica Globale, permettendo all'utente di confrontare il suo tempo di reazione con le partite pregresse salvate nel database.



###### **Dominio della password da indovinare**

L'applicazione sceglierà randomicamente tra i 3 seguenti domini:



###### **1. Il Dominio Matematico-Amministrativo (Formula Nascosta)**

L'utente deve trovare una serie di valori numerici sparsi nel sistema (es. un ID Server nei log, un Fattore di Rischio in una mail, un Badge Dipendente negli appunti) e applicare una formula descritta in linguaggio naturale in un'altra finestra.



###### **2. Il Dominio Criptografico (Cifrario a Scorrimento / Shift)**

L'utente trova la password di root, ma è cifrata (es. una stringa incomprensibile come KROOD). Deve trovare l'indizio che gli indica l'"Offset" o la chiave di decrittazione (es. un avviso che dice "I server oggi usano uno shift di -3").



###### **3. Il Dominio Cronologico (Frammentazione dei Log)**

La password è una stringa alfanumerica divisa in 4 frammenti (es. Alfa, X7, 99, Beta). Ogni frammento è nascosto in una finestra diversa, accompagnato da un timestamp o da una data di sistema (es. "Ore 10:15 - Chiave 1: Alfa"). L'utente deve riordinare i frammenti cronologicamente per ottenere la password completa (AlfaX799Beta).



##### 

##### **2. Scelte Progettuali, Trade-off e Gestione No-Framework**



###### **1. Comunicazione Client-Server (Fetch API e JSON)**

L'interazione tra frontend e backend avverrà in modo completamente asincrono, evitando ricaricamenti della pagina per garantire un'esperienza utente fluida (Single Page Application).Tecnologia: Utilizzo della moderna API fetch nativa di JavaScript, supportata dalla sintassi async/await e con gestione degli errori tramite try/catch.  Scambio Dati: Il formato di interscambio dati sarà esclusivamente JSON. Il server PHP risponderà alle richieste codificando array associativi tramite json\_encode() e impostando l'header Content-type: application/json. Il client decodificherà la risposta tramite il metodo await response.json().  Sicurezza: Il client invierà richieste (es. verifica password) e riceverà solo i dati da mostrare a schermo, senza mai ricevere la logica risolutiva.



###### **2. Gestione dello Stato e Sicurezza (Approccio Trust-No-Client)**

La memorizzazione dei dati sensibili della partita seguirà una rigida separazione per prevenire manomissioni lato client e rispettare i vincoli sulle variabili globali.Stato Server (PHP Sessions): L'identificazione dell'utente e la memorizzazione della soluzione generata proceduralmente (la password di root) avverranno tramite la variabile superglobale $\_SESSION. Questo richiede l'uso di session\_start() all'inizio di ogni script PHP coinvolto. Solo il server deciderà le condizioni di vittoria confrontando l'input dell'utente con il dato in sessione.  Stato Client (Vanilla JS): Per mantenere in memoria lo stato dell'interfaccia (es. tempo rimanente del timer, finestre aperte) rispettando il vincolo del minor numero possibile di variabili globali, si utilizzeranno moduli JavaScript (ES6) o chiusure (Closures / IIFE).



###### **3. Manipolazione del DOM (DOM Level 3 Nativo)**

La generazione dell'interfaccia dinamica del finto sistema operativo non si affiderà a framework esterni o a semplici iniezioni di stringhe HTML vulnerabili.Tecnologia: Si utilizzeranno rigorosamente i metodi standard del DOM Level 3.  Metodi Chiave: Creazione dinamica di nodi tramite document.createElement(), inserimento di testi sicuri tramite document.createTextNode(), e assemblaggio della struttura tramite appendChild().  Gestione Eventi: Le interazioni dell'utente (click sulle app, invio form) saranno gestite unicamente tramite addEventListener(), evitando attributi intrusivi come onclick nell'HTML.

##### 

##### **3. Separazione delle Competenze (File, Classi e Oggetti)**



###### **Scelta Architetturale 1: Il Flusso delle Pagine (MPA vs SPA Ibrida)**

Approccio MPA - Multi-Page ibrida: Due pagine distinte. index.php gestisce solo il manuale e l'accesso. Una volta loggato, l'utente viene reindirizzato a os.php, che è il finto desktop hackerato. Dentro os.php, tutto avviene in modo asincrono senza ricaricare la pagina.

Separa nettamente due contesti ("Fuori dal gioco" e "Dentro il gioco"). Rende facilissimo proteggere il gioco: in cima a os.php basterà un controllo if(!isset($\_SESSION\['user'])) per bloccare gli intrusi, separando fisicamente i CSS e i JS necessari.



###### **Scelta Architetturale 2: Struttura API PHP**

Approccio Micro-script separati: Un file PHP per ogni singola azione (es. login.php, genera\_enigma.php, verifica.php). Aderisce perfettamente alla richiesta di "vari file php logicamente separati". Se il login si rompe, sai esattamente in quale file guardare (Separation of Concerns).



###### **Scelta Architetturale 3: Modularità JavaScript**

Approccio Pattern Closure / Namespace in JS separati: Includiamo più file <script> nell'HTML, ma ogni file racchiude il suo codice in funzioni specifiche (es. l'oggetto Timer, l'oggetto Terminal), esponendo solo lo stretto necessario. Sicuro, facile da correggere in fase d'esame e dimostra padronanza dei fondamentali del linguaggio.



###### **Struttura delle Directory**

📁 cognome\_matricola/ (Cartella radice del progetto)

* 📄 index.php (Entry point: Mostra il manuale utente (20 righe) e il form di Login/Registrazione)
* 📄 os.php (Core del gioco: L'interfaccia a tutto schermo del sistema operativo. È accessibile solo se autenticati)



* 📁 css/
* 📄 base.css (Regole generiche, font, reset, stili del login)
* 📄 desktop.css (Regole specifiche per la UI del gioco: icone, taskbar, layout del terminale e modali fluttuanti)



* 📁 js/
* 📄 auth.js (Gestisce le chiamate fetch asincrone per il form di login e registrazione su index.php)
* 📄 game\_core.js (Avviato su os.php: fa la fetch per scaricare l'enigma, inietta i dati nelle finestre via DOM Level 3)
* 📄 ui\_manager.js (Gestisce solo l'apertura/chiusura delle finestre, il trascinamento se previsto e il focus)
* 📄 terminal.js (Intercetta l'input utente, stampa i finti log, fa la fetch per la verifica della password)
* 📄 timer.js (Gestisce logicamente e visivamente il countdown dell'apocalisse)



* 📁 php/
* 📄 db\_config.php (Contiene solo le credenziali e la connessione a MySQL tramite PDO/mysqli)
* 📄 login\_handler.php (Riceve i dati da auth.js, verifica nel DB, avvia la $\_SESSION)
* 📄 genera\_enigma.php (Sceglie il dominio, genera i dati randomici, salva la soluzione in $\_SESSION e restituisce JSON)
* 📄 verifica\_terminale.php (Riceve la stringa dal client, la confronta con la $\_SESSION, calcola il punteggio, lo salva nel DB e risponde con Vittoria/Sconfitta)
* 📄 classifica.php (Estrae le migliori partite pregresse dal DB e restituisce JSON)
* 📁 img/ (Conterrà le icone per il desktop, sfondi o sprite rigorosamente in percorsi relativi)



###### **Cosa rimandare alla fase implementativa**

Dettagli del DB: La struttura esatta delle tabelle MySQL (basterà una tabella Utenti e una Partite). Definiremo le query SQL quando scriveremo db\_config.php.

L'Algoritmo dei Puzzle: La logica esatta con cui PHP genererà i puzzle (i rand(), le divisioni in stringhe) la svilupperemo concentrandoci sul file genera\_enigma.php.

Animazioni UI: Se implementare o meno un finto caricamento del boot del sistema; lo decideremo affinando os.php e desktop.css.



##### **4. Strutturazione della Roadmap di Implementazione**



###### **🚩 Milestone 1: Le Fondamenta (Database e Autenticazione)**

L'obiettivo qui è creare l'ambiente di base, permettere agli utenti di registrarsi e proteggere il gioco dagli accessi non autorizzati.

1. Progettazione Database: Creazione del database cognome\_numerodimatricola con due tabelle essenziali: Utenti (id, username, password\_hash) e Partite (id, id\_utente, tempo\_impiegato, data\_partita, esito).
2. Setup Connessione: Scrittura di php/db\_config.php usando PDO (consigliato per sicurezza e pulizia del codice).
3. L'Ingresso (index.php): Creazione dell'HTML statico con il "Manuale Utente" (le famose 20 righe) e il form di Login/Registrazione.
4. Logica di Accesso: Implementazione di js/auth.js (per inviare i dati del form via fetch) e php/login\_handler.php (per validare le credenziali, avviare la $\_SESSION e confermare l'accesso).
5. Test di Fase: Se un utente si logga con successo, viene reindirizzato a os.php? Se prova ad aprire os.php senza login, viene respinto?



###### **🚩 Milestone 2: Il Guscio (Interfaccia UI del Sistema Operativo)**

L'obiettivo è costruire l'aspetto visivo del desktop e il sistema di finestre usando solo CSS puro e DOM Level 3, senza ancora preoccuparci dei dati reali.

1. Desktop e Layout: Strutturare l'HTML di base in os.php (sfondo, barra delle applicazioni, icone cliccabili).
2. Stilizzazione: Scrittura di css/desktop.css per rendere le icone credibili e preparare lo stile delle "finestre modali" e della console del Terminale.
3. Motore Finestre (JS UI): Creazione di js/ui\_manager.js. Qui scriveremo le funzioni per creare dinamicamente (usando document.createElement) i contenitori delle app (es. Mail, Log) al click sulle icone, permettendo all'utente di chiuderle.
4. Test di Fase: Il finto sistema operativo è navigabile? Posso aprire e chiudere le finestre in modo fluido senza ricaricare la pagina?



###### **🚩 Milestone 3: Il Cervello (Motore Procedurale PHP)**

Lasciamo temporaneamente il frontend per concentrarci sulla logica "invisibile", il vero cuore anti-ridondanza del progetto.

1. Generatore di Enigmi: Scrittura di php/genera\_enigma.php. Implementeremo uno script che sceglie casualmente un dominio (es. Matematico, Cronologico), genera i valori, calcola la root\_password (salvandola in $\_SESSION\['root\_password']) e formatta i finti indizi testuali in un pacchetto JSON.
2. Validatore Finale: Scrittura di php/verifica\_terminale.php. Questo script accetterà una stringa in input, la confronterà con la sessione, calcolerà se il timer è stato rispettato, salverà l'esito nel database e risponderà con Vittoria o Sconfitta.
3. Test di Fase: Chiamando manualmente gli script PHP (es. dal browser o stampando a schermo temporaneamente i risultati), il JSON generato è corretto? La sessione si popola con la password giusta?



**🚩 Milestone 4: Il Sistema Nervoso (Integrazione e Gameplay)**

Ora uniamo il frontend al backend. Il gioco prende vita.

1. Avvio Partita (game\_core.js): Al caricamento di os.php, il JS fa una fetch a genera\_enigma.php, riceve il JSON e inietta i testi procedurali all'interno delle finestre gestite da ui\_manager.js.
2. Il Timer (timer.js): Implementazione del countdown di 5 minuti. Se arriva a zero, blocca le interazioni (tramite una modale a tutto schermo) e invia un segnale di "Sconfitta" al server.
3. Il Terminale (terminal.js): Intercettare i tasti premuti dall'utente sulla finta console. Alla pressione di "Invio", il client fa una fetch a verifica\_terminale.php e, in base alla risposta, ferma il timer (Vittoria) o mostra errore.
4. Test di Fase: Il gioco è interamente giocabile? Posso vincere? Posso perdere? La rigiocabilità genera indizi sempre diversi?



###### **🚩 Milestone 5: Rifiniture Accademiche (Endgame e Qualità)**

La fase finale dedicata a spuntare tutti i requisiti di valutazione del professore.

1. Classifica Globale: Scrittura di php/classifica.php per estrarre le migliori partite dal DB e visualizzarle alla fine della partita.
2. Validazione W3C: Passaggio del codice HTML/CSS nei validatori ufficiali. Correzione degli errori o inserimento dei commenti giustificativi (come da specifiche).  
3. Code Review \& Portabilità: Verifica che non ci siano percorsi assoluti, che i nomi delle variabili siano sostantivi e le funzioni verbi.  
4. Export DB: Utilizzo rigoroso dello script EsportaDB.bat o EsportaDB.sh fornito dal corso per generare il file .sql finale.  
5. Test sui Browser Ufficiali: Esecuzione del test funzionale su Firefox e Chrome usando l'ambiente software del corso.  





