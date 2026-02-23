# Daikin BOM Compare / Diff Portal (MVP Scaffold)

This repository now contains a local scaffold of the Daikin BOM Portal described in the handoff document.

## What this scaffold includes

- React + TypeScript + Vite app bootstrapped in this workspace
- Mock data adapters reading from:
  - `data/daikin_ct_installed_base_large.json`
  - `data/daikin_ct_product_master_large.json`
- BOM panel shell with expandable tree nodes
- Side-by-side BOM versions and baseline tree diff summary
- Record detail drawer shell and placeholder deep link button
- Store/hooks/utils structure aligned to the handoff architecture

## Run locally

```bash
npm install
npm run dev
```

Then open the local Vite URL (typically `http://localhost:5173`).

## Build

```bash
npm run build
npm run preview
```

## Current known gaps (intentionally deferred)

- Live Profisee API integration and auth token handoff via `postMessage`
- Virtualized large-tree rendering and performance tuning
- CSV/PDF export implementation
- Full search/filtering and Service BOM inline edit workflows
- Accessibility hardening and automated WCAG validation
