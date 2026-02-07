# Triple A — Minimal Dark Product Showcase

Open the `index.html` file in a browser to view the static showcase, or run a local static server (recommended) so smooth-scroll and SPA routing work correctly.

Run locally (options):

- Option A — Node (recommended if you have Node installed):

```powershell
cd "d:/SecureLink Showcase"
npm install    # optional, no deps required
npm start      # runs the included server.js on port 8080
# then open http://localhost:8080
```

- Option B — Python (if Node not available):

```powershell
cd "d:/SecureLink Showcase"
python -m http.server 8080
# or: py -m http.server 8080
# then open http://localhost:8080
```

- Option C — PowerShell helper (Windows):

```powershell
cd "d:/SecureLink Showcase"
.\\run-local.ps1

# The script prefers Node (npm start), falls back to Python, otherwise opens index.html in your browser.
```

Files added:
- index.html — main page
- css/styles.css — dark styles
- js/script.js — small interactions (tilt + smooth scroll)
- server.js — zero-dependency Node static server
- package.json — contains `npm start` script
- run-local.ps1 — PowerShell convenience script (Windows)

If you want, I can:
- add real product images
- wire up a simple static server with live-reload
- export as a single-page deployable bundle
