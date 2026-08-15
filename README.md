# 💻 SystemBreach (Progetto PWeb)

Una web application interattiva in stile "escape room" / hacking simulator, in cui l'utente veste i panni di un amministratore di sistema. L'obiettivo è sventare un attacco hacker e un conseguente blocco totale del sistema entro 5 minuti, deducendo la password di root da indizi sparsi e generati proceduralmente.

## 🚀 Caratteristiche Principali
* **Core Gameplay Adrenalinico**: Un timer di 5 minuti detta il ritmo della partita. Se arriva a zero, il sistema viene formattato.
* **Interfaccia OS Simulata**: Un finto ambiente desktop esplorabile con finestre modali fluttuanti (Mail, Log, Appunti, Terminale).
* **Enigmi Procedurali**: La password di root e gli indizi cambiano a ogni partita, pescando casualmente da 3 domini logici:
  * *Matematico-Amministrativo*: Formule da calcolare basate su dati sparsi nei file.
  * *Criptografico*: Testi cifrati con cifrario a scorrimento (Shift/Caesar).
  * *Cronologico*: Frammenti di password da riordinare in base ai timestamp dei log.
* **Terminale Interattivo**: L'inserimento della password finale avviene tramite una console a riga di comando simulata.
* **Classifica Globale (Leaderboard)**: I tempi di risoluzione dei giocatori vincenti vengono salvati per la competizione.

## 🛠️ Stack Tecnologico & Architettura
Il progetto è stato sviluppato seguendo un vincolo accademico rigoroso: **Nessun framework o libreria esterna**.
* **Frontend**: HTML5, CSS3, Vanilla JavaScript (ES6+ Modules/Closures).
  * **DOM Level 3**: Manipolazione dell'interfaccia nativa (`createElement`, `appendChild`, `addEventListener`) senza iniezioni HTML vulnerabili.
  * **Fetch API & JSON**: Comunicazione asincrona fluida per evitare ricaricamenti della pagina (approccio ibrido MPA/SPA).
* **Backend**: script PHP puri.
  * **Separation of Concerns**: Architettura a micro-script per ogni singola azione (`login.php`, `genera_enigma.php`, `verifica_terminale.php`).
* **Database**: MySQL interfacciato tramite **PDO** per la massima sicurezza.
* **Sicurezza (Trust-No-Client)**: Il client riceve solo l'output testuale. La logica risolutiva, la password corretta e le condizioni di vittoria risiedono esclusivamente nel server (`$_SESSION`), prevenendo qualsiasi manomissione.

## 📂 Struttura del Progetto
* `index.php` - Entry point: Manuale operativo e form di Login/Registrazione.
* `os.php` - Core del gioco: Ambiente desktop accessibile solo se autenticati.
* `/css/` - Fogli di stile modulari (`base.css`, `desktop.css`).
* `/js/` - Logica lato client separata (`auth.js`, `game_core.js`, `ui_manager.js`, `terminal.js`, `timer.js`).
* `/php/` - API backend e logica procedurale del gioco.

## ⚙️ Setup e Installazione
1. Clona il repository nella cartella pubblica del tuo server web locale (es. `htdocs` in XAMPP o `www` in MAMP).
2. Crea un database MySQL e importa il file `.sql` fornito per generare le tabelle (`Utenti`, `Partite`).
3. Aggiorna le credenziali di connessione all'interno di `php/db_config.php`.
4. Apri `index.php` nel browser.
