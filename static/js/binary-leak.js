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

    // CSLP: Edge Pixel Logic
    const edgePixelSize = 12; // Square size
    const edgePixelColor = '#00ff41'; // Matrix Green
    let edgePixelCount = 0;
    const MAX_EDGE_PIXELS = 200; // Limit to prevent DOM overload
    let edgePixelElements = []; // Track explicitly for effects

    // Initialize initial accumulation based on infection level
    if (infectionLevel > 0) {
        initEdgePixels(infectionLevel);
    }

    function initEdgePixels(level) {
        const density = Math.floor((window.innerHeight / edgePixelSize) * 2 * level * 0.5); // 50% coverage at level 1.0
        for (let i = 0; i < density; i++) {
            spawnEdgePixel(Math.random() > 0.5 ? 'left' : 'right', Math.random() * window.innerHeight, true);
        }
    }

    function spawnEdgePixel(side, y, isInit = false) {
        if (edgePixelCount > MAX_EDGE_PIXELS) return; // Cap

        // Probability check (if not init) - higher infection = higher chance to stick
        if (!isInit && Math.random() > infectionLevel) return;

        const a = document.createElement('a');
        a.href = "https://bmccall17.github.io/";
        a.className = "darketype-pixel"; // For potential CSS cleanup
        a.style.position = 'fixed';
        a.style.top = `${Math.floor(y / edgePixelSize) * edgePixelSize}px`; // Snap to grid
        a.style.width = `${edgePixelSize}px`;
        a.style.height = `${edgePixelSize}px`;
        a.style.backgroundColor = edgePixelColor;
        a.style.opacity = Math.random() * 0.5 + 0.3; // Variable opacity for "glitch" look
        a.style.zIndex = '9998'; // Below button, above content
        a.style.cursor = 'pointer';
        a.style.transition = 'opacity 0.1s, transform 0.3s'; // Slower transform for eerie float

        // Side positioning
        if (side === 'left') {
            a.style.left = `${(Math.random() * 5)}px`; // Slight scatter
        } else {
            a.style.right = `${(Math.random() * 5)}px`;
        }

        // Hover Effect
        a.onmouseover = () => { a.style.opacity = '1'; a.style.boxShadow = `0 0 5px ${edgePixelColor}`; };
        a.onmouseout = () => { a.style.opacity = '0.5'; a.style.boxShadow = 'none'; };

        document.body.appendChild(a);
        edgePixelCount++;
        edgePixelElements.push({ el: a, y: y, side: side });
    }

    function handleEdgeEffects() {
        // Only run if mouse is active
        if (mouse.x < -50) return;

        const isLeft = mouse.x < 80;
        const isRight = mouse.x > width - 80;

        if (isLeft || isRight) {
            // Cursor Corruption: Spawn Glitch Particles
            if (Math.random() > 0.7) { // 30% chance per frame
                // Spawn small green squares from cursor
                const p = new Particle(mouse.x, mouse.y, 'vapor');
                p.isGlitch = true;
                p.color = '#00ff41';
                p.size = Math.random() * 4 + 2;
                p.vx = (Math.random() - 0.5) * 10; // High speed explode
                p.vy = (Math.random() - 0.5) * 10;
                p.life = 0.5; // Short life
                particles.push(p);
            }

            // Pixel Jitter
            const targetSide = isLeft ? 'left' : 'right';

            // Loop through pixels and jitter those near mouse Y
            for (let i = 0; i < edgePixelElements.length; i++) {
                const pixel = edgePixelElements[i];
                if (pixel.side !== targetSide) {
                    // Reset others
                    if (pixel.el.style.transform !== '') pixel.el.style.transform = '';
                    continue;
                }

                const distY = Math.abs(mouse.y - pixel.y);
                if (distY < 300) { // Proximity check (Doubled)
                    // Jitter intensity based on distance
                    const intensity = (300 - distY) / 10 * 0.17; // Reduced by 83%
                    const tx = (Math.random() - 0.5) * intensity;
                    const ty = (Math.random() - 0.5) * intensity;
                    pixel.el.style.transform = `translate(${tx}px, ${ty}px)`;
                    pixel.el.style.opacity = '1'; // Light up
                } else {
                    if (pixel.el.style.transform !== '') pixel.el.style.transform = '';
                    if (pixel.el.style.opacity === '1') pixel.el.style.opacity = '0.5'; // Revert opacity logic roughly
                }
            }
        } else {
            // Reset all if far from edges
            if (edgePixelElements.length > 0 && edgePixelElements[0].el.style.transform !== '') {
                edgePixelElements.forEach(p => {
                    p.el.style.transform = '';
                    p.el.style.opacity = '0.5'; // Soft reset
                });
            }
        }
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

            // CSLP: Edge Collision & Accumulation
            // If particle hits left or right edge, potential to become a pixel
            if (this.x <= 0) {
                spawnEdgePixel('left', this.y);
                this.life = 0; // Kill particle
            } else if (this.x >= width) {
                spawnEdgePixel('right', this.y);
                this.life = 0; // Kill particle
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

            // Update Storage (Throttled)
            if (Math.random() > 0.95) {
                localStorage.setItem('darketype_infection_level', infectionLevel.toFixed(4));
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
        handleEdgeEffects(); // Run cursor/edge interaction logic

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
