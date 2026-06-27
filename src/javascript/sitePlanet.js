// * INSERCTION OBSERVER
// Create an IntersectionObserver instance
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