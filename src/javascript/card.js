// * -- dizionario per la descrizione dei pianeti --
export const card = {
    nome: {},
    diametro: {},
    orbita: {},
    distanza: {},
    composizione: {},
    descrizione: {},
    curiosita: {},
};

document.addEventListener("DOMContentLoaded", () => {

    //div card per contenere tutte le informazioni
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
        contSolarSystem.appendChild(contLabelPianeta);  //aggiungi il contenitore della descrizione alla pagina
    }

});

export function AnimateCard() {

    let tl = gsap.timeline();
    const duration = 1

    tl.add("introCard");
    tl.fromTo(document.querySelectorAll(".labelPianeta"), {
        y: 25,
        duration: duration,
        ease: "power4.out"
    }, {
        y: 0,
    })
    let delay = .02
    Object.keys(card).forEach(chiave => {
        tl.fromTo(card[chiave].container, {
            y: 15,
            duration: duration,
        }, {
            y: 0,
            delay: delay,
            ease: "power2.out",
        }, "introCard");
        delay += .08;
    });
}

//animazione del btn scopri di più
