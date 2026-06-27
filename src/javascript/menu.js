// * -- FILE IMPORTATI --
import infoPianeti from './infoPianeti.js'

// * -- FUNZIONI IMPORTATE --
import { SelectPlanet } from './main.js';

// * -- COSTANTI IMPORTATE --
import { pianeti } from './main.js';

// * -- creazione del menu con l'utilizzo dei dizionari --
Object.keys(infoPianeti).forEach(chiave => {
    let contVoce = document.createElement("div");   //div contenente img e nome pianeta
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
    
    const navMenu = document.querySelector("#navMenu");
    if (navMenu) navMenu.appendChild(contVoce);

    AnimateMenu(contVoce, voce, imgPianeta);
});

//funzione per l'animzione del menu
function AnimateMenu(contVoce, voce, imgPianeta) {

    const durationAnim = .5;       //durata dell'animazione di tutti gli elementi
    //creazione delle timeline
    const tl = gsap.timeline({
        paused: true,
        defaults: {     //valori di default che devono avere tutte le animazioni
            duration: durationAnim,
            ease: "power1.InOut"
        }
    });

    tl.to(contVoce, {
        autoAlpha: 1
    }, 0);
    tl.to(voce, {
        x: 20
    }, 0);
    tl.to(imgPianeta, {
        scale: 1.2,
        x: 5
    }, 0);

    contVoce.addEventListener("mouseover", () => {
        tl.play();
    });
    contVoce.addEventListener("mouseleave", () => {
        if (!voce.classList.contains("voceActive")) {
            tl.reverse();
        }
    });

    contVoce.animation = tl;

    //al caricamento della pagina la voce selezionata è la prima
    document.addEventListener("DOMContentLoaded", () => {
        document.querySelectorAll(".contVoce")[0].classList.add("voceActive");
        document.querySelectorAll(".contVoce")[0].animation.play();
    })
    UpdateMenu(contVoce);
}

function UpdateMenu(contVoce) {
    // cambio del pianeta selezionato al click del div nel menu
    contVoce.addEventListener("click", function() {

        const oldActive = document.querySelector(".voceActive");
        if (oldActive) {
            oldActive.classList.remove("voceActive");
            oldActive.closest(".contVoce").animation.reverse();
        }

        contVoce.querySelector(".voce").classList.add("voceActive");
        contVoce.animation.play();
        
        for (let i = 0; i < pianeti.length; i++) {
            if ( this.querySelector('img').alt.toLocaleLowerCase() === pianeti[i].querySelector('img').alt.toLocaleLowerCase() ) {
                SelectPlanet(i, true);
            }
        }
    });
}
