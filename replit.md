# Tanda Forge

## Project Overview

Tanda Forge is a desktop application for Argentine Tango DJs. It is built with Electron and TypeScript, and is designed for preparing and playing tandas (sets of tango music).

This is a GitHub import running in Replit. Since Electron cannot run natively in the browser environment, a static Node.js HTTP server (`server.js`) serves the compiled renderer HTML as a web preview at port 5000.

## Architecture

- **Runtime**: Electron (desktop app) — preview served via static Node.js server
- **Language**: TypeScript
- **Main process**: `app/src/main/` — Electron main process, SQLite database, file scanning, audio analysis
- **Renderer**: `app/src/renderer/` — Browser-side UI (vanilla TypeScript, HTML, CSS)
- **Preload**: `app/src/preload/` — Electron preload scripts
- **Shared**: `app/src/shared/` — Shared types/utilities
- **Database**: `better-sqlite3` for local SQLite storage

## Build System

- TypeScript compiled with `tsc` using two tsconfig files:
  - `tsconfig.main.json` — CommonJS output for Electron main process → `dist/main/`
  - `tsconfig.renderer.json` — ES module output for browser renderer → `dist/renderer/`
- `scripts/copy-renderer-assets.js` copies HTML/CSS/JS assets to `dist/renderer/`

## Key Commands

```bash
npm run build       # Compile TypeScript + copy assets
npm test            # Run vitest unit tests (88 tests)
npm start           # Launch Electron app (requires desktop)
npm run package     # Build installable binary
```

## Testing

- **Unit tests**: vitest — 88 tests, all passing
- **E2E tests**: Playwright (requires Electron)

## Replit Setup

- **Workflow**: `node server.js` on port 5000 (webview)
  - Serves the compiled renderer HTML as a static preview
  - The full app requires Electron desktop environment
- **Deployment**: autoscale, build with `npm run build`, run with `node server.js`

## Dependencies

- `better-sqlite3`: SQLite bindings (native module, requires electron-rebuild)
- `electron`: Desktop runtime
- `electron-builder`: Packaging tool
- `typescript`: Compiler
- `vitest`: Unit testing framework
- `@playwright/test`: E2E testing

## Notes

- Requires Node.js >= 22.12.0 (currently running on v20.20.0 with warnings but functional)
- The preview in Replit shows the renderer HTML/CSS only — IPC calls to the Electron main process will not function in the browser preview
- Full functionality (audio playback, file scanning, database) requires the Electron desktop app
