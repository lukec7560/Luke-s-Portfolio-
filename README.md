# Luke Collier Portfolio

An accessibility-focused static portfolio built with HTML, CSS, and JavaScript.

## Local preview

No build step is required. Serve the repository root with any static web server:

```bash
npx serve .
```

Then open `http://localhost:3000`, or use the URL printed by the server.

## Deploy to Vercel

### Git integration

1. Import this repository at [vercel.com/new](https://vercel.com/new).
2. Leave the framework preset as `Other`.
3. Leave the root directory as the repository root.
4. Leave the build command and output directory empty.
5. Select **Deploy**.

Every push to `main` will update production. Pull requests and other branches will receive preview deployments automatically.

### Vercel CLI

```bash
npx vercel
```

Use `npx vercel --prod` when you are ready to deploy directly to production.

No environment variables are required.

## Deployment configuration

`vercel.json` enables clean URLs and adds baseline security headers. The site remains a zero-build static deployment, so Vercel serves `index.html`, `styles.css`, and `script.js` directly from its CDN.
