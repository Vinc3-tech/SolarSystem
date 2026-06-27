// * -- FILE IMPORTATI --
import infoPianeti from './infoPianeti.js'

// * -- COSTANTI IMPORTATE --
import { selected_planet, next_planet } from './main.js';

// * -- dizionario contenente tutte la caratteristiche dei pianeti --
export const card = {
    nome: {},
    diametro: {},
    orbita: {},
    distanza: {},
    composizione: {},
    descrizione: {},
    curiosita: {},
};

// * -- CREAZIONE CARD AL CARICAMENTO DELLA PAGINA -- 
document.addEventListener("DOMContentLoaded", () => {

    //main div per contenere tutte le informazioni
    const contLabelPianeta = document.createElement("aside");
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

    //scritte dei label di default
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
    //animazioni del btn
    card.link.addEventListener("mouseenter", () => {
        gsap.to(card.link, {
            y: -5,
            ease: "none",
            cursor: "pointer",
            boxShadow: "0 5px 20px var(--accent-highlight)",
            duration: .25,
        });
    });
    card.link.addEventListener("mouseleave", () => {
        gsap.to(card.link, {
            y: 0,
            ease: "none",
            boxShadow: "none",
            duration: .25,
        });
    });

    const contSolarSystem = document.getElementById("contSolarSystem");
    if (contSolarSystem) {
        contSolarSystem.appendChild(contLabelPianeta);  //aggiungi il contenitore della descrizione alla pagina se esiste
    }

});

// * -- funzione per aggiornare la descrizione del pianeta selezionato --
export function updatePlanetDescription() {
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
            if (card.descrizione && (isDesktop && info.descrizione)) {
                card.descrizione.value.textContent =  info.descrizione;
            }
            else{
                card.descrizione.label.textContent = '';
                card.descrizione.value.textContent = '';
            }
            //curiosità
            if (card.curiosita && (isDesktop && info.curiosita)) {
                card.curiosita.value.textContent =  info.curiosita;
            }
            else{
                card.curiosita.label.textContent = '';
                card.curiosita.value.textContent = '';
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

// * -- funzione per animare la card in ingresso --
export function AnimateCard() {

    let tl = gsap.timeline();
    const DURATION_CARD_ANIMATION = 1   //durata totale dell'animazione della card

    tl.add("introCard");
    tl.fromTo(document.querySelectorAll(".labelPianeta"), {
        y: 25,
        duration: DURATION_CARD_ANIMATION,
        ease: "power4.out"
    }, {
        y: 0,
    })
    let delay = .02 //delay iniziale del primo elemento
    Object.keys(card).forEach(chiave => {
        tl.fromTo(card[chiave].container, {
            y: 15,
            duration: DURATION_CARD_ANIMATION,
        }, {
            y: 0,
            delay: delay,
            ease: "power2.out",
        }, "introCard");
        delay += .08;
    });
}
