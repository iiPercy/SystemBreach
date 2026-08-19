// js/drag_drop.js

let zIndexGlobale = 100; 

function abilitaTrascinamento(finestra, header) {
    let posInizialeX = 0, posInizialeY = 0, posFinaleX = 0, posFinaleY = 0;

    // 1. GESTIONE Z-INDEX
    finestra.addEventListener('mousedown', () => {
        zIndexGlobale++;
        finestra.style.zIndex = zIndexGlobale;
    });

    // 2. INIZIO TRASCINAMENTO
    header.addEventListener('mousedown', dragStart);

    function dragStart(evento) {
        evento.preventDefault();
        posFinaleX = evento.clientX;
        posFinaleY = evento.clientY;
        
        document.addEventListener('mousemove', dragElement);
        document.addEventListener('mouseup', closeDragElement);
    }

    function dragElement(evento) {
        evento.preventDefault();
        
        posInizialeX = posFinaleX - evento.clientX;
        posInizialeY = posFinaleY - evento.clientY;
        
        posFinaleX = evento.clientX;
        posFinaleY = evento.clientY;
        
        let nuovaY = finestra.offsetTop - posInizialeY;
        let nuovaX = finestra.offsetLeft - posInizialeX;

        if (nuovaY < 0) nuovaY = 0;

        finestra.style.top = nuovaY + "px";
        finestra.style.left = nuovaX + "px";
    }

    function closeDragElement() {
        document.removeEventListener('mousemove', dragElement);
        document.removeEventListener('mouseup', closeDragElement);
    }
}