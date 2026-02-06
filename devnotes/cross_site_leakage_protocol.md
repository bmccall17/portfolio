# Cross-Site Leakage Protocol (CSLP)

**Status**: DRAFT v1.0
**Target**: `bmccall17.github.io` (Darketype) <-> `brettamccall.com` (Portfolio)

## Purpose
To establish a subtle, synchronized visual connection between the polished portfolio and the messy "Darketype" playground. The two sites should feel like different interfaces for the same underlying system.

## 1. The Shared Aesthetic (The Leak)
The "Leak" is defined by:
-   **Binary Cipher**: Text occasionally flipping to 0s and 1s.
-   **Singularity Physics**: The canvas-based particle effect (optional on the portfolio side, potentially as a footer or hero background).
-   **Glitch Links**: Specific anchor tags that trigger visual distortion.

## 2. Integration for `brettamccall.com` (Hugo)

Since the portfolio is a Hugo site, follow these integration steps:

### A. Asset Migration
1.  Copy `bmccall17.github.io/scripts/singularity.js` -> `portfolio/static/js/singularity.js`.
2.  Copy `bmccall17.github.io/css/singularity.css` -> `portfolio/static/css/singularity.css`.
3.  Ensure you have corresponding assets (or new ones) for the "clean" and "chaos" layers in `portfolio/static/assets/`.

### B. JavaScript Adaptation
Modify the `singularity.js` in the Portfolio repo to be "quieter".
-   Reduce `jitterSpeed` by default (e.g., `0.0005`).
-   Reduce `jitterAmount`.
-   The portfolio should feel *stable* with only minor tremors, whereas Darketype is volatile.

### C. State Awareness via URL Parameters
When linking from Portfolio to Darketype (and vice versa), pass the current "entropy" level.

**Url Pattern:**
`https://bmccall17.github.io/darketype?entropy=0.5&origin=portfolio`

**Implementation:**
Add this snippet to `portfolio/layouts/partials/head.html` (or footer):

```javascript
// CSLP: Read and Apply Entropy
const params = new URLSearchParams(window.location.search);
const incomingEntropy = params.get('entropy');

if (incomingEntropy) {
    console.log('CSLP: Syncing entropy from Darketype:', incomingEntropy);
    // If you have the singularity script loaded:
    if (window.config) window.config.jitterSpeed = parseFloat(incomingEntropy) * 0.001;
}

// CSLP: Outbound Links
document.querySelectorAll('a[href*="bmccall17.github.io"]').forEach(link => {
    link.addEventListener('click', (e) => {
        const currentEntropy = document.getElementById('jitterSlider')?.value || 17;
        const url = new URL(link.href);
        url.searchParams.set('entropy', currentEntropy);
        link.href = url.toString();
    });
});
```

### D. The "Wormhole" Component
Create a specific "Portals" section in the portfolio (e.g., in `content/_index.md` or a dedicated partial).

**Visual:** A terminal-like block that looks out of place in the polished design.
**Behavior:**
-   Displays the current "Mess Level" (fetch `heatmap.json` from Darketype repo if possible, or just mock it based on Date).
-   Link text: `[ access_darketype_v0.1 ]`

## 3. Shared Resources (Do Not Duplicate Logic)
Ideally, we host the "Leak Core" JS on the GitHub Pages site and load it via CDN in the Portfolio to ensure they stay in sync.

**Proposed CDN URL:**
`https://bmccall17.github.io/scripts/leak_core.js` (To be created)

For now, manual copying is acceptable for v0.1.

## 4. Immediate Action Items
1.  Create `static/js/leak_listener.js` in the Portfolio repo with the snippet above.
2.  Add a generic "glitch" CSS class to the Portfolio's main stylesheet that mimics the Darketype specific headers.
3.  Add the "Wormhole" link to the Portfolio footer.
