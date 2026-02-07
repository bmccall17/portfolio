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
    let buttonSpawned = false; // Track button state
    try {
        infectionLevel = parseFloat(localStorage.getItem('darketype_infection_level') || 0);
        if (infectionLevel > 0) console.log(`[BinaryLeak] Infection Detected: Level ${infectionLevel}`);
    } catch (e) { }

    // CSLP: Singularity Button Logic (Level 0.8+)
    if (infectionLevel >= 0.8) {
        spawnSingularityButton();
        buttonSpawned = true;
    }

    function spawnSingularityButton() {
        const btn = document.createElement('a');
        btn.id = 'singularity-btn'; // Add ID for easier selection if needed
        btn.href = 'https://bmccall17.github.io/';
        btn.innerHTML = '●';
        btn.title = "the singularity awaits";
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
            transform: scale(0) rotate(-180deg);
            transition: all 1.5s cubic-bezier(0.175, 0.885, 0.32, 1.275);
            cursor: pointer;
            box-shadow: 0 0 5px #0f0, inset 0 0 10px rgba(0, 255, 0, 0.2);
            overflow: hidden;
        `;

        // Singularity Ring Animation
        const ring = document.createElement('div');
        ring.style.cssText = `
            position: absolute;
            top: -50%; left: -50%;
            width: 200%; height: 200%;
            background: conic-gradient(transparent, rgba(0, 255, 65, 0.5), transparent 30%);
            animation: spin 2s linear infinite;
            border-radius: 50%;
            pointer-events: none;
        `;
        // We need to inject the keyframes if they don't exist, but inline style is tricky for keyframes.
        // We'll rely on a simple rotation or just the pulse for now since we can't easily add global CSS.
        // Actually, let's just use a pulsing shadow for simplicity and robustness in a single file/JS context.
        btn.style.animation = "pulse-green 2s infinite";

        // Inject style for keyframes
        const style = document.createElement('style');
        style.innerHTML = `
            @keyframes pulse-green {
                0% { box-shadow: 0 0 5px #0f0; }
                50% { box-shadow: 0 0 20px #0f0, 0 0 10px #0f0 inset; }
                100% { box-shadow: 0 0 5px #0f0; }
            }
        `;
        document.head.appendChild(style);

        document.body.appendChild(btn);

        // Assembly Animation
        setTimeout(() => {
            btn.style.opacity = (infectionLevel - 0.7) * 3.3; // Visible at 0.8+, fully opaque at 1.0
            btn.style.transform = 'scale(1) rotate(0deg)';
        }, 1000);

        btn.addEventListener('mouseenter', () => {
            btn.innerHTML = '◎';
            btn.style.background = '#001100';
        });
        btn.addEventListener('mouseleave', () => {
            btn.innerHTML = '●';
            btn.style.background = '#000';
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
            this.glitchChance = Math.max(0, (infectionLevel - 0.2) * 0.1);
            this.targetPhrase = "darketype";
            this.isGlitch = Math.random() < this.glitchChance && type === 'vapor';

            if (this.isGlitch) {
                this.char = this.targetPhrase[Math.floor(Math.random() * this.targetPhrase.length)];
                this.color = '#00ff41'; // Force green (Matrix/Singularity color)
                this.font = 'monospace';
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

            // CSLP: Active Glitching
            // If it's a glitch particle, occasionally mutate the character to flicker
            if (this.isGlitch && Math.random() > 0.8) {
                // 50% chance to be binary, 50% chance to be darketype char
                if (Math.random() > 0.5) {
                    this.char = Math.random() > 0.5 ? '1' : '0';
                } else {
                    this.char = this.targetPhrase[Math.floor(Math.random() * this.targetPhrase.length)];
                }
            }
        }

        draw(ctx) {
            ctx.globalAlpha = Math.max(0, this.life);
            ctx.fillStyle = this.color;
            ctx.font = `${this.size}px monospace`;

            // CSLP: Glitch particles might jitter in position slightly
            let dx = 0; let dy = 0;
            if (this.isGlitch) {
                dx = (Math.random() - 0.5) * 2;
                dy = (Math.random() - 0.5) * 2;
            }

            ctx.fillText(this.char, this.x + dx, this.y + dy);

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

            // CSLP: Increase Infection on Movement
            // Rate: 0.00005 per pixel approx.
            infectionLevel += dist * 0.00005;
            if (infectionLevel > 1) infectionLevel = 1;

            // Update Storage & Check Button (Throttled)
            if (Math.random() > 0.95) {
                localStorage.setItem('darketype_infection_level', infectionLevel.toFixed(4));

                if (!buttonSpawned && infectionLevel >= 0.8) {
                    spawnSingularityButton();
                    buttonSpawned = true;
                }
            }
        }

        // Idle Detection (>200ms stop)
        if (now - mouse.lastMove > 200) {
            isIdle = true;
        }

        // Idle Leaking Effect (Accumulation)
        if (isIdle && mouse.x > 0) {
            // Spawn consistently to build up cloud
            // CSLP: Reduced rate (17% of original)
            if (Math.random() > 0.966) {
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
