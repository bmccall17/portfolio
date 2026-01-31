---
trigger: always_on
---

> **User Preferences & Style Guide for this Repo**
based off ".agent\ANTIGRAVITY_RULES_PORTFOLIO.md", changes to these rules should be continously updated here AND in that file.

### Coding Style
-   **Stack**: Hugo (Static Site Generator) + React (availability via Vite/Islands if applicable) + Vanilla CSS.
-   **CSS**: No frameworks (Tailwind, Bootstrap). Use CSS Variables found in `assets/css/` (or inline if legacy).
-   **Files**: Hugo content lives in `content/`. Layouts in `layouts/`.

### Behavior
-   **Output Rules**: Always output this project-specific ruleset when asked for context or rules.
-   **Review**: Suggest updates to `DESIGN_AUDIT.md` and `SHIP_LOG.md` when completing relevant tasks.

### Git / Publishing
- `main` = production.
- AG does not run Git operations unless I explicitly grant permission.
- AG must prompt me to Fetch/Pull before starting risky edits and again before I Push.
