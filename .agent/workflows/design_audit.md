---
description: Periodic audit workflow to enforce design and accessibility standards.
---

# Design & Accessibility Audit Workflow

Run this workflow when asked to "Audit" or "Review" the codebase quality.

## 1. Accessibility (WCAG 2.1 AA)
-   **Contrast**: Check all text/background combinations.
-   **Semantics**:
    -   Are headings (`h1`-`h6`) in correct order?
    -   Do images have `alt` text? (Decorative images should have `alt=""`).
    -   Are interactive elements focusable?

## 2. Code Quality
-   **CSS Variables**: Run `grep_search` for hex codes.
    -   *Fail*: `#667eea` (Should be `var(--primary)`).
-   **Hardcoded Strings**:
    -   Are repeated strings compliant with the copy guidelines?

## 3. Reporting
-   **Output**: Update or create `DESIGN_AUDIT.md`.
-   **Format**:
    -   **Issue**: [Description]
    -   **Priority**: HIGH / MEDIUM / LOW
    -   **Fix**: [Code suggestion]
