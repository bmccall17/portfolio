# Task: Implement "Binary Leak" Visual Effect [COMPLETED]

## Context
The user requested a "Binary Leak Effect" to add dynamic, "fun" aesthetics to the portfolio, likely reinforcing the AI/Tech brand. This will be implemented as a canvas-based animation in the Hero section.

## Objectives
1.  **Create Visual Effect**: Implement a Matrix-style binary rain/leak animation using HTML5 Canvas.
2.  **Integrate into Hero**: Position the effect behind the hero content but above the background image (or blended with it).
3.  **Theme Awareness**: Ensure the effect respects the light/dark mode (e.g., dark binary in light mode, bright binary in dark mode? Or maybe always "cyber" green/purple). *Decision*: Let's use the brand colors (`#667eea`, `#764ba2`) for the binary text to match the site aesthetic, rather than generic Matrix green.
4.  **Performance**: Ensure it pauses when not in viewport (IntersectionObserver).

## Implementation Steps
1.  **Create `static/js/binary-leak.js`**:
    *   Setup Canvas context.
    *   Create `BinaryStream` class or functional equivalent.
    *   Animation loop.
    *   Resize handling.
2.  **Modify `index.html`**:
    *   Add `<canvas id="binary-leak"></canvas>` to `.hero`.
    *   Import the script.
    *   Add necessary CSS (absolute positioning).
3.  **Styling**:
    *   Ensure z-index is correct (behind text, above bg).
    *   Handle opacity/blending.

## Verification
*   Visual check: "Leak" effect appears in Hero.
*   Performance check: Smooth 60fps, no layout thrashing.
*   Responsiveness: Adapts to window resize.
