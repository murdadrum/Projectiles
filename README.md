# ProjecTiles

This is a code bundle for ProjecTiles. The original app is available at https://projectiles.figma.site.

## Running the code

Run `npm i` to install the dependencies.

Run `npm run dev` to start the development server.

## UI sync on build

This project syncs UI assets from `https://github.com/murdadrum/Ptlive` before every build.

- Manual sync: `npm run sync-ui`
- Automatic sync: `npm run build` (via `prebuild`)

Optional environment variables:

- `PTLIVE_UI_REPO` (default: `https://github.com/murdadrum/Ptlive`)
- `PTLIVE_UI_REF` (default: `main`)

## Deploying to Firebase Hosting

Build the production bundle:

```
npm run build
```

Deploy to Firebase Hosting (project: `remotelyamused`):

```
firebase deploy --only hosting
```

If authentication expires, re-authenticate:

```
firebase login --reauth
```

## Security notes

- Do not commit secrets. Use local `.env` files for any tokens/keys.
- Keep production credentials in your hosting provider (Firebase/GCP) env config.
