//file - info pianeti
import infoPianeti from './infoPianeti.js'
import { card, AnimateCard } from './card.js';

gsap.registerPlugin(ScrollTrigger);

//pianeti
const pianeti = document.querySelectorAll(".planet");
let selected_planet;
let next_planet;

// * -- STILE DEI PIANETI AL CARICAMENTO DELLA PAGINA --
document.addEventListener("DOMContentLoaded", () => {

    //aggiunta delle classi all'inizio
    pianeti[0].classList.add("selected");
    pianeti[1].classList.add("nextPlanet");

    CheckSelection();
    CreateScrollTrigger();
});

// -- animazione dei pianeti (loop infinito) --
const durationPlanetDuration = 180;
gsap.to(document.querySelectorAll(".planet"), {
    rotate: 360,
    duration: durationPlanetDuration,
    repeat: -1,
    ease: "none"
})

// * -- Funzione per aggiornare la selezione dei pianeti --
export function CheckSelection() {
    selected_planet = document.querySelector(".selected");
    next_planet = document.querySelector(".nextPlanet");

    updatePlanetPosition();
    updatePlanetDescription();
    AnimateCard();
}

// * -- funzione per aggiornare la posizione dei pianeti --
function updatePlanetPosition() {

    const MAX_SCALE = 1.5;  //scala massima (pianeta selezionato)
    const MIN_DISTANCE_PERCENT = 40 //distanza minima tra il pianeta selezionato e quello dopo

    pianeti.forEach((pianeta, indice) => {
        const indiceSelezionato = Array.from(pianeti).indexOf(selected_planet);
        const differenza = indice - indiceSelezionato;
        
        let zoomValue = MAX_SCALE - differenza;
        let translateValue = MIN_DISTANCE_PERCENT - (differenza * 100);
        
        gsap.to(pianeta, {
            y: `${translateValue}%`,
            scale: zoomValue,
            autoAlpha: differenza === 0 ? 1 : (differenza === 1 ? 0.5 : 0),
            zIndex: indice,
            ease: "power2.out",
            duration: .5,
        });
        
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

let currentIndex = 0;
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
                document.querySelector(".selected")?.classList.remove("selected");  //se è presente un elemento con questa classe viene rimossa

                pianeti[index].classList.add("selected");

                CheckSelection();
            }
        }

    });
}
