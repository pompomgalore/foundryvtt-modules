# foundryvtt-modules

This repository hosts a static GitHub Pages site that displays Foundry VTT modules.

## Development

```bash
npm install
npm run dev
```

## Build

```bash
npm run build
```

This will:
1. Compile TypeScript and Vue components
2. Build the static site to the `docs/` directory
3. Generate `public/manifest.json` listing all available modules

## Deployment

The site is automatically deployed to GitHub Pages when changes are pushed to the `main` branch via the `.github/workflows/deploy-pages.yml` workflow.

### GitHub Pages SPA Routing

This site uses Vue Router with browser history mode. To support direct URL access and page refreshes on GitHub Pages:
- `public/404.html` - Captures 404 errors and redirects to the base URL while preserving the path in sessionStorage
- `index.html` - Retrieves the stored path from sessionStorage and updates the browser history before Vue Router initializes

This allows URLs like `https://pompomgalore.github.io/foundryvtt-modules/module/dngnr-XXX` to work correctly when accessed directly or refreshed.
