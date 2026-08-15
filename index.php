<?php
session_start();

// Se l'utente è già loggato viene reindirizzato ad os.php
if (isset($_SESSION['user_id'])) {
    header("Location: os.php");
    exit; 
}
?>
<!DOCTYPE html>
<html lang="it">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Terminale di Sicurezza - Inizializzazione</title>
    <link rel="stylesheet" href="css/base.css">
</head>
<body>

    <main id="auth-container">
        
        <!-- SEZIONE 1: MANUALE UTENTE -->
        <section id="manuale-emergenza">
            <h1>Manuale Operativo di Emergenza</h1>
            <article>
                <p>Benvenuto nel sistema di recupero d'emergenza. Questo terminale è l'ultima linea di difesa contro la formattazione totale dei server, innescata da un attacco ostile. Il tuo obiettivo è sventare l'attacco trovando e inserendo la password di root prima che il tempo scada.</p>
                <p><strong>Fase 1 - Autenticazione:</strong> Per iniziare, utilizza il modulo sottostante. Se è il tuo primo accesso, seleziona "Registrati" creando un nome utente e una password. Se sei già registrato, effettua semplicemente il Login. L'autenticazione è necessaria per tenere traccia dei tuoi tempi di reazione.</p>
                <p><strong>Fase 2 - Esplorazione:</strong> Una volta avviato il sistema, ti troverai di fronte a un desktop virtuale. In alto vedrai scorrere il timer (5 minuti esatti). Cliccando sulle icone a schermo (come Mail, Log o Appunti), aprirai delle finestre contenenti frammenti di testo o numeri.</p>
                <p><strong>Fase 3 - Deduzione:</strong> Nessun aiuto esterno è permesso. Devi leggere attentamente i documenti trovati nelle finestre. Il sistema genera un enigma diverso a ogni partita. Usa i valori trovati per dedurre la password finale.</p>
                <p><strong>Fase 4 - Risoluzione:</strong> Apri l'applicazione "Terminale". Digita la password che hai ricavato e premi il tasto "Invio" sulla tua tastiera. Se il codice è corretto, il timer si fermerà, il sistema sarà salvo e il tuo tempo verrà registrato in classifica. Se sbagli, puoi riprovare finché il timer non arriva a zero. Se il tempo scade, la partita è persa.</p>
                <p>Buona fortuna, amministratore. Il sistema conta su di te.</p>
            </article>
        </section>

        <!-- SEZIONE 2: FORM DI AUTENTICAZIONE -->
        <section id="form-section">
            <h2>Autenticazione Sistema</h2>
            
            <form id="authForm">
                <div class="form-group">
                    <label for="username">Nome Utente:</label>
                    <input type="text" id="username" name="username" required minlength="3">
                </div>
                
                <div class="form-group">
                    <label for="password">Password (Credenziali):</label>
                    <input type="password" id="password" name="password" required minlength="4">
                </div>
                
                <input type="hidden" id="azione" name="azione" value="login">

                <div class="form-actions">
                    <button type="submit" id="submitBtn">Esegui Login</button>
                    <button type="button" id="toggleModeBtn">Passa a Registrazione</button>
                </div>
                
                <p id="authMessage" class="error-msg"></p>
            </form>
        </section>

    </main>

    <script src="js/auth.js"></script>

</body>
</html>