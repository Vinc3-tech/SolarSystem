//file - info pianeti
import infoPianeti from './infoPianeti.js'

gsap.registerPlugin(ScrollTrigger);

//pianeti
const pianeti = document.querySelectorAll(".planet");
let selected_planet;
let next_planet;

// * -- creazione del menu con l'utilizzo dei dizionari --
Object.keys(infoPianeti).forEach(chiave => {
    let contVoce = document.createElement("div");
    contVoce.classList.add("contVoce");

    let imgPianeta = document.createElement("img");
    imgPianeta.src = infoPianeti[chiave].src;
    imgPianeta.alt = infoPianeti[chiave].nome;
    imgPianeta.classList.add("miniPlanet");

    let voce = document.createElement("span");
    voce.classList.add("voce","pixel-font");
    voce.textContent = infoPianeti[chiave].nome;

    contVoce.appendChild(imgPianeta);
    contVoce.appendChild(voce);
    document.getElementById("navMenu").appendChild(contVoce);
});

//dichiarazione dei div per la descrizione dei pianeti
const card = {
    nome: {},
    diametro: {},
    orbita: {},
    distanza: {},
    composizione: {},
    descrizione: {},
    curiosita: {},
};

// * -- STILE DEI PIANETI AL CARICAMENTO DELLA PAGINA --
document.addEventListener("DOMContentLoaded", () => {

    //aggiunta delle classi all'inizio
    pianeti[pianeti.length - 1].classList.add("selected");
    pianeti[pianeti.length - 2].classList.add("nextPlanet");

    //div card per contenere tutte le informazioni
    const contLabelPianeta = document.createElement("div");
    contLabelPianeta.classList.add("labelPianeta");

    Object.keys(card).forEach(chiave => {
        card[chiave].container = document.createElement("div");
        card[chiave].label = document.createElement("span");
        card[chiave].value = document.createElement("span");

        // stile del Label
        card[chiave].label.classList.add("labelCaratteristiche", "pixel-font");

        // stile del Valore
        card[chiave].value.classList.add("textLabel", "primary-font");

        // container 
        card[chiave].container.appendChild(card[chiave].label);
        card[chiave].container.appendChild(card[chiave].value);
        card[chiave].container.style.margin = "5px 0";

        contLabelPianeta.appendChild(card[chiave].container);
    });
    
    // Classe specifica per il nome del pianeta
    card.nome.value.classList.add("labelNomePianeta");

    //scritte dei label
    card.nome.label.textContent = "Pianeta selezionato: ";
    card.diametro.label.textContent = `Diametro: `;
    card.distanza.label.textContent = `Distanza dal sole: `;
    card.orbita.label.textContent = `Tempo di orbita attorno al Sole: `;
    card.composizione.label.textContent = `Composizione: `;
    card.descrizione.label.textContent = `Descrizione: `;
    card.curiosita.label.textContent = `Curiosità: `;

    //bottone per collegarsi alle altre pagine
    card.link = document.createElement("button");
    card.link.textContent = "Scopri di più";
    card.link.classList.add("btnDiscoverMore","primary-font");
    contLabelPianeta.appendChild(card.link);

    const contSolarSystem = document.getElementById("contSolarSystem");
    if (contSolarSystem) {
        contSolarSystem.appendChild(contLabelPianeta);
    }

    CheckSelection();
});

// * -- Funzione per aggiornare la selezione dei pianeti --
function CheckSelection() {
    selected_planet = document.querySelector(".selected");
    next_planet = document.querySelector(".nextPlanet");

    updatePlanetPosition();
    updatePlanetDescription();
}

// * -- funzione per aggiornare la posizione dei pianeti --
function updatePlanetPosition() {
    let index = pianeti.length; 
    pianeti.forEach((pianeta, indice) => {
        const indiceSelezionato = Array.from(pianeti).indexOf(selected_planet);
        const differenza = indice - indiceSelezionato;
        
        let zoomValue = 1.8 - differenza;
        let translateValue = 30 - (differenza * 100);
        
        pianeta.style.transform = `translate(-50%, ${translateValue}%) scale(${zoomValue})`;
        pianeta.style.opacity = differenza === 0 ? 1 : (differenza === 1 ? 0.5 : 0);
        pianeta.style.zIndex = index;
        index--;
    });
}

// * -- funzione per aggiornare la descrizione del pianeta selezionato --
function updatePlanetDescription() {
    Object.keys(infoPianeti).forEach(pianeta => {
        let namePlanet = selected_planet.querySelector('img').alt.toLocaleLowerCase();

        if (pianeta === namePlanet) {
            // Nome del pianeta
            if (infoPianeti[pianeta].nome) {
                card.nome.value.textContent = infoPianeti[pianeta].nome;
            }
            else{
                card.nome.value.textContent = '';
            }
            // Diametro
            if (infoPianeti[pianeta].diametroKm) {
                card.diametro.value.textContent = infoPianeti[pianeta].diametroKm + ' Km';
            }
            else{
                card.diametro.value.textContent = '';
            }
            // Distanza dal sole
            if (infoPianeti[pianeta].distanzaDalSoleKm) {
                card.distanza.value.textContent = infoPianeti[pianeta].distanzaDalSoleKm + ' Km';
            }
            else{
                card.distanza.value.textContent = '';
            }
            // Tempo di orbita
            if (infoPianeti[pianeta].periodoOrbitaleGiorni) {
                card.orbita.value.textContent = `${infoPianeti[pianeta].periodoOrbitaleGiorni} giorni`;
            }
            else{
                card.orbita.value.textContent = '';
            }
            // Composizione
            if (infoPianeti[pianeta].composizione) {
                card.composizione.value.textContent = infoPianeti[pianeta].composizione;
            }
            else{
                card.composizione.value.textContent = '';
            }
            // Descrizione
            if (infoPianeti[pianeta].descrizione && window.innerWidth > 768) {
                card.descrizione.value.textContent = infoPianeti[pianeta].descrizione;
            }
            else{
                card.descrizione.value.textContent = '';
            }
            // Curiosità
            if (infoPianeti[pianeta].curiosita && window.innerWidth > 768) {
                card.curiosita.value.textContent = infoPianeti[pianeta].curiosita;
            }
            else{
                card.curiosita.value.textContent = '';
            }
            card.link.onclick = () => {
                window.location.href = infoPianeti[pianeta].linkPageHTML;
            }
        }
    });
}


// cambio del pianeta selezionato al click del div nel menu
document.querySelectorAll(".contVoce").forEach(contVoce => {
    contVoce.addEventListener("click", function() {

        document.querySelector(".selected").classList.remove("selected");

        const nextPlanet = document.querySelector(".nextPlanet");
        if (nextPlanet) nextPlanet.classList.remove("nextPlanet");
        
        for (let i = 0; i < pianeti.length; i++) {
            if ( this.querySelector('img').alt.toLocaleLowerCase() === pianeti[i].querySelector('img').alt.toLocaleLowerCase() ) {
                pianeti[i].classList.add("selected");
                if (pianeti[i-1]) {
                    pianeti[i-1].classList.add("nextPlanet");
                }
            }
        }

        CheckSelection();
    });
})

// TODO: aggiungere la possibilità di cambiare pianeta allo scrolling