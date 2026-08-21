// js/terminal.js

function apriTerminale() {
    // 1. Evita doppioni
    if (finestreAperte.includes('terminal')) return;

    // 2. Crea la finestra
    const finestra = creaFinestraBase('terminal', 'ROOT_TERM');
    if (!finestra) return; 
    finestra.classList.add('terminal-theme');
    document.querySelector('.os-icon[data-app="terminal"]').classList.add('app-attiva');
    const contenuto = finestra.querySelector('.window-content');
    
    // 3. HTML specifico per il terminale
    contenuto.innerHTML = `
        <div class="terminal-body">
            <div id="term-output">
                <div>[SYS] Inizializzazione protocollo di emergenza...</div>
                <div>[SYS] Accesso ROOT richiesto per terminare il blocco.</div>
                <div>[SYS] Inserire codice di override:</div>
            </div>
            <div class="term-input-line">
                <span class="prompt">root@system:~# </span>
                <input type="text" id="term-input" autocomplete="off" spellcheck="false" autofocus>
            </div>
        </div>
    `;

    // 4. Selezionao gli elementi appena creati
    const inputField = contenuto.querySelector('#term-input');
    const outputDiv = contenuto.querySelector('#term-output');

    // 5. Mantene il focus sull'input (se clicchi nella finestra, torni a scrivere)
    contenuto.addEventListener('click', () => inputField.focus());

    // 6. Ascolta il tasto INVIO
    inputField.addEventListener('keypress', (e) => {
        if (e.key === 'Enter') {
            const comando = inputField.value.trim();
            if (comando === '') return; 

            outputDiv.innerHTML += `<div><span class="prompt">root@system:~# </span>${comando}</div>`;
            inputField.value = ''; 

            // Analizza il comando 
            if (comando.toLowerCase() === 'clear') {
                outputDiv.innerHTML = '';
            } else if (comando.toLowerCase() === 'help') {
                outputDiv.innerHTML += `<div>Comandi disponibili: clear, help. Qualsiasi altra stringa sarà processata come password di sistema.</div>`;
            } else {
                // ESECUZIONE TENTATIVO
                verificaPassword(comando, inputField, outputDiv);
            }
            
            contenuto.scrollTop = contenuto.scrollHeight;
        }
    });
}

// 7. CHIAMATA AL BACKEND
async function verificaPassword(tentativo, inputField, outputDiv) {
    inputField.disabled = true;
    outputDiv.innerHTML += `<div class="blinking-text">VERIFICA IN CORSO...</div>`;

    try {
        const response = await fetch('php/verifica_terminale.php', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ password: tentativo })
        });

        const data = await response.json();

        outputDiv.lastElementChild.remove();

        if (data.esito === 'VITTORIA') {
            outputDiv.innerHTML += `<div style="color: #00ff41; font-weight: bold;">[!] ACCESSO CONSENTITO. Override di sistema accettato.</div>`;
            setTimeout(() => {
                window.location.href = 'esito.php?id=' + window.GameOS.matchId;
            }, 2000);
        } else {
            outputDiv.innerHTML += `<div style="color: #ff3333; font-weight: bold;">[X] ACCESSO NEGATO. Password errata.</div>`;
            inputField.disabled = false;
            inputField.focus();
        }
    } catch (error) {
        outputDiv.innerHTML += `<div style="color: #ff3333;">[!] Errore di connessione al server di autenticazione.</div>`;
        inputField.disabled = false;
        inputField.focus();
    }
}