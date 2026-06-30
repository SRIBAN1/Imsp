document.addEventListener("DOMContentLoaded", () => {
    
    // --- Loader & Initialization ---
    setTimeout(() => {
        document.getElementById('loader').classList.add('opacity-0');
        setTimeout(() => {
            document.getElementById('loader').style.display = 'none';
            document.getElementById('main-content').classList.remove('hidden');
            
            // Start Hero Typing Animation
            typeWriter("hero-title", "Happy Birthday Nancy ❤️", 100, () => {
                typeWriter("hero-subtitle", `"My Forever Person"`, 80);
            });
            
            // Start Canvas Particles
            initCanvas();
        }, 1000);
    }, 3000);

    // --- Audio Controller ---
    const music = document.getElementById("bg-music");
    const musicBtn = document.getElementById("music-toggle");
    let isPlaying = false;

    musicBtn.addEventListener("click", () => {
        if (isPlaying) {
            music.pause();
            musicBtn.innerHTML = '<i class="fas fa-play"></i>';
        } else {
            music.play().catch(() => console.log("Audio play blocked by browser."));
            musicBtn.innerHTML = '<i class="fas fa-pause"></i>';
        }
        isPlaying = !isPlaying;
    });

    // --- Typing Effect Utility ---
    function typeWriter(elementId, text, speed, callback = null) {
        let i = 0;
        const el = document.getElementById(elementId);
        el.innerHTML = "";
        function type() {
            if (i < text.length) {
                el.innerHTML += text.charAt(i);
                i++;
                setTimeout(type, speed);
            } else if (callback) {
                setTimeout(callback, 500);
            }
        }
        type();
    }

    // --- Navigation (Open Heart Button) ---
    document.getElementById("open-heart-btn").addEventListener("click", () => {
        document.getElementById("countdown-section").scrollIntoView({ behavior: 'smooth' });
    });

    // --- Scroll Reveal Animations ---
    const revealElements = document.querySelectorAll('.reveal, .reveal-card');
    const revealObserver = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('active');
            }
        });
    }, { threshold: 0.1 });

    revealElements.forEach(el => revealObserver.observe(el));

    // --- Birthday Countdown ---
    function updateCountdown() {
        const now = new Date();
        const currentYear = now.getFullYear();
        // Month is 0-indexed in JS, so 6 is July. July 5th.
        let targetDate = new Date(currentYear, 6, 5); 

        // If birthday has passed this year, set to next year
        if (now > targetDate && now.getDate() !== 5) {
            targetDate = new Date(currentYear + 1, 6, 5);
        }

        const diff = targetDate - now;

        // If it's currently July 5th
        if (now.getMonth() === 6 && now.getDate() === 5) {
            document.getElementById("countdown").classList.add("hidden");
            document.getElementById("birthday-greeting").classList.remove("hidden");
            document.querySelector("#countdown-section .section-title").style.display = 'none';
        } else {
            const d = Math.floor(diff / (1000 * 60 * 60 * 24));
            const h = Math.floor((diff / (1000 * 60 * 60)) % 24);
            const m = Math.floor((diff / 1000 / 60) % 60);
            const s = Math.floor((diff / 1000) % 60);

            document.getElementById("days").innerText = d < 10 ? '0' + d : d;
            document.getElementById("hours").innerText = h < 10 ? '0' + h : h;
            document.getElementById("minutes").innerText = m < 10 ? '0' + m : m;
            document.getElementById("seconds").innerText = s < 10 ? '0' + s : s;
        }
    }
    setInterval(updateCountdown, 1000);
    updateCountdown();

    // --- Love Letter Envelope ---
    const envelope = document.getElementById("envelope");
    let letterOpened = false;
    const letterText = `Happy Birthday Madam Jii<br><br>
    You came when I wasn't searching for love<br>
    And made me love you so much<br>
    And now my entire world is you<br>
    You are my everything<br>
    I love you sooo much Nancy<br>
    You mean a lot to me<br>
    You are my future and if it's not you then no one<br><br>
    Madam Jii Aapse pyaar karta hoon ❤️`;

    envelope.addEventListener("click", () => {
        if (!letterOpened) {
            envelope.classList.add("open");
            document.querySelector('.click-indicator').style.display = 'none';
            setTimeout(() => {
                // Modified typing effect for HTML inner text
                const el = document.getElementById("letter-text");
                el.classList.add("handwriting-text");
                el.innerHTML = letterText; // Directly injecting for formatting consistency
                letterOpened = true;
            }, 1000);
        }
    });

    // --- Cake & Candles ---
    const blowBtn = document.getElementById("blow-candles-btn");
    blowBtn.addEventListener("click", () => {
        const flames = document.querySelectorAll(".flame");
        flames.forEach(flame => flame.classList.add("out"));
        
        blowBtn.innerText = "Yay! Happy Birthday!";
        blowBtn.style.pointerEvents = "none";
        
        // Trigger Fireworks in Canvas
        fireworksActive = true;
        
        // Show Final Section
        setTimeout(() => {
            const finalSection = document.getElementById("final-surprise");
            finalSection.classList.remove("hidden-section");
            finalSection.scrollIntoView({ behavior: 'smooth' });
            finalSection.classList.add('active');
        }, 2500);
    });

    // --- Final Surprise (Thousands of Hearts) ---
    const foreverBtn = document.getElementById("forever-btn");
    foreverBtn.addEventListener("click", () => {
        // Trigger heart storm
        for (let i = 0; i < 300; i++) {
            setTimeout(createFloatingHeart, Math.random() * 3000);
        }
        
        // Reveal Final Message
        foreverBtn.style.display = "none";
        const finalMsg = document.getElementById("final-message");
        finalMsg.classList.remove("hidden");
        finalMsg.innerHTML = `You are my today,<br>my tomorrow,<br>and every beautiful tomorrow after that.<br><br>Happy Birthday, My Love. ❤️`;
    });

    function createFloatingHeart() {
        const heart = document.createElement("div");
        heart.classList.add("floating-heart");
        heart.innerHTML = ["❤️", "💖", "🌸", "✨"][Math.floor(Math.random() * 4)];
        heart.style.left = Math.random() * 100 + "vw";
        heart.style.fontSize = (Math.random() * 20 + 10) + "px";
        heart.style.animationDuration = (Math.random() * 3 + 2) + "s";
        document.body.appendChild(heart);
        setTimeout(() => { heart.remove(); }, 5000);
    }

    // --- Canvas Background (Particles & Fireworks) ---
    const canvas = document.getElementById("bg-canvas");
    const ctx = canvas.getContext("2d");
    let particles = [];
    let fireworks = [];
    let fireworksActive = false;

    function resizeCanvas() {
        canvas.width = window.innerWidth;
        canvas.height = window.innerHeight;
    }
    window.addEventListener("resize", resizeCanvas);
    resizeCanvas();

    // Ambient Particles
    class Particle {
        constructor() {
            this.x = Math.random() * canvas.width;
            this.y = Math.random() * canvas.height;
            this.size = Math.random() * 2;
            this.speedY = Math.random() * 0.5 + 0.1;
            this.color = `rgba(255, 213, 79, ${Math.random() * 0.5 + 0.2})`; // Goldish
        }
        update() {
            this.y -= this.speedY;
            if (this.y < 0) {
                this.y = canvas.height;
                this.x = Math.random() * canvas.width;
            }
        }
        draw() {
            ctx.fillStyle = this.color;
            ctx.beginPath();
            ctx.arc(this.x, this.y, this.size, 0, Math.PI * 2);
            ctx.fill();
        }
    }

    // Fireworks
    class Firework {
        constructor() {
            this.x = Math.random() * canvas.width;
            this.y = canvas.height;
            this.targetY = Math.random() * (canvas.height / 2);
            this.speed = Math.random() * 3 + 2;
            this.radius = 2;
            this.exploded = false;
            this.particles = [];
            this.color = `hsl(${Math.random() * 360}, 100%, 70%)`;
        }
        update() {
            if (!this.exploded) {
                this.y -= this.speed;
                if (this.y <= this.targetY) {
                    this.exploded = true;
                    for(let i=0; i<50; i++) {
                        this.particles.push(new ExplodingParticle(this.x, this.y, this.color));
                    }
                }
            } else {
                for (let i = 0; i < this.particles.length; i++) {
                    this.particles[i].update();
                    if (this.particles[i].alpha <= 0) {
                        this.particles.splice(i, 1);
                        i--;
                    }
                }
            }
        }
        draw() {
            if (!this.exploded) {
                ctx.fillStyle = this.color;
                ctx.beginPath();
                ctx.arc(this.x, this.y, this.radius, 0, Math.PI * 2);
                ctx.fill();
            } else {
                this.particles.forEach(p => p.draw());
            }
        }
    }

    class ExplodingParticle {
        constructor(x, y, color) {
            this.x = x;
            this.y = y;
            this.color = color;
            const angle = Math.random() * Math.PI * 2;
            const speed = Math.random() * 3 + 1;
            this.vx = Math.cos(angle) * speed;
            this.vy = Math.sin(angle) * speed;
            this.alpha = 1;
            this.decay = Math.random() * 0.02 + 0.01;
        }
        update() {
            this.x += this.vx;
            this.y += this.vy;
            this.vy += 0.05; // gravity
            this.alpha -= this.decay;
        }
        draw() {
            ctx.save();
            ctx.globalAlpha = this.alpha;
            ctx.fillStyle = this.color;
            ctx.beginPath();
            ctx.arc(this.x, this.y, 2, 0, Math.PI * 2);
            ctx.fill();
            ctx.restore();
        }
    }

    function initCanvas() {
        for (let i = 0; i < 100; i++) {
            particles.push(new Particle());
        }
        animateCanvas();
    }

    function animateCanvas() {
        ctx.clearRect(0, 0, canvas.width, canvas.height);
        
        particles.forEach(p => {
            p.update();
            p.draw();
        });

        if (fireworksActive) {
            if (Math.random() < 0.05) fireworks.push(new Firework());
            
            for (let i = 0; i < fireworks.length; i++) {
                fireworks[i].update();
                fireworks[i].draw();
                if (fireworks[i].exploded && fireworks[i].particles.length === 0) {
                    fireworks.splice(i, 1);
                    i--;
                }
            }
        }

        requestAnimationFrame(animateCanvas);
    }
});