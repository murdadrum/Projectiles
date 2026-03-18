
# ProjecTiles

This repo is the production source for ProjecTiles (Figma prototyping is complete; no UI sync is used).

## Deploying to Firebase Hosting

Build the production bundle:

```
npm run build
```

Deploy to Firebase Hosting (project from `.firebaserc`):

```
firebase deploy --only hosting
```

  ## Running the code

  Run `npm i` to install the dependencies.

  Run `npm run dev` to start the development server.

## Testing

### Playwright (E2E + a11y)

Install browsers once:

```
npx playwright install
```

Run the baseline suite:

```
npm run test:e2e
```

### Pytest (repo contracts)

```
python -m pip install -r requirements-dev.txt
pytest
```

## CI/CD + Lighthouse

The workflows in `.github/workflows/ci.yml` and `.github/workflows/lighthouse.yml` run
tests and generate Lighthouse baselines for the QuarterMaster dashboard. They also
update the Test Run dashboard from CI test results.

Required GitHub Secrets:
- `FIREBASE_TOKEN` (from `firebase login:ci`)

Manual Lighthouse run:
```
node scripts/update-quartermaster.mjs --reportsDir=reports --url=https://joshbarteaux.com/ --device=\"Mobile (Lighthouse default throttling)\" --runs=3 --notes=\"Local run\"
```

## Dashboards

QuarterMaster (performance baseline):
- Public URL: `https://joshbarteaux.com/QuarterMaster-PerformanceDashboard.html`
- Source file: `public/QuarterMaster-PerformanceDashboard.html`
- Updated by: `.github/workflows/lighthouse.yml` after Lighthouse runs (3x) and before deploy.

Test Run Dashboard (CI test status):
- Public URL: `https://joshbarteaux.com/Test-Run-Dashboard.html`
- Source file: `public/Test-Run-Dashboard.html`
- Updated by: `.github/workflows/ci.yml` and `.github/workflows/lighthouse.yml` using `scripts/update-test-dashboard.mjs`.

Embedded tiles:
- Tile 7 embeds QuarterMaster.
- Tile 14 embeds the Test Run Dashboard.

## Best Practices, Policies & Procedures (P&P)

### CI/CD Policies
- **All merges to `main` must be green.** Do not deploy if CI or Lighthouse jobs fail.
- **No secrets in repo.** Only use GitHub Secrets (e.g., `FIREBASE_TOKEN`).
- **Artifacts are ephemeral.** Treat uploaded reports as transient; the source of truth is the dashboards and the repo.

### Operational Best Practices
- **Run Lighthouse from CI only.** Local Lighthouse runs are useful for debugging but should not overwrite baseline data unless explicitly intended.
- **Use 3 runs for stability.** The workflow averages 3 runs to smooth variance.
- **Mobile first.** The baseline is captured with Lighthouse mobile settings by default.
- **Keep dashboards static.** Dashboards are updated by CI scripts and committed as build artifacts during deploy.

### Procedures

**Manual Lighthouse + Deploy**
1) GitHub → Actions → “Lighthouse + Deploy” → Run workflow  
2) (Optional) Override the target URL with `target_url`
3) Confirm QuarterMaster shows a new `Captured` timestamp

**Manual CI Run**
1) GitHub → Actions → “CI” → Run workflow  
2) Confirm Test Run Dashboard shows updated totals and captured timestamp

**Local Validation (optional)**
1) `npm install`
2) `npx playwright install`
3) `npm run test:e2e`
4) `python -m pip install -r requirements-dev.txt`
5) `pytest`

### Troubleshooting
- **Lighthouse fails with preset error:** ensure workflow uses `--preset=perf --form-factor=mobile`.
- **Dashboards show sample values:** re-run the corresponding workflow and confirm deploy completed.
- **QuarterMaster banner shows placeholder:** ensure the `capturedAt` field updated from `TBD`.
  
