## QA Test Plan — REQ-011 Quality Engineering & Automation

### Scope
- Core UI rendering (grid, tiles, modal)
- Tile interactions (open/close modal, navigation)
- Accessibility baselines (labels, dialog semantics)
- SEO baselines (metadata presence)

### Test Types
- Unit: component rendering and core UI logic
- Integration: modal content wiring and link behavior
- E2E: smoke tests for page load and modal flow

### Tooling
- Unit/Integration: Vitest + Testing Library
- E2E: Playwright
- Accessibility: axe (manual/CI as needed)

### CI Gates
- `npm run test:ci` (coverage enforced)
- `npm run test:e2e`
- `npm run build`

### Entry Criteria
- Dependencies installed
- Local dev server runnable

### Exit Criteria
- All tests pass
- Coverage thresholds met
- No critical/serious accessibility violations in smoke flows

### Current Status (January 30, 2026)
- Playwright and Vitest configured
- Smoke E2E tests implemented and passing
- CI workflow added to run tests
- Visual regression and scheduled regression pending
