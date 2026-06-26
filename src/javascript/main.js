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

// * -- dizionario per la descrizione dei pianeti --
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
    pianeti[0].classList.add("selected");
    pianeti[1].classList.add("nextPlanet");

    //div card per contenere tutte le informazioni
    const contLabelPianeta = document.createElement("div");
    contLabelPianeta.classList.add("labelPianeta");

    Object.keys(card).forEach(chiave => {   //ciclo delle chiavi del dizionario card
        card[chiave].container = document.createElement("div");
        card[chiave].label = document.createElement("span");
        card[chiave].value = document.createElement("span");

        // stile del label
        card[chiave].label.classList.add("labelCaratteristiche", "pixel-font");

        // stile del valore
        card[chiave].value.classList.add("textLabel", "primary-font");

        // container 
        card[chiave].container.appendChild(card[chiave].label);
        card[chiave].container.appendChild(card[chiave].value);
        card[chiave].container.style.margin = "5px 0";

        contLabelPianeta.appendChild(card[chiave].container);
    });
    
    //classe specifica per il nome del pianeta
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
        contSolarSystem.appendChild(contLabelPianeta);  //aggiungi il contenitore della descrizione alla pagina
    }

    CheckSelection();
    CreateScrollTrigger();
});

// * -- Funzione per aggiornare la selezione dei pianeti --
function CheckSelection() {
    selected_planet = document.querySelector(".selected");
    next_planet = document.querySelector(".nextPlanet");

    updatePlanetPosition();
    updatePlanetDescription();
    AnimateCard();
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
            const info = infoPianeti[pianeta];
            if (!info) return;

            // nome del pianeta
            if (card.nome) {
                card.nome.value.textContent = info.nome ?? '';
            }
            // diametro
            if (card.diametro) {
                card.diametro.value.textContent = info.diametroKm ? `${info.diametroKm} Km` : '';
            }
            // distanza dal sole
            if (card.distanza) {
                card.distanza.value.textContent = info.distanzaDalSoleKm ? `${info.distanzaDalSoleKm} Km` : '';
            }
            // tempo di orbita
            if (card.orbita) {
                card.orbita.value.textContent = info.periodoOrbitaleGiorni ? `${info.periodoOrbitaleGiorni} giorni` : '';
            }
            // composizione
            if (card.composizione) {
                card.composizione.value.textContent = info.composizione ?? '';
            }
            const isDesktop = window.innerWidth > 768;  // controllo responsive
            // descrizione
            if (card.descrizione) {
                card.descrizione.value.textContent = (isDesktop && info.descrizione) ? info.descrizione : '';
            }
            //curiosità
            if (card.curiosita) {
                card.curiosita.value.textContent = (isDesktop && info.curiosita) ? info.curiosita : '';
            }

            if (card.link) {
                card.link.onclick = () => {
                    if (info.linkPageHTML) {
                        window.location.href = info.linkPageHTML;
                    }
                };
            }
        }

    });
}

function AnimateCard() {

    let tl = gsap.timeline();

    tl.add("introCard");
    tl.from(document.querySelectorAll(".labelPianeta"), {
        y: 25,
        duration: 1,
        ease: "power4.out"
    })
    let delay = .02
    Object.keys(card).forEach(chiave => {
        tl.from(card[chiave].container, {
            y: 25,
            duration: 1,
            ease: "power4.out",
            delay: delay
        }, "introCard");
        delay += .08;
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

let currentIndex;

function CreateScrollTrigger() {
    if (typeof ScrollTrigger === "undefined") return;

    ScrollTrigger.create({
        trigger: "#contSolarSystem",
        start: "top top",
        end: "+=5000",
        pin: "#contSolarSystem",
        scrub: true,
        onUpdate: self => {

            const index = Math.round(self.progress * (pianeti.length - 1));

            if(index !== currentIndex){
                currentIndex = index;
                document.querySelector(".selected")?.classList.remove("selected");

                pianeti[index].classList.add("selected");

                CheckSelection();
            }
        }

    });
}
