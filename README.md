
# ProjecTiles

This repo is the production source for ProjecTiles (Figma prototyping is complete; no UI sync is used).

## Deploying to Firebase Hosting

Build the production bundle:

```
npm run build
```

Deploy to Firebase Hosting (project: `remotelyamused`):

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
tests and generate Lighthouse baselines for the QuarterMaster dashboard.

Required GitHub Secrets:
- `FIREBASE_TOKEN` (from `firebase login:ci`)

Manual Lighthouse run:
```
node scripts/update-quartermaster.mjs --reportsDir=reports --url=https://remotelyamused.com/ --device=\"Mobile (Lighthouse default throttling)\" --runs=3 --notes=\"Local run\"
```
  
