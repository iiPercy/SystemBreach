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

    //IL RITARDO
    setTimeout(() => {
        // Qui poi inseriremo la funzione che inietta i dati JSON veri
        contenuto.innerHTML = `<p>Contenuto decriptato di ${titoloApp} pronto.</p>`;
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
                console.log("Apertura terminale (da implementare separatamente)");
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