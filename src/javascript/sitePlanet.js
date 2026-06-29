//plugin registrati
gsap.registerPlugin(ScrollTrigger);

// * INSERCTION OBSERVER
const observer = new IntersectionObserver((entries) => {
    entries.forEach((entry) => {
        if (entry.isIntersecting) {
            AnimateStatistics();
            observer.unobserve(entry.target);
        }
    });
}, {
    root: null,
    rootMargin: "0px",
    threshold: .8
});

// -- animazione delle statistiche --
const contStatistica = document.querySelectorAll(".cardStatisticaPianeta");
const DURATION_STATISTICS_ANIMATION = 2;
let MAX_VALUE_STATISTICA;

document.addEventListener("DOMContentLoaded", () => {
    const sectionStatistiche = document.querySelector("#sectionStatistiche");
    observer.observe(sectionStatistiche);
})

function AnimateStatistics() {
    contStatistica.forEach(statistica => {
        const contValueStatistica = statistica.querySelector(".ValueStatistica");
        if (contValueStatistica) {
            MAX_VALUE_STATISTICA = parseInt(contValueStatistica.textContent);
        };
        
        let count = { value: 0 };
        gsap.to(count, {
            value: MAX_VALUE_STATISTICA,
            duration: DURATION_STATISTICS_ANIMATION,
            ease: "power3.out",
            onUpdate: () => {
                contValueStatistica.textContent = Math.round(count.value);
            }
        });
    });
}

// animazione sezione del pianeta
const SezioniPianeta = document.querySelectorAll(".sezionePianeta");
const CardSezione = document.querySelectorAll(".cardSVG");
const contSezioniPianeta = document.querySelector("#sectionPianetaSezionato");

let tl_sezione = gsap.timeline({
    scrollTrigger: {
        trigger: contSezioniPianeta,
        pin: contSezioniPianeta,
        start: "center center",
        end: "+=1500px",
        scrub: 1.3,
    }
});

let StartSVGPosition = 0;
let StartCardPosition = 0;
let FinalCardPosition = 0;

SezioniPianeta.forEach((sezione, i) => {

    tl_sezione.fromTo(sezione, {    //svg
        y: StartSVGPosition + '%',
    }, {
        y: 0,
    });

    tl_sezione.fromTo(CardSezione[i], { //card
        y: StartCardPosition + '%',
    }, {
        y: FinalCardPosition,
    });

    FinalCardPosition += 20;
    StartSVGPosition += 130;
    StartCardPosition += 120;
});