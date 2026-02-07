# Ship Log

A running log of production releases and deployments for the Brett A McCall portfolio website.

---

## [Unreleased]

### Added
- **Scheduler Page**: Dedicated landing page (`/brett`) with Calendly embed and V2 styling.

## [v1.1.2] - 2026-02-07

### Added
- **Cross-Site Leakage Protocol (CSLP)**: Enhanced interaction with `darketype` experimental site.
  - **Edge Pixels**: "Infected" pixels accumulate on edges as you interact.
  - **Cursor Glitch**: Interactive particle emission and pixel jitter when near infected zones.
- **Analytics**: Integrated PostHog for privacy-focused usage tracking.
- **Copy Update**: "Head of Product" role availability added to hero.

## [v1.2.0-beta] - 2026-01-31 (Internal Gate)

### Added
- **Client-Side Gating**: Implemented `?update=1` feature flag to toggle between Legacy and V2 designs.
- **Design System V2 ("Quietly Magnetic")**:
  - **Visuals**: Creamy paper background (`#f4f4f0`) + Near-black ink (`#111`).
  - **Typography**: Serif headlines (Editorial) + Sans-serif body (Inter/System).
  - **Layout**: 12-column grid with "Split Frame" case study layout.
- **New Components**:
  - **Split Frame**: Artifact (left) vs Meaning (right) layout for case studies.
  - **Margin Notes**: Editorial sidenotes for design decisions.
  - **Meditation Lines**: Single-sentence insights for projects.
  - **Craft Panels**: Code-like blocks for process/principles.
- **Content Structure (V2)**:
  - **Hero**: "Product Leadership for the Spatial Web".
  - **Featured Work**: TEDx, Philanthrosphere, Mural XR (rewritten with Problem/Move/Result format).
  - **Principles**: 4 key operating principles.
  - **Connect**: Simplified invitation-style footer.

### Technical Changes
- **CSS Architecture**: Added `static/css/v2-design.css` (scoped to `html.update-active`).
- **JS Logic**: Added `static/js/update-gate.js` for cookie-based toggle management.
- **DOM Structure**: `index.html` now contains both `.legacy-scope` (default) and `.update-scope` (hidden by default).

### Files Modified
- `index.html`
- `static/css/v2-design.css`
- `static/js/update-gate.js`
- `static/css/update-gate.css`

---

## [v1.1.1] - 2026-01-31

### Added
- **Binary Leak Effect**: Implemented interactive "Data Vapor" animation in Hero section
  - Canvas-based particle system with chaos-driven movement
  - **Interactivity**: Mouse trail and "idle cloud" accumulation effect
  - **Dynamic**: Particles disperse on interaction and collect when idle
  - Fully responsive and theme-aware (Dark/Light mode)



### Fixed
- **Accessibility (A11y)**: Addressed critical high-priority issues from Design Audit
  - **Skip Link**: Added "Skip to main content" link for keyboard navigation
  - **Color Contrast**: Darkened text colors (`#505050`) to meet WCAG AA standards
  - **Theme Toggle**: Added ARIA labels and state management for screen readers

### Files Modified
- `index.html`

## [v1.1.0] - 2026-01-01

### Added
- **Masonry Grid Layout**: Implemented elegant, responsive masonry grid for portfolio tiles using Colcade.js
  - Dynamic card distribution across balanced columns
  - Horizontal reading order (left-to-right, top-to-bottom)
  - Responsive breakpoints: 3 columns (desktop), 2 columns (tablet), 1 column (mobile)
  - Consistent 30px gutters maintaining visual rhythm
  - Editorial aesthetic with natural height variation from content

### Technical Changes
- Added Colcade.js library (~3KB) from CDN
- Replaced CSS Grid with masonry column system using floated `.grid-col` wrappers
- Implemented responsive column visibility management via JavaScript
- Added debounced resize handler for smooth responsive transitions
- Maintained full dark mode compatibility

### Files Modified
- `index.html` - CSS updates (lines 286-437), HTML structure (lines 551-555), JavaScript (lines 730-769)

### Browser Compatibility
- Chrome ✓
- Firefox ✓
- Safari ✓
- Edge ✓
- Mobile browsers ✓

---

## [v1.0.0] - 2024-12-XX

### Initial Release
Portfolio website launch with core features:

#### Features
- **Hero Section**: Full-width hero with profile image background, tagline, and CTA
- **About Section**: Current focus, key achievements, professional values, and current mission
- **Portfolio Grid**: 11 project cards with images, descriptions, and external links
  - TEDxAsheville
  - Mural XR Project Canvas
  - philanthrosphere®
  - TarotTED
  - My AI Journey: From 1993 to Now
  - Production: Film, Video, Podcast Portfolio
  - Winter VR Summit
  - AVL1000
  - YESYESNO Bot
  - the Listening Leadership Lab
  - Sounds Like Home
- **Connect Section**: Social links with gradient background (LinkedIn, GitHub, Medium, Twitter, Crunchbase, Book a Call)
- **Dark/Light Theme Toggle**: Persistent theme switching with localStorage and system preference detection

#### Technical Implementation
- Single-page application (SPA) design
- Inline CSS for fast loading (~440 lines)
- Vanilla JavaScript (no framework dependencies)
- Fixed header with backdrop blur
- Intersection Observer for fade-in animations
- Smooth scrolling for anchor links
- Responsive design with mobile breakpoint at 768px

#### Design System
- **Colors**:
  - Primary: #667eea (light), #764ba2 (dark)
  - Background: #fff (light), #191919 (dark)
  - Cards: white (light), #333 (dark)
- **Typography**: System font stack (-apple-system, BlinkMacSystemFont, "Segoe UI", Roboto)
- **Animations**: Fade-in (0.6s), hover transforms, theme transitions
- **Spacing**: Container max-width 1200px, sections 100px padding, cards 30px gap

---

## Release Template

Use this template for future releases:

```markdown
## [vX.X.X] - YYYY-MM-DD

### Added
- New features and capabilities

### Changed
- Updates to existing features

### Fixed
- Bug fixes and corrections

### Removed
- Deprecated or removed features

### Technical Changes
- Implementation details, dependencies, refactors

### Files Modified
- List of changed files with line ranges

### Breaking Changes
- Any changes that affect backwards compatibility

### Migration Notes
- Steps needed to upgrade from previous version

### Performance
- Load time improvements, optimization notes

### Accessibility
- A11y improvements

### SEO
- Search optimization updates
```

---

## Versioning Strategy

This project follows [Semantic Versioning](https://semver.org/):
- **Major (X.0.0)**: Breaking changes, major redesigns
- **Minor (0.X.0)**: New features, significant enhancements
- **Patch (0.0.X)**: Bug fixes, minor tweaks, content updates

---

## Deployment Checklist

Before each release:

- [ ] Test across all major browsers (Chrome, Firefox, Safari, Edge)
- [ ] Test on mobile devices (iOS Safari, Chrome Mobile)
- [ ] Verify dark mode toggle functionality
- [ ] Check all external links are working
- [ ] Validate HTML (W3C validator)
- [ ] Test responsive breakpoints (desktop, tablet, mobile)
- [ ] Verify images load correctly
- [ ] Check console for JavaScript errors
- [ ] Test smooth scrolling and animations
- [ ] Review git diff for unintended changes
- [ ] Update version number in footer (if applicable)
- [ ] Update SHIP_LOG.md with release notes
- [ ] Create git tag for version
- [ ] Deploy to production
- [ ] Verify production deployment
- [ ] Update any dependent documentation

---

## Rollback Procedure

If issues are discovered after deployment:

1. Identify the issue and severity
2. If critical: revert to previous git tag/commit
3. If minor: create hotfix branch
4. Test fix locally
5. Deploy fix as patch version
6. Document in SHIP_LOG.md under "Fixed" section

---

## Performance Benchmarks

Track key metrics for each release:

| Version | First Paint | DOMContentLoaded | Full Load | Lighthouse Score |
|---------|-------------|------------------|-----------|------------------|
| v1.1.0  | TBD         | TBD              | TBD       | TBD              |
| v1.0.0  | TBD         | TBD              | TBD       | TBD              |

---

## Known Issues

Current known issues and planned fixes:

### v1.1.0
- None currently identified

### Backlog
- Consider extracting inline CSS to external stylesheet for better cacheability
- Add loading states for external link cards
- Implement progressive image loading for portfolio images
- Add analytics tracking
- Consider adding a blog section
- Add resume/CV download link

---

## Contact & Support

For issues, questions, or suggestions:
- GitHub Issues: [Create an issue](https://github.com/bmccall17/portfolio/issues)
- Email: [Contact via website](https://www.betterthanunicorns.com/brett)
- LinkedIn: [Brett A McCall](https://www.linkedin.com/in/brettmccall)
