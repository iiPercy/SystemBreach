
document.addEventListener('DOMContentLoaded', () => {

    // 1. SELEZIONE DEGLI ELEMENTI
    const moduloAutenticazione = document.getElementById('authForm');
    const pulsanteCambioModalita = document.getElementById('toggleModeBtn');
    const pulsanteInvio = document.getElementById('submitBtn');
    const campoAzione = document.getElementById('azione');
    const messaggioRisposta = document.getElementById('authMessage');

    // 2. FUNZIONI LOGICHE

    // Cambia dinamicamente l'interfaccia tra Login e Registrazione
    function cambiaModalita() {
        if (campoAzione.value === 'login') {
            campoAzione.value = 'registrazione';
            pulsanteInvio.textContent = 'Esegui Registrazione';
            pulsanteCambioModalita.textContent = 'Passa a Login';
        } else {
            campoAzione.value = 'login';
            pulsanteInvio.textContent = 'Esegui Login';
            pulsanteCambioModalita.textContent = 'Passa a Registrazione';
        }
        messaggioRisposta.textContent = ''; 
    }

    // Gestisce l'invio asincrono del modulo tramite Fetch API
    async function gestisciInvioModulo(evento) {
        evento.preventDefault(); 

        const datiModulo = new FormData(moduloAutenticazione);
        const datiOggetto = Object.fromEntries(datiModulo.entries());

        try {
            const risposta = await fetch('backend/login_handler.php', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json' 
                },
                body: JSON.stringify(datiOggetto)
            });

            const risultato = await risposta.json();

            if (risultato.successo === true) {
                window.location.href = 'os.php';
            } else {
                messaggioRisposta.textContent = risultato.messaggio;
            }

        } catch (errore) {
            messaggioRisposta.textContent = "Errore critico di connessione al server.";
            console.error("Dettaglio errore:", errore);
        }
    }

    // 3. AGGANCIO DEGLI EVENTI 
    pulsanteCambioModalita.addEventListener('click', cambiaModalita);
    moduloAutenticazione.addEventListener('submit', gestisciInvioModulo);

});