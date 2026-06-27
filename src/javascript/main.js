//file - info pianeti
import infoPianeti from './infoPianeti.js'

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
