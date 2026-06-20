//file - info pianeti
import infoPianeti from './infoPianeti.js'

//pianeti
const pianeti = document.querySelectorAll(".planet");

let zIndex = 0;
//assegnazione degl'index e del display none a tutti i pianeti
pianeti.forEach(pianeta => {
    zIndex += 1;
    pianeta.style.zIndex = zIndex;
    pianeta.style.display = "none";

    let boxGradient = document.createElement("div");
    boxGradient.style.zIndex = zIndex;
    boxGradient.classList.add("transparent-gradient");
    pianeta.append(boxGradient);
});

//creazione del menu con l'utilizzo dei dizionari
Object.keys(infoPianeti).forEach(chiave => {
    let contVoce = document.createElement("div");
    contVoce.classList.add("contVoce");

    let imgPianeta = document.createElement("img");
    imgPianeta.src = infoPianeti[chiave].src;
    imgPianeta.classList.add("miniPlanet");

    let voce = document.createElement("span");
    voce.classList.add("voce");
    voce.textContent = infoPianeti[chiave].nome;

    contVoce.appendChild(imgPianeta);
    contVoce.appendChild(voce);
    document.getElementById("navMenu").appendChild(contVoce);
});

//all'inizio il sole e mercurio sono visibili
pianeti[pianeti.length - 1].classList.add("selected");
pianeti[pianeti.length - 2].classList.add("nextPlanet");
//aggiunta delle classi
let selected_planet = document.querySelector(".selected");
let next_planet = document.querySelector(".nextPlanet");
//style dei pianeti selezionati
selected_planet.style.display = "block";
selected_planet.style.transform = "translate(-50%, 30%) scale(1.8)";
next_planet.style.display = "block";
next_planet.style.transform = "translate(-50%, -70%) scale(.8)";