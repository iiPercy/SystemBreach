// js/timer.js

let tempoRimanente = 300; 
const tempoTotale = 300;
let timerInterval;

function avviaTimer() {
    const wrapper = document.getElementById('timer-wrapper');
    const display = document.getElementById('timer-display');
    const barFill = document.getElementById('timer-progress-fill');
    
    if (!wrapper || !display || !barFill) return;

    timerInterval = setInterval(() => {
        tempoRimanente--;

        let minuti = Math.floor(tempoRimanente / 60);
        let secondi = tempoRimanente % 60;
        let testoMinuti = String(minuti).padStart(2, '0');
        let testoSecondi = String(secondi).padStart(2, '0');
        display.innerText = `${testoMinuti}:${testoSecondi}`;

        let percentuale = (tempoRimanente / tempoTotale) * 100;
        barFill.style.width = percentuale + '%';

        if (tempoRimanente <= 60 && !wrapper.classList.contains('timer-critical')) {
            wrapper.classList.add('timer-critical');
        }

        // GAME OVER
        if (tempoRimanente <= 0) {
            clearInterval(timerInterval);
            triggerGameOver();
        }

    }, 1000);
}

async function triggerGameOver() {
    console.log("[KERNEL] TIMEOUT! Chiusura forzata...");
    
    sistemaBloccato = true; 
    document.getElementById('os-body').classList.add('glitch-screen');

    try {
        await fetch('php/timeout.php');
    } catch (e) {
        console.error("Errore di rete durante il timeout.");
    }

    setTimeout(() => {
        alert("TEMPO SCADUTO. La traccia è stata persa. Disconnessione in corso...");
        window.location.href = 'index.php'; 
    }, 1500);
}