// js/ui_manager.js

// 1. STATO DEL SISTEMA 
let finestreAperte = [];
const MAX_FINESTRE = 2;
let sistemaBloccato = false;

// 2. FUNZIONE CORE
function creaFinestraBase(appId, titoloApp) {
    
    //Controllo Surriscaldamento
    if (finestreAperte.length >= MAX_FINESTRE) {
        triggerSurriscaldamento();
        return null;
    }

    //CREAZIONE DEI NODI DOM
    const finestra = document.createElement('div');
    finestra.classList.add('sys-window');
    finestra.id = `window-${appId}`;

    const header = document.createElement('div');
    header.classList.add('window-header');

    const titolo = document.createElement('div');
    titolo.classList.add('window-title');
    titolo.innerText = titoloApp;

    const controlli = document.createElement('div');
    controlli.classList.add('window-controls');

    //BOTTONI DI CONTROLLO
    const btnMinimizza = document.createElement('button');
    btnMinimizza.innerText = '_';
    btnMinimizza.classList.add('btn-ctrl');
    
    const btnChiudi = document.createElement('button');
    btnChiudi.innerText = 'X';
    btnChiudi.classList.add('btn-ctrl', 'btn-close');

    //AREA CONTENUTO
    const contenuto = document.createElement('div');
    contenuto.classList.add('window-content');
    contenuto.innerHTML = '<span class="blinking-text">DECRYPTING FILE SYSTEM...</span>';

    //ASSEMBLAGGIO
    controlli.appendChild(btnMinimizza);
    controlli.appendChild(btnChiudi);
    header.appendChild(titolo);
    header.appendChild(controlli);
    finestra.appendChild(header);
    finestra.appendChild(contenuto);
    abilitaTrascinamento(finestra, header);

    //GESTIONE EVENTI DEI BOTTONI
    btnChiudi.addEventListener('click', () => {
        chiudiFinestra(finestra, appId);
    });

    btnMinimizza.addEventListener('click', () => {
        finestra.classList.toggle('minimized');
        if (finestra.classList.contains('minimized')) {
            btnMinimizza.innerText = '□'; // Simbolo per "Espandi"
        } else {
            btnMinimizza.innerText = '_'; // Simbolo per "Riduci"
        }
    });

    //INSERIMENTO NEL DESKTOP
    document.getElementById('windows-container').appendChild(finestra);
    finestreAperte.push(appId);

    //RITARDO E POPOLAZIONE DATI
    setTimeout(() => {
        if (appId === 'terminal') return;

        contenuto.innerHTML = '';

        if (!window.GameOS || !window.GameOS.isBooted || !window.GameOS.fileSystem) {
            contenuto.innerHTML = '<p style="color:red;">ERRORE FATALE: File system non montato.</p>';
            return;
        }

        const datiApp = window.GameOS.fileSystem[appId];

        if (!datiApp || datiApp.length === 0) {
            contenuto.innerHTML = '<p>Directory vuota.</p>';
            return;
        }

        const lista = document.createElement('div');
        lista.classList.add('app-list');

        datiApp.forEach(item => {
            const blocco = document.createElement('div');
            blocco.classList.add('app-item');

            const titolo = document.createElement('div');
            titolo.classList.add('app-item-title');
            titolo.innerText = '> ' + item.titolo;

            const corpo = document.createElement('div');
            corpo.classList.add('app-item-body');
            corpo.innerHTML = item.testo.replace(/\n/g, '<br>'); 
            
            corpo.style.display = 'none'; 

            titolo.addEventListener('click', () => {
                const isNascosto = corpo.style.display === 'none';
                corpo.style.display = isNascosto ? 'block' : 'none';
                titolo.classList.toggle('title-active');
            });

            blocco.appendChild(titolo);
            blocco.appendChild(corpo);
            lista.appendChild(blocco);
        });

        contenuto.appendChild(lista);

    }, 1000);
    return finestra;
}

// 3. FUNZIONE DI CHIUSURA
function chiudiFinestra(nodoFinestra, appId) {
    nodoFinestra.remove(); 
    finestreAperte = finestreAperte.filter(id => id !== appId);
    const icona = document.querySelector(`.os-icon[data-app="${appId}"]`);
    if(icona) icona.classList.remove('app-attiva');
}

// 4. FUNZIONE PER IL SURRISCALDAMENTO
function triggerSurriscaldamento() {
    console.log("CRITICO: Surriscaldamento memoria!");
    sistemaBloccato = true; 
    
    document.getElementById('os-body').classList.add('glitch-screen');
    document.getElementById('windows-container').innerHTML = '';
    finestreAperte = [];

    document.querySelectorAll('.os-icon').forEach(icona => {
        icona.classList.remove('app-attiva');
    });

    setTimeout(() => {
        document.getElementById('os-body').classList.remove('glitch-screen');
        sistemaBloccato = false; 
    }, 1500);
}

// 5. AGGANCIO DEI CLICK
function inizializzaDesktop() {

    const icone = document.querySelectorAll('.os-icon');
    
    icone.forEach(icona => {
        icona.addEventListener('click', (evento) => {
            if (sistemaBloccato) return;
            
            const bottone = evento.currentTarget;
            const appId = bottone.dataset.app;

            if(appId === 'terminal') {
                apriTerminale();
                return;
            }

            if (finestreAperte.includes(appId)) {
                console.log(`L'app ${appId} è già in esecuzione.`);
                return;
            }

            const titoloApp = bottone.querySelector('.icon-label').innerText;
            const finestraCreata = creaFinestraBase(appId, titoloApp);
            
            if (finestraCreata) {
                bottone.classList.add('app-attiva');
            }
        });
    });
}

// 6. AVVIO DEL SISTEMA
document.addEventListener('DOMContentLoaded', () => {
    inizializzaDesktop();
});