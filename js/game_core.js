// js/game_core.js

// 1. MEMORIA RAM DEL SISTEMA
window.GameOS = {
    fileSystem: null,
    matchId: null,
    isBooted: false
};

// 2. SEQUENZA DI AVVIO DEL SISTEMA OPERATIVO
async function bootSystem() {
    console.log("[KERNEL] Inizio sequenza di boot...");

    try {
        const response = await fetch('backend/genera_enigma.php');
        
        if (!response.ok) {
            throw new Error(`Errore HTTP: ${response.status}`);
        }

        const data = await response.json();

        // 3. CONTROLLO AUTENTICAZIONE
        if (!data.success) {
            console.error("[KERNEL] Accesso negato:", data.error);
            alert("ERRORE DI SISTEMA: Autenticazione richiesta.");
            window.location.href = 'index.php'; 
            return;
        }

        // 4. SALVATAGGIO DEI DATI IN RAM
        window.GameOS.fileSystem = data.file_system;
        window.GameOS.matchId = data.match_id;
        window.GameOS.isBooted = true;

        console.log("[KERNEL] Boot completato. File system caricato in memoria.");
        
        if (typeof avviaTimer === 'function') {
            avviaTimer();
        }
        
    } catch (error) {
        console.error("[KERNEL] PANIC: Impossibile comunicare col server.", error);
        alert("CRITICAL ERROR: Connessione al server persa.");
    }
}

// 5. INNESCO AUTOMATICO
document.addEventListener('DOMContentLoaded', () => {
    bootSystem();
});