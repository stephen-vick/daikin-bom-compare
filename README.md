# Daikin BOM Compare

A Daikin-branded web app for visualizing and diff-ing multiple BOM versions
(Engineering, Manufacturing, As-Built, Service) side-by-side with delta analysis.

Built as a React/TypeScript SPA that can be iFrame-embedded inside Prophecy MDM.

---

## Quick Start

```bash
npm install
npm start
```

Open [http://localhost:3000](http://localhost:3000)

---

## Project Structure

```
src/
├── types/
│   └── bom.ts              # Core TypeScript interfaces
├── data/
│   ├── mockBoms.ts         # Sample Daikin chiller BOM data (4 versions)
│   └── diffUtils.ts        # BOM comparison/diff engine
├── components/
│   ├── BomSelector.tsx     # Dropdown to choose which BOM to compare
│   ├── BomPanel.tsx        # Single BOM tree panel (side-by-side view)
│   ├── BomTreeNode.tsx     # Recursive tree node with diff highlighting
│   ├── DiffPanel.tsx       # Unified diff view with filter + detail pane
│   └── DiffSummaryBar.tsx  # Delta summary (added/removed/modified counts)
└── App.tsx                 # Main layout: toolbar + mode switcher
```

---

## Key Features

| Feature | Status |
|---|---|
| 4 BOM types: E-BOM, M-BOM, As-Built, Service | ✅ |
| Side-by-side view | ✅ |
| Unified diff / delta view | ✅ |
| Per-node change status (added / removed / modified / unchanged) | ✅ |
| Change detail (qty, revision, supplier, material diffs) | ✅ |
| Hierarchical drill-down / expand-collapse | ✅ |
| Filter by change status | ✅ |
| Click-to-select detail pane | ✅ |
| Daikin branding + dark industrial theme | ✅ |

---

## Next Steps for Cursor

### Connect to Prophecy MDM APIs
Replace `src/data/mockBoms.ts` with real API calls:
```ts
// src/data/api.ts
const BASE = 'https://your-prophecy-tenant.profisee.app/api/v1';

export async function fetchBomVersions(orderId: string): Promise<BomVersion[]> {
  const res = await fetch(`${BASE}/members?entityId=BOM&filter=orderId eq '${orderId}'`);
  // map Prophecy entity response → BomVersion[]
}
```

### iFrame embedding in Prophecy
The app is already iframe-compatible. Deploy it and add to Prophecy as a custom
FastApp page. Pass `?orderId=XXX` as a query param.

### Add Prophecy deep-link
In `BomTreeNode.tsx`, wire the "open in Prophecy" action:
```ts
const prophUrl = `https://your-tenant.profisee.app/FastApp/Members/Detail/${node.id}`;
window.parent.postMessage({ type: 'NAVIGATE', url: prophUrl }, '*');
```

### Add more BOM sources
Extend `BomType` in `src/types/bom.ts` and add source configs in each component.

---

## Design Notes

- **Font**: Rajdhani (geometric condensed) — industrial / engineering feel
- **Color palette**: Dark navy (#080F1A base) with type-specific accent colors
  - E-BOM: Blue #3B82F6
  - M-BOM: Emerald #10B981
  - As-Built: Amber #F59E0B
  - Service: Violet #A78BFA
- **Change colors**: Modified=Amber, Added=Emerald, Removed=Red, Unchanged=Slate
