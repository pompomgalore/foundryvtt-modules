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
3. Generate `modules.json` listing all available modules

## Deployment

The site is automatically deployed to GitHub Pages when changes are pushed to the `main` branch via the `.github/workflows/deploy-pages.yml` workflow.
