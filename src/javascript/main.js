//file - info pianeti
import infoPianeti from './infoPianeti.js'

//pianeti
const pianeti = document.querySelectorAll(".planet");
let selected_planet;
let next_planet;

// * -- STILE DEI PIANETI AL CARICAMENTO DELLA PAGINA --
document.addEventListener("DOMContentLoaded", () => {

    pianeti.forEach(pianeta => {
        // div per il gradiente sfumato
        const divGradient = document.createElement("div");
        divGradient.classList.add("transparent-gradient");
        pianeta.appendChild(divGradient);
    });

    //aggiunta delle classi
    //all'inizio il sole e mercurio sono visibili
    pianeti[pianeti.length - 1].classList.add("selected");
    pianeti[pianeti.length - 2].classList.add("nextPlanet");

    CheckSelection();
});

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

function CheckSelection() {

    selected_planet = document.querySelector(".selected");
    next_planet = document.querySelector(".nextPlanet");

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

    //aggiunta caratteristiche dei pianeti selezionati
    Object.keys(infoPianeti).forEach(chiave => {

        let namePlatet = selected_planet.querySelector('img').alt.toLocaleLowerCase();

        if (chiave === namePlatet) {

            const divLabelPianeta = document.createElement("div");
            divLabelPianeta.classList.add("labelPianeta");

            //nome del pianeta
            if (infoPianeti[chiave].nome) {
                let contNomePianeta = document.createElement("div");

                let label = document.createElement("span");
                label.classList.add("labelCaratteristiche","pixel-font");
                label.textContent = `Pianeta selezionato: `;

                let nomePianeta = document.createElement("span");
                nomePianeta.classList.add("textLabel","labelNomePianeta","primary-font");
                nomePianeta.style.display = "block";
                nomePianeta.textContent = infoPianeti[chiave].nome;

                contNomePianeta.appendChild(label);
                contNomePianeta.appendChild(nomePianeta);
                divLabelPianeta.appendChild(contNomePianeta);
            };
            //diametro
            if (infoPianeti[chiave].diametroKm) {
                let contDiametroPianeta = document.createElement("div");

                let label = document.createElement("span");
                label.classList.add("labelCaratteristiche","pixel-font");
                label.textContent = `Diametro: `;

                let diametroPianeta = document.createElement("span");
                diametroPianeta.classList.add("textLabel","primary-font");
                diametroPianeta.textContent = infoPianeti[chiave].diametroKm +'Km';

                contDiametroPianeta.appendChild(label).appendChild(diametroPianeta);
                divLabelPianeta.appendChild(contDiametroPianeta);
            };
            //distanza dal sole
            if (infoPianeti[chiave].distanzaDalSoleKm) {
                let contDistanzaPianetaSole = document.createElement("div");
                contDistanzaPianetaSole.classList.add("caratteristichePianeta");

                let label = document.createElement("span");
                label.classList.add("labelCaratteristiche","pixel-font");
                label.textContent = `Distanza dal sole: `;

                let distanzaPianetaSole = document.createElement("span");
                distanzaPianetaSole.classList.add("textLabel","primary-font");
                distanzaPianetaSole.textContent = infoPianeti[chiave].distanzaDalSoleKm + 'Km';

                contDistanzaPianetaSole.appendChild(label).appendChild(distanzaPianetaSole);
                divLabelPianeta.appendChild(contDistanzaPianetaSole);
            };
            //tempo di orbita attorno al sole
            if (infoPianeti[chiave].periodoOrbitaleGiorni) {
                let contOrbitaPianeta = document.createElement("div");

                let label = document.createElement("span");
                label.classList.add("labelCaratteristiche","pixel-font");
                label.textContent = `Tempo di orbita attorno al Sole: `;

                let tempoOrbita = document.createElement("span");
                tempoOrbita.classList.add("textLabel","primary-font");
                tempoOrbita.textContent = `${infoPianeti[chiave].periodoOrbitaleGiorni} giorni`;

                contOrbitaPianeta.appendChild(label).appendChild(tempoOrbita);
                divLabelPianeta.appendChild(contOrbitaPianeta);
            };
            //composizione del pianeta
            if (infoPianeti[chiave].composizione) {
                let contComposizionePianeta = document.createElement("div");

                let label = document.createElement("span");
                label.classList.add("labelCaratteristiche","pixel-font");
                label.textContent = `Pianeta selezionato: `;

                let composizione = document.createElement("span");
                composizione.classList.add("textLabel","primary-font");
                composizione.textContent = infoPianeti[chiave].composizione;

                contComposizionePianeta.appendChild(label).appendChild(composizione);
                divLabelPianeta.appendChild(contComposizionePianeta);
            };

            document.getElementById("contSolarSystem").appendChild(divLabelPianeta);
        }
    })

}

// cambio del pianeta selezionato al click del div nel menu
document.querySelectorAll(".contVoce").forEach(contVoce => {
    contVoce.addEventListener("click", function() {

        document.querySelector(".selected").classList.remove("selected");

        const descrizionePlanet = document.querySelector(".labelPianeta");
        if (descrizionePlanet) descrizionePlanet.remove();

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