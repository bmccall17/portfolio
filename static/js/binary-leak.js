console.log('[BinaryLeak] Script loaded');

document.addEventListener('DOMContentLoaded', () => {
    console.log('[BinaryLeak] DOMContentLoaded fired');

    const canvas = document.getElementById('binary-leak');
    if (!canvas) {
        console.error('[BinaryLeak] Canvas element #binary-leak NOT found in DOM');
        return;
    }
    console.log('[BinaryLeak] Canvas found', canvas);

    const ctx = canvas.getContext('2d');
    let width, height;
    let columns = [];
    const fontSize = 16;

    // Configuration
    const chars = '01';
    const colorsLight = ['#667eea', '#764ba2', '#a3bffa'];
    const colorsDark = ['#764ba2', '#a3bffa', '#ffffff'];

    function getColors() {
        const isDark = document.body.classList.contains('dark');
        console.log('[BinaryLeak] Theme check. Dark mode:', isDark);
        return isDark ? colorsDark : colorsLight;
    }

    function resize() {
        width = canvas.width = canvas.offsetWidth;
        height = canvas.height = canvas.offsetHeight;
        console.log(`[BinaryLeak] Resized to ${width}x${height}`);

        const columnCount = Math.floor(width / fontSize);
        columns = [];
        for (let i = 0; i < columnCount; i++) {
            columns[i] = Math.random() * -100;
        }
    }

    function animate() {
        const isDark = document.body.classList.contains('dark');
        ctx.fillStyle = isDark ? 'rgba(25, 25, 25, 0.1)' : 'rgba(229, 229, 229, 0.1)';
        ctx.fillRect(0, 0, width, height);

        const currentColors = getColors();
        ctx.font = `${fontSize}px monospace`;

        for (let i = 0; i < columns.length; i++) {
            const char = chars[Math.floor(Math.random() * chars.length)];
            ctx.fillStyle = currentColors[Math.floor(Math.random() * currentColors.length)];
            ctx.fillText(char, i * fontSize, columns[i] * fontSize);

            if (columns[i] * fontSize > height && Math.random() > 0.98) {
                columns[i] = 0;
            }
            columns[i]++;
        }

        requestAnimationFrame(animate);
    }

    // Initialize
    resize();
    animate();
    console.log('[BinaryLeak] Animation loop started');

    window.addEventListener('resize', resize);
});
