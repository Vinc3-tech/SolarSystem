// * -- FILE IMPORTATI --
import infoPianeti from './infoPianeti.js'

// * -- FUNZIONI IMPORTATE --
import { card, AnimateCard, updatePlanetDescription } from './card.js';

//plugin registrati
gsap.registerPlugin(ScrollTrigger);

//pianeti
export const pianeti = document.querySelectorAll(".planet");
export let selected_planet;
export let next_planet;
let solarSystemScrollTrigger;
let currentIndex = 0;

// * -- STILE DEI PIANETI AL CARICAMENTO DELLA PAGINA --
document.addEventListener("DOMContentLoaded", () => {

    //aggiunta delle classi all'inizio
    SelectPlanet(0);
    CreateScrollTrigger();
});

// -- animazione dei pianeti (loop infinito) --
const DURATION_ROTATE_PLANET = 180;
gsap.to(document.querySelectorAll(".planet"), {
    rotate: 360,
    duration: DURATION_ROTATE_PLANET,
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

// * -- funzione per selezionare un pianeta da menu o scroll --
export function SelectPlanet(index, updateScroll = false) {
    if (!pianeti[index]) return;

    document.querySelector(".selected")?.classList.remove("selected");
    document.querySelector(".nextPlanet")?.classList.remove("nextPlanet");

    pianeti[index].classList.add("selected");
    if (pianeti[index + 1]) {
        pianeti[index + 1].classList.add("nextPlanet");
    }

    currentIndex = index;
    CheckSelection();

    if (updateScroll) {
        UpdateScrollPosition(index);
    }
}

function UpdateScrollPosition(index) {
    if (!solarSystemScrollTrigger) return;

    const progress = index / (pianeti.length - 1);
    const scrollPosition = solarSystemScrollTrigger.start + ((solarSystemScrollTrigger.end - solarSystemScrollTrigger.start) * progress);

    solarSystemScrollTrigger.scroll(scrollPosition);
    ScrollTrigger.update();
}

// * -- funzione per aggiornare la posizione dei pianeti --
function updatePlanetPosition() {

    const MAX_SCALE = 1.5;  //scala massima (pianeta selezionato)
    const MIN_DISTANCE_PERCENT = 40; //distanza minima tra il pianeta selezionato e quello dopo
    const DURATION_CHANGE_PLANET = .5;  //tempo per cambiare tra un pianeta e l'altro

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
            duration: DURATION_CHANGE_PLANET,
        });
        
    });
}

function CreateScrollTrigger() {
    if (typeof ScrollTrigger === "undefined") return;

    const VALUE_END_SCROLLTRIGGER = 5000

    solarSystemScrollTrigger = ScrollTrigger.create({
        trigger: "#contSolarSystem",
        start: "top top",
        end: `+=${VALUE_END_SCROLLTRIGGER}`,
        pin: true,
        scrub: true,
        onUpdate: self => {

            const index = Math.round(self.progress * (pianeti.length - 1));

            if(index !== currentIndex){
                SelectPlanet(index);
            }
        }

    });
}
