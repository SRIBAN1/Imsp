/**
 * Nancy's Birthday Website Script
 * Setup Notes:
 * 1. Music: Place your romantic instrumental mp3 in 'assets/music.mp3'.
 * 2. Date: The countdown target is set to July 5th.
 */

document.addEventListener('DOMContentLoaded', () => {
    // 1. Loading Screen
    const loadingScreen = document.getElementById('loading-screen');
    setTimeout(() => {
        loadingScreen.style.opacity = '0';
        setTimeout(() => {
            loadingScreen.style.display = 'none';
            startHeroAnimations();
        }, 1000);
    }, 2500);

    // 2. Background Particles (Hearts/Sparkles)
    const bgContainer = document.getElementById('bg-canvas-container');
    function createParticle() {
        const particle = document.createElement('div');
        particle.className = 'particle';
        const isHeart = Math.random() > 0.5;
        particle.innerHTML = isHeart ? '❤️' : '✨';
        particle.style.left = Math.random() * 100 + 'vw';
        particle.style.top = '100vh';
        particle.style.fontSize = (Math.random() * 20 + 10) + 'px';
        particle.style.opacity = Math.random();
        
        const duration = Math.random() * 5 + 5;
        particle.style.animationDuration = duration + 's';
        
        bgContainer.appendChild(particle);
        
        setTimeout(() => {
            particle.remove();
        }, duration * 1000);
    }
    setInterval(createParticle, 300);

    // 3. Hero Typing Animation
    const subheading = document.getElementById('typing-subheading');
    const text = "My Forever Person";
    let index = 0;
    function typeEffect() {
        if (index < text.length) {
            subheading.innerHTML += text.charAt(index);
            index++;
            setTimeout(typeEffect, 100);
        }
    }

    function startHeroAnimations() {
        typeEffect();
        createConfetti();
    }

    // 4. Music Player
    const music = document.getElementById('bg-music');
    const musicToggle = document.getElementById('music-toggle');
    let isPlaying = false;

    musicToggle.addEventListener('click', () => {
        if (isPlaying) {
            music.pause();
            musicToggle.innerHTML = '🎵';
        } else {
            music.play().catch(e => console.log("Audio play failed:", e));
            musicToggle.innerHTML = '⏸️';
        }
        isPlaying = !isPlaying;
    });

    // 5. Scroll Smoothly to Countdown
    document.getElementById('open-heart-btn').addEventListener('click', () => {
        document.getElementById('countdown-section').scrollIntoView({ behavior: 'smooth' });
    });

    // 6. Countdown Timer
    const countdownDate = new Date();
    countdownDate.setMonth(6); // July (0-indexed)
    countdownDate.setDate(5);
    countdownDate.setHours(0, 0, 0, 0);

    // If date passed this year, move to next year
    if (new Date() > countdownDate) {
        countdownDate.setFullYear(countdownDate.getFullYear() + 1);
    }

    function updateCountdown() {
        const now = new Date().getTime();
        const distance = countdownDate - now;

        const d = Math.floor(distance / (1000 * 60 * 60 * 24));
        const h = Math.floor((distance % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
        const m = Math.floor((distance % (1000 * 60 * 60)) / (1000 * 60));
        const s = Math.floor((distance % (1000 * 60)) / 1000);

        document.getElementById('days').innerText = d.toString().padStart(2, '0');
        document.getElementById('hours').innerText = h.toString().padStart(2, '0');
        document.getElementById('minutes').innerText = m.toString().padStart(2, '0');
        document.getElementById('seconds').innerText = s.toString().padStart(2, '0');

        if (distance < 0) {
            clearInterval(timerInterval);
            document.getElementById('countdown').classList.add('hidden');
            document.getElementById('birthday-msg').classList.remove('hidden');
        }
    }
    const timerInterval = setInterval(updateCountdown, 1000);
    updateCountdown();

    // 7. Scroll Reveal Observer
    const revealElements = document.querySelectorAll('.reveal');
    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('active');
            }
        });
    }, { threshold: 0.1 });

    revealElements.forEach(el => observer.observe(el));

    // 8. Love Letter Animation
    const envelope = document.getElementById('envelope');
    const letterContent = document.getElementById('letter-content');
    const letterText = `Happy Birthday Madam Jii\n\nYou came when I wasn't searching for love\nAnd made me love you so much\nAnd now my entire world is you\n\nYou are my everything\nI love you sooo much Nancy\nYou mean a lot to me\n\nYou are my future and if it's not you then no one\n\nMadam Jii Aapse pyaar karta hoon ❤️`;

    let letterTyped = false;
    envelope.addEventListener('click', () => {
        envelope.classList.toggle('open');
        if (envelope.classList.contains('open') && !letterTyped) {
            typeLetter();
            letterTyped = true;
        }
    });

    function typeLetter() {
        let i = 0;
        function type() {
            if (i < letterText.length) {
                letterContent.innerHTML += letterText.charAt(i) === '\n' ? '<br>' : letterText.charAt(i);
                i++;
                setTimeout(type, 50);
            }
        }
        type();
    }

    // 9. Cake & Candles
    const blowBtn = document.getElementById('blow-candles-btn');
    const flames = document.querySelectorAll('.flame');
    
    blowBtn.addEventListener('click', () => {
        flames.forEach(f => f.classList.add('out'));
        createConfetti();
        createBalloons();
        playFireworks();
        blowBtn.innerText = "Make a Wish! ✨";
        blowBtn.disabled = true;
    });

    // 10. Final Surprise
    const foreverBtn = document.getElementById('forever-btn');
    const finalMsg = document.getElementById('final-message');

    foreverBtn.addEventListener('click', () => {
        finalMsg.classList.remove('hidden');
        foreverBtn.style.display = 'none';
        burstHearts();
    });

    // Utility: Confetti Burst
    function createConfetti() {
        for (let i = 0; i < 50; i++) {
            const confetti = document.createElement('div');
            confetti.style.position = 'fixed';
            confetti.style.width = '10px';
            confetti.style.height = '10px';
            confetti.style.backgroundColor = ['#ffb7c5', '#d4af37', '#e6e6fa', '#ffffff'][Math.floor(Math.random() * 4)];
            confetti.style.left = Math.random() * 100 + 'vw';
            confetti.style.top = '-10px';
            confetti.style.zIndex = '1000';
            confetti.style.borderRadius = '2px';
            document.body.appendChild(confetti);

            const animation = confetti.animate([
                { transform: 'translate3d(0,0,0) rotate(0deg)', opacity: 1 },
                { transform: `translate3d(${(Math.random() - 0.5) * 200}px, 100vh, 0) rotate(${Math.random() * 360}deg)`, opacity: 0 }
            ], {
                duration: Math.random() * 3000 + 2000,
                easing: 'cubic-bezier(0, .9, .57, 1)'
            });

            animation.onfinish = () => confetti.remove();
        }
    }

    // Utility: Balloons
    function createBalloons() {
        const colors = ['#ffb7c5', '#9370db', '#e6e6fa', '#ffeb3b'];
        for (let i = 0; i < 15; i++) {
            const balloon = document.createElement('div');
            balloon.style.position = 'fixed';
            balloon.style.bottom = '-100px';
            balloon.style.left = Math.random() * 100 + 'vw';
            balloon.style.width = '40px';
            balloon.style.height = '50px';
            balloon.style.backgroundColor = colors[Math.floor(Math.random() * colors.length)];
            balloon.style.borderRadius = '50% 50% 50% 50% / 40% 40% 60% 60%';
            balloon.style.zIndex = '1000';
            document.body.appendChild(balloon);

            balloon.animate([
                { transform: 'translateY(0)' },
                { transform: 'translateY(-120vh)' }
            ], {
                duration: Math.random() * 4000 + 4000,
                easing: 'ease-in'
            }).onfinish = () => balloon.remove();
        }
    }

    // Utility: Fireworks (Simple visual effect)
    function playFireworks() {
        const colors = ['#ff0', '#f0f', '#0ff', '#f00', '#0f0'];
        for (let i = 0; i < 5; i++) {
            setTimeout(() => {
                const x = Math.random() * 100;
                const y = Math.random() * 50;
                const firework = document.createElement('div');
                firework.style.position = 'fixed';
                firework.style.left = x + 'vw';
                firework.style.top = y + 'vh';
                firework.style.width = '4px';
                firework.style.height = '4px';
                firework.style.borderRadius = '50%';
                firework.style.boxShadow = `0 0 0 0 ${colors[i % colors.length]}`;
                firework.style.zIndex = '1000';
                document.body.appendChild(firework);

                firework.animate([
                    { boxShadow: `0 0 0 0 ${colors[i % colors.length]}`, opacity: 1 },
                    { boxShadow: `0 0 40px 100px transparent`, opacity: 0 }
                ], {
                    duration: 1000,
                    easing: 'ease-out'
                }).onfinish = () => firework.remove();
            }, i * 500);
        }
    }

    // Utility: Burst Hearts
    function burstHearts() {
        for (let i = 0; i < 100; i++) {
            const heart = document.createElement('div');
            heart.innerHTML = '❤️';
            heart.style.position = 'fixed';
            heart.style.left = '50vw';
            heart.style.top = '50vh';
            heart.style.fontSize = '20px';
            heart.style.zIndex = '1000';
            heart.style.pointerEvents = 'none';
            document.body.appendChild(heart);

            const angle = Math.random() * Math.PI * 2;
            const velocity = Math.random() * 300 + 100;
            const tx = Math.cos(angle) * velocity;
            const ty = Math.sin(angle) * velocity;

            heart.animate([
                { transform: 'translate(-50%, -50%) scale(0)', opacity: 1 },
                { transform: `translate(calc(-50% + ${tx}px), calc(-50% + ${ty}px)) scale(1.5)`, opacity: 0 }
            ], {
                duration: Math.random() * 1000 + 1000,
                easing: 'ease-out'
            }).onfinish = () => heart.remove();
        }
    }
});
