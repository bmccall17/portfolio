# Task: Implement "Binary Leak" Visual Effect (Refined V2) [COMPLETED]

## Context
The user requested a refined "Binary Leak Effect" to be more subtle and interactive. The previous "Matrix rain" was too aggressive.

## Objectives
1.  **Refine Visual Style**: Change from "falling rain" to "leaking/vaporous" (fading, shrinking, shimmering).
2.  **Global Scope**: Apply the effect globally (across the site) without interfering with interactions.
3.  **Mouse Interaction**:
    *   **Trailing Tail**: Cursor leaves a trail of 0s and 1s.
    *   **Inactive State**: Leaking intensity increases around the cursor when it stops moving.
4.  **Performance Check**: Ensure `pointer-events: none` is used so it doesn't block clicks.

## Implementation Steps
1.  **Update `index.html`**:
    *   Move canvas to `<body>` level (fixed position, full screen).
    *   Ensure z-index is very low (-1 or just above background).
2.  **Rewrite `static/js/binary-leak.js`**:
    *   **Particle System**: Create a `Particle` class (x, y, velocity, opacity, size).
    *   **Mouse Tracking**: Track mouse x/y and speed/activity status.
    *   **Spawning Logic**:
        *   Spawn particles on mouse move (trail).
        *   Spawn particles around mouse when idle (leak).
        *   Spawn random ambient particles (vapor).
    *   **Animation**: Particles float (up/down/drift), shrink, and fade.
3.  **Styling**:
    *   Colors: Brand colors + variations for "glimmer".

## Verification
*   Effect is visible across all sections.
*   Mouse movement creates a trail.
*   Stopping the mouse increases "leaking".
*   Site is still clickable and interactive.
