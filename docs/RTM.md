# Requirements Traceability Matrix (RTM)

Scope: Baseline the current UI state for Ptlive (React + Vite) as of this commit.

## Requirements

| Req ID | Requirement | Priority | Source | Test Coverage |
| --- | --- | --- | --- | --- |
| R-001 | App loads the landing page without errors. | High | App.tsx | T-001, T-004 |
| R-002 | Header displays "josh/barteaux". | Medium | App.tsx | T-001 |
| R-003 | A 4x4 grid of 16 tiles renders. | High | App.tsx, Tile.tsx | T-001, T-005 |
| R-004 | Clicking a tile opens the modal. | High | Tile.tsx, TileModal.tsx | T-002 |
| R-005 | Modal can be closed via Escape key. | Medium | TileModal.tsx | T-002 |
| R-006 | Modal next/prev navigation advances tiles. | Medium | TileModal.tsx | T-003 |
| R-007 | Footer contact links are present (GitHub, LinkedIn). | Low | App.tsx | T-004 |
| R-008 | Accessibility scan is recorded for baseline compliance. | Medium | UI | T-006 |
| R-009 | Tile color palette contains 16 entries. | Medium | App.tsx | T-005 |
| R-010 | Tile preview images map contains 16 entries. | Medium | App.tsx | T-005 |
| R-011 | Tile info map contains 16 entries. | Medium | App.tsx | T-005 |

## Test Cases

| Test ID | Test Type | Description | Location |
| --- | --- | --- | --- |
| T-001 | Playwright E2E | Verify landing page loads, header is visible, and 16 tiles are present. | tests/e2e/app.spec.ts |
| T-002 | Playwright E2E | Open modal from tile and close via Escape. | tests/e2e/app.spec.ts |
| T-003 | Playwright E2E | Navigate to next tile within modal. | tests/e2e/app.spec.ts |
| T-004 | Playwright E2E | Validate footer links exist and use expected URLs. | tests/e2e/app.spec.ts |
| T-005 | Pytest | Validate tileColors, previewImages, and tileInfo have 16 entries. | tests_py/test_repo_contract.py |
| T-006 | Playwright A11y | Run axe scan on landing page and capture results. | tests/e2e/app.spec.ts |
