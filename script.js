document.addEventListener('DOMContentLoaded', () => {
    // --- Elements ---
    const envelope = document.getElementById('envelope');
    const waxSeal = document.getElementById('wax-seal');
    const revealBtn = document.getElementById('reveal-btn');
    const finalOverlay = document.getElementById('final-overlay');
    const yesBtn = document.getElementById('yes-btn');
    const noBtn = document.getElementById('no-btn');
    const bgParticles = document.getElementById('bg-particles');

    // --- Config ---
    const icons = ['❤️', '🌹', '💌', '💖', '🧸', '🍓'];
    
    // --- 1. Background Particles ---
    function createParticle() {
        const particle = document.createElement('div');
        particle.classList.add('particle');
        particle.textContent = icons[Math.floor(Math.random() * icons.length)];
        
        particle.style.left = Math.random() * 100 + 'vw';
        particle.style.animationDuration = (Math.random() * 3 + 5) + 's'; // 5-8s
        particle.style.fontSize = (Math.random() * 1.5 + 1) + 'rem';
        
        bgParticles.appendChild(particle);
        
        setTimeout(() => particle.remove(), 8000);
    }
    
    setInterval(createParticle, 300);

    // --- 2. Envelope Interaction ---
    waxSeal.addEventListener('click', openEnvelope);
    envelope.addEventListener('click', (e) => {
        // Allow clicking the envelope body to open it too if not open
        if (!envelope.classList.contains('open') && !e.target.closest('.reveal-btn')) {
            openEnvelope();
        }
    });

    function openEnvelope() {
        if (envelope.classList.contains('open')) return;
        
        envelope.classList.add('open');
        // Play a soft sound if we had one, or just enjoy the visual
    }

    // --- 3. Reveal Big Question ---
    revealBtn.addEventListener('click', (e) => {
        e.stopPropagation();
        finalOverlay.classList.add('active');
    });

    // --- 4. The "No" Button Evasion (Classic Cute Trope) ---
    noBtn.addEventListener('mouseover', moveButton);
    noBtn.addEventListener('touchstart', moveButton); // Mobile support

    function moveButton() {
        const x = Math.random() * (window.innerWidth - noBtn.offsetWidth) - (window.innerWidth / 2);
        const y = Math.random() * (window.innerHeight - noBtn.offsetHeight) - (window.innerHeight / 2);
        
        // Constrain to typical screen bounds roughly
        const safeX = Math.max(Math.min(x, 200), -200); 
        const safeY = Math.max(Math.min(y, 200), -200);

        noBtn.style.transform = `translate(${safeX}px, ${safeY}px) rotate(${Math.random() * 20 - 10}deg)`;
    }

    // --- 5. Celebration ---
    yesBtn.addEventListener('click', () => {
        yesBtn.innerText = "YAY! I Love You! 💖";
        document.querySelector('.big-question').innerHTML = "Best Date Ever! <br> See you soon! 🥰";
        noBtn.style.display = 'none'; // Remove the option
        
        // Massive Confetti
        celebrate();
        setInterval(celebrate, 500); // Keep it coming
    });

    function celebrate() {
        const count = 50;
        const colors = ['#ff6b81', '#ff4757', '#ffa502', '#ffffff'];

        for (let i = 0; i < count; i++) {
            const confetti = document.createElement('div');
            confetti.style.position = 'fixed';
            confetti.style.width = Math.random() * 10 + 5 + 'px';
            confetti.style.height = Math.random() * 10 + 5 + 'px';
            confetti.style.backgroundColor = colors[Math.floor(Math.random() * colors.length)];
            confetti.style.borderRadius = '50%';
            confetti.style.left = '50%';
            confetti.style.top = '50%';
            confetti.style.zIndex = '1000';
            document.body.appendChild(confetti);

            const angle = Math.random() * Math.PI * 2;
            const velocity = Math.random() * 300 + 200;
            const tx = Math.cos(angle) * velocity;
            const ty = Math.sin(angle) * velocity;

            confetti.animate([
                { transform: 'translate(0,0) scale(1)', opacity: 1 },
                { transform: `translate(${tx}px, ${ty}px) scale(0)`, opacity: 0 }
            ], {
                duration: 1500,
                easing: 'cubic-bezier(0.25, 1, 0.5, 1)'
            }).onfinish = () => confetti.remove();
        }
    }
});
