---
description: Checklist and procedure for preparing a production release.
---

# Release Preparation Workflow

Follow this procedure when moving from `[Unreleased]` to a versioned release (e.g., v1.1.0 -> v1.2.0).

## 1. Pre-Flight Checks
-   [ ] **Browser Check**: Manually verify (or ask user to verify) on:
    -   Chrome / Firefox / Safari.
    -   Mobile (Responsive breakpoints).
-   [ ] **Dark Mode**: Toggle theme and verify contrast/visibility.
-   [ ] **Links**: Verify all new external links work.

## 2. Versioning
-   [ ] **Determine Version**:
    -   *Major*: Breaking changes?
    -   *Minor*: New features (backwards compatible)?
    -   *Patch*: Bug fixes only?
-   [ ] **Update Files**:
    -   `package.json` (if applicable).
    -   Footer version label (if hardcoded).

## 3. The Ship Log
-   [ ] **Finalize Entry**: Move items from `[Unreleased]` to `## [vX.Y.Z] - YYYY-MM-DD`.
-   [ ] **Technical Notes**: Add a "Technical Changes" section if significant refactoring occurred.
-   [ ] **Stats**: Update "Performance Benchmarks" table if new data is available.

## 4. Git Tagging (User Action)
-   [ ] **Notify User**: "Release prep complete. Ready for you to tag and push."
    -   Command: `git tag -a vX.Y.Z -m "Release vX.Y.Z"`
    -   Command: `git push origin vX.Y.Z`
