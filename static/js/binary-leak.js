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

    class Particle {
        constructor(x, y, type = 'trail') {
            this.x = x;
            this.y = y;
            this.life = 1.0;
            this.char = Math.random() > 0.5 ? '1' : '0';

            // Chaotic movement
            const speed = Math.random() * 0.4 + 0.1;
            const angle = Math.random() * Math.PI * 2;

            this.vx = Math.cos(angle) * speed;
            this.vy = Math.sin(angle) * speed;

            this.size = Math.random() * 10 + 8; // 8-18px

            // Persistent idle particles move slightly outward from mouse center if "vapor"
            if (type === 'vapor' && isIdle) {
                // Calculate angle from mouse
                const angleFromMouse = Math.atan2(y - mouse.y, x - mouse.x);
                this.vx = Math.cos(angleFromMouse) * speed;
                this.vy = Math.sin(angleFromMouse) * speed;
                this.decay = 0.002; // Very slow decay for collection effect
            } else {
                this.decay = Math.random() * 0.02 + 0.015;
            }

            const palette = document.body.classList.contains('dark') ? colorsDark : colorsLight;
            this.color = palette[Math.floor(Math.random() * palette.length)];
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
