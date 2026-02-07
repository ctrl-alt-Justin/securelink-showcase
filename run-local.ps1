<#
  run-local.ps1
  Convenience script for Windows. It prefers Node (npm start), falls back to Python, otherwise opens index.html.
#>
if (Get-Command node -ErrorAction SilentlyContinue) {
  Write-Host "Starting Node server (npm start)..."
  npm start
  exit
}

if (Get-Command python -ErrorAction SilentlyContinue) {
  Write-Host "Starting Python HTTP server on port 8080..."
  python -m http.server 8080
  exit
}

if (Get-Command py -ErrorAction SilentlyContinue) {
  Write-Host "Starting Python (py) HTTP server on port 8080..."
  py -m http.server 8080
  exit
}

Write-Host "No Node or Python found. Opening index.html in default browser..."
Start-Process index.html
