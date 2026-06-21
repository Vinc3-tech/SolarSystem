const canvas = document.getElementById('contNebulose');
const ctx = canvas.getContext('2d');

// dimensioni del canva
function resizeCanvas() {
    canvas.width = window.innerWidth || document.documentElement.clientWidth;
    canvas.height = window.innerHeight || document.documentElement.clientHeight;
}
resizeCanvas();
window.addEventListener('resize', resizeCanvas);

// * --- CLASSE PER LE STELLE CHE SCINTILLANO ---
class Star {
    constructor() {
        this.x = Math.random() * canvas.width;
        this.y = Math.random() * canvas.height;
        // Stelle piccolissime (tra 0.5 e 2 pixel) per essere realistiche
        this.size = Math.random() * 1.5 + 0.5; 
        
        // Gestione dello scintillio (twinkle)
        this.alpha = Math.random(); // Opacità iniziale casuale
        this.speed = Math.random() * 0.02 + 0.005; // Velocità di accensione/spegnimento
        this.phase = Math.random() > 0.5 ? 1 : -1; // 1 = si accende, -1 = si spegne
    }

    update() {
        // Fa oscillare l'opacità per creare l'effetto luccichio
        this.alpha += this.speed * this.phase;
        if (this.alpha >= 1) {
            this.alpha = 1;
            this.phase = -1;
        } else if (this.alpha <= 0.1) {
            this.alpha = 0.1;
            this.phase = 1;
        }
    }

    draw() {
        ctx.fillStyle = `rgba(255, 255, 255, ${this.alpha})`;
        ctx.beginPath();
        ctx.arc(this.x, this.y, this.size, 0, Math.PI * 2);
        ctx.fill();
    }
}

// * --- CLASSE PER LE NUBI DELLA NEBULOSA ---
class NebulaParticle {
    constructor() {
        this.radius = Math.random() * 250 + 350; 
        this.vx = (Math.random() - 0.5) * 0.06;   
        this.vy = (Math.random() - 0.5) * 0.06;   
        
        // opacita delle nubi
        this.alpha = .15; 
        
        this.x = Math.random() * canvas.width;
        this.y = Math.random() * canvas.height;

        //colori nubi
        const colors = [
            { r: 120, g: 75, b: 95 },   // Rosa antico / Mauve desaturato
            { r: 65, g: 75, b: 110 },   // Blu indaco spento
            { r: 70, g: 95, b: 85 },    // Verde salvia scuro
            { r: 90, g: 65, b: 110 }    // Prugna polveroso
        ];

        this.color = colors[Math.floor(Math.random() * colors.length)];
    }

    update() {
        this.x += this.vx;
        this.y += this.vy;

        if (this.x < -this.radius || this.x > canvas.width + this.radius) this.vx *= -1;
        if (this.y < -this.radius || this.y > canvas.height + this.radius) this.vy *= -1;
    }

    draw() {
        let gradient = ctx.createRadialGradient(
            this.x, this.y, 0, 
            this.x, this.y, this.radius
        );
        
        gradient.addColorStop(0, `rgba(${this.color.r}, ${this.color.g}, ${this.color.b}, ${this.alpha})`);
        gradient.addColorStop(0.5, `rgba(${this.color.r}, ${this.color.g}, ${this.color.b}, ${this.alpha * 0.5})`);
        gradient.addColorStop(0.8, `rgba(${this.color.r}, ${this.color.g}, ${this.color.b}, ${this.alpha * 0.15})`);
        gradient.addColorStop(1, 'rgba(0, 0, 0, 0)');

        ctx.fillStyle = gradient;
        ctx.beginPath();
        ctx.arc(this.x, this.y, this.radius, 0, Math.PI * 2);
        ctx.fill();
    }
}

// * --- INIZIALIZZAZIONE DEGLI ELEMENTI ---
const stars = [];
const starCount = 100; // Numero di stelle sullo sfondo
for (let i = 0; i < starCount; i++) {
    stars.push(new Star());
}

const particles = [];
const nebulaCount = 6; // Numero delle nubi
for (let i = 0; i < nebulaCount; i++) {
    particles.push(new NebulaParticle());
}

// * --- LOOP DI ANIMAZIONE ---
function animate() {
    // Sfondo canvas
    ctx.fillStyle = '#050816';
    ctx.fillRect(0, 0, canvas.width, canvas.height);

    // Aggiorna e disegna prima le stelle
    stars.forEach(star => {
        star.update();
        star.draw();
    });

    // Aggiorna e disegna le nubi della nebulosa
    ctx.globalCompositeOperation = 'screen';
    particles.forEach(particle => {
        particle.update();
        particle.draw();
    });
    ctx.globalCompositeOperation = 'source-over';

    requestAnimationFrame(animate);
}

animate();
