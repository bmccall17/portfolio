---
description: Standardized process for implementing new features under Antigravity guardrails.
---

# Feature Implementation Workflow

This workflow ensures that every feature is planned, compliant, and verified before it is considered "done".

## 0. Repo Sync Gate (User Action)
- [ ] Ask the user to Fetch/Pull before implementation begins.
- [ ] Before finalizing, ask the user to Fetch/Pull again before Push (prevents divergence).

## 1. Planning Phase (Level 1: Observer)
-   [ ] **Review Requirements**: Understand the user's request.
-   [ ] **Check Standards**: usage `grep_search` to find relevant patterns in `DESIGN_AUDIT.md` or similar tokens in the codebase.
-   [ ] **Create Plan**: Create or update `implementation_plan.md` in the artifacts directory.
    -   Define the goal.
    -   List Modified/New files.
    -   **Constraint**: If in Level 2, restrict scope to *essential* files only.

## 2. Implementation Phase (Level 2/3)
-   [ ] **Create Task**: Update `task.md` with granular steps.
-   [ ] **Write Code**:
    -   Use existing CSS variables (No magic hex codes!).
    -   Adhere to Semantic HTML (Use `<button>`, NOT `<div onClick>`).
-   [ ] **Iterate**:
    -   If Level 2: Request confirmation (`notify_user`) before key file writes if unsure.
    -   If Level 3: Proceed with confidence.

## 3. Verification Phase (Level 1/2/3)
-   [ ] **Audit Accessibility**:
    -   Check color contrast.
    -   Ensure keyboard navigability.
    -   Verify ARIA labels.
-   [ ] **Performance Check**:
    -   Did we introduce heavy assets? (Images must be WebP).
    -   Did we add blocking JS?

## 4. Documentation Phase (Level 2/3)
-   [ ] **Update Log**: Add an entry to `SHIP_LOG.md` under `[Unreleased]`.
    -   Format: `- **Feature Name**: Description of change.`
-   [ ] **Walkthrough**: Create a `walkthrough.md` artifact with screenshots (if UI) or code snippets.
