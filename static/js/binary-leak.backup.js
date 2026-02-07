console.log('[BinaryLeak] Initializing Vapor/Mouse Effect');

document.addEventListener('DOMContentLoaded', () => {
    const canvas = document.getElementById('binary-leak');
    if (!canvas) return;
    const ctx = canvas.getContext('2d');

    let width, height;
    let particles = [];
    const colorsLight = ['#667eea', '#764ba2', '#a3bffa'];
    const colorsDark = ['#764ba2', '#a3bffa', '#ffffff'];

    // Mouse State
    let mouse = { x: -100, y: -100, lastX: -100, lastY: -100, lastMove: Date.now() };
    let isIdle = false;

    // CSLP: Infection State
    let infectionLevel = 0;
    try {
        infectionLevel = parseFloat(localStorage.getItem('darketype_infection_level') || 0);
        if (infectionLevel > 0) console.log(`[BinaryLeak] Infection Detected: Level ${infectionLevel}`);
    } catch (e) { }

    // CSLP: Singularity Button Logic (Level 0.8+)
    if (infectionLevel >= 0.8) {
        spawnSingularityButton();
    }

    function spawnSingularityButton() {
        const btn = document.createElement('a');
        btn.href = 'https://bmccall17.github.io/darketype/index.html';
        btn.innerHTML = '●';
        btn.style.cssText = `
            position: fixed;
            bottom: 20px;
            left: 20px;
            width: 40px;
            height: 40px;
            background: #000;
            color: #0f0;
            border: 1px solid #0f0;
            border-radius: 50%;
            display: flex;
            align-items: center;
            justify-content: center;
            text-decoration: none;
            font-size: 20px;
            z-index: 9999;
            opacity: 0;
            transition: opacity 2s ease;
            cursor: pointer;
            box-shadow: 0 0 10px #0f0;
        `;
        document.body.appendChild(btn);

        // Assemble effect
        setTimeout(() => { btn.style.opacity = (infectionLevel - 0.7) * 3; }, 1000);

        btn.addEventListener('hover', () => {
            btn.innerHTML = '◎';
        });
    }

    class Particle {
        constructor(x, y, type = 'trail') {
            this.x = x;
            this.y = y;
            this.life = 1.0;
            this.size = Math.random() * 15 + 10; // Initial size
            this.vx = (Math.random() - 0.5) * 2; // Initial velocity
            this.vy = (Math.random() - 0.5) * 2;

            // CSLP: Glitch Mutation (Level 0.3+)
            // Chance to form a letter of "darketype" instead of binary
            const glitchChance = Math.max(0, (infectionLevel - 0.2) * 0.1);
            const targetPhrase = "darketype";

            if (Math.random() < glitchChance && type === 'vapor') {
                this.char = targetPhrase[Math.floor(Math.random() * targetPhrase.length)];
                this.isGlitch = true;
                this.color = '#00ff41'; // Force green
            } else {
                this.char = Math.random() > 0.5 ? '1' : '0';
                this.isGlitch = false;
            }

            // Persistent idle particles move slightly outward from mouse center if "vapor"
            if (type === 'vapor' && isIdle) {
                const speed = 0.5;
                // Calculate angle from mouse
                const angleFromMouse = Math.atan2(y - mouse.y, x - mouse.x);
                this.vx = Math.cos(angleFromMouse) * speed;
                this.vy = Math.sin(angleFromMouse) * speed;
                this.decay = 0.002; // Very slow decay for collection effect
            } else {
                this.decay = Math.random() * 0.02 + 0.015;
            }

            const palette = document.body.classList.contains('dark') ? colorsDark : colorsLight;
            // If not a glitch particle, assign color from palette
            if (!this.isGlitch) {
                this.color = palette[Math.floor(Math.random() * palette.length)];
            }
            this.type = type; // Track type for cleanup
        }

        update() {
            this.x += this.vx;
            this.y += this.vy;
            this.life -= this.decay;
            this.size *= 0.96; // Shrink
        }

        draw(ctx) {
            ctx.globalAlpha = Math.max(0, this.life);
            ctx.fillStyle = this.color;
            ctx.font = `${this.size}px monospace`;
            ctx.fillText(this.char, this.x, this.y);

            // Link Overlay Logic for Glitch Particles?
            // (Complex to add real <a> tags, but we could detect clicks on canvas if needed. For now just visual.)

            ctx.globalAlpha = 1.0;
        }
    }

    function resize() {
        width = canvas.width = window.innerWidth;
        height = canvas.height = window.innerHeight;
    }

    function spawnParticle(x, y, type) {
        particles.push(new Particle(x, y, type));
    }

    function handleMouse() {
        const now = Date.now();
        const dist = Math.hypot(mouse.x - mouse.lastX, mouse.y - mouse.lastY);

        // Movement detected
        if (dist > 10) {
            // Wake up idle particles if we were idle
            if (isIdle) {
                particles.forEach(p => {
                    if (p.decay < 0.01) p.decay = 0.05; // Rapid fade for old idle particles
                });
            }
            isIdle = false;
            mouse.lastMove = now;

            // Trail Effect
            if (Math.random() > 0.5) {
                spawnParticle(mouse.x, mouse.y, 'trail');
            }
        }

        // Idle Detection (>200ms stop)
        if (now - mouse.lastMove > 200) {
            isIdle = true;
        }

        // Idle Leaking Effect (Accumulation)
        if (isIdle && mouse.x > 0) {
            // Spawn consistently to build up cloud
            if (Math.random() > 0.8) {
                const offsetX = (Math.random() - 0.5) * 60; // Wider spread
                const offsetY = (Math.random() - 0.5) * 60;
                spawnParticle(mouse.x + offsetX, mouse.y + offsetY, 'vapor');
            }
        }

        // Random Ambient Vapor (Background)
        if (Math.random() > 0.98) {
            spawnParticle(Math.random() * width, Math.random() * height, 'ambient');
        }

        mouse.lastX = mouse.x;
        mouse.lastY = mouse.y;
    }

    function animate() {
        ctx.clearRect(0, 0, width, height);

        handleMouse();

        for (let i = particles.length - 1; i >= 0; i--) {
            const p = particles[i];
            p.update();
            p.draw(ctx);

            if (p.life <= 0 || p.size < 0.5) {
                particles.splice(i, 1);
            }
        }

        requestAnimationFrame(animate);
    }

    // Listeners
    window.addEventListener('resize', resize);
    window.addEventListener('mousemove', e => {
        const rect = canvas.getBoundingClientRect();
        mouse.x = e.clientX - rect.left;
        mouse.y = e.clientY - rect.top;
    });

    resize();
    animate();
});
