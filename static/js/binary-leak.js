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
            this.life = 1.0; // 1.0 to 0.0
            this.char = Math.random() > 0.5 ? '1' : '0';

            // "Vapor" movement - float slightly up or down, erratic horizontal
            const speed = Math.random() * 0.5 + 0.2;
            const angle = Math.random() * Math.PI * 2;

            this.vx = (Math.random() - 0.5) * 0.5; // Slight drift
            this.vy = type === 'vapor' ? -speed : (Math.random() - 0.5) * 0.5; // Up for vapor, random for static

            this.size = Math.random() * 10 + 8; // 8-18px
            this.decay = Math.random() * 0.02 + 0.01;

            const palette = document.body.classList.contains('dark') ? colorsDark : colorsLight;
            this.color = palette[Math.floor(Math.random() * palette.length)];
        }

        update() {
            this.x += this.vx;
            this.y += this.vy;
            this.life -= this.decay;
            this.size *= 0.98; // Shrink
        }

        draw(ctx) {
            ctx.globalAlpha = this.life;
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

        // Trail Effect
        if (dist > 2) {
            spawnParticle(mouse.x, mouse.y, 'trail');
            mouse.lastMove = now;
            isIdle = false;
        }

        // Idle Detection (>200ms stop)
        if (now - mouse.lastMove > 200) {
            isIdle = true;
        }

        // Idle Leaking Effect
        if (isIdle && mouse.x > 0) {
            // Spawn more when idle
            if (Math.random() > 0.8) {
                const offsetX = (Math.random() - 0.5) * 40;
                const offsetY = (Math.random() - 0.5) * 40;
                spawnParticle(mouse.x + offsetX, mouse.y + offsetY, 'vapor');
            }
        }

        // Random Ambient Vapor (Background)
        if (Math.random() > 0.95) {
            spawnParticle(Math.random() * width, Math.random() * height, 'vapor');
        }

        mouse.lastX = mouse.x;
        mouse.lastY = mouse.y;
    }

    function animate() {
        ctx.clearRect(0, 0, width, height); // Clear frame

        handleMouse();

        // Update and draw particles backwards to remove safely
        for (let i = particles.length - 1; i >= 0; i--) {
            const p = particles[i];
            p.update();
            p.draw(ctx);

            if (p.life <= 0 || p.size < 1) {
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

    // Start
    resize();
    animate();
});
