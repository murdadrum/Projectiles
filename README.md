# ProjecTiles

This is a code bundle for ProjecTiles. The original app is available at https://projectiles.figma.site.

## Running the code

Run `npm i` to install the dependencies.

Run `npm run dev` to start the development server.

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
