$ErrorActionPreference = "Stop"
Set-Location $PSScriptRoot
$missing = @()
$node = Get-Command node -ErrorAction SilentlyContinue
if (!$node) { $missing += "OpenJS.NodeJS.LTS" } else {
  node -e 'process.exit(Number(process.versions.node.split(".")[0])>=22?0:1)'
  if ($LASTEXITCODE -ne 0) { $missing += "OpenJS.NodeJS.LTS" }
}
if (!(Get-Command ffmpeg -ErrorAction SilentlyContinue) -or !(Get-Command ffprobe -ErrorAction SilentlyContinue)) { $missing += "Gyan.FFmpeg" }
$pythonOK = $false
foreach ($name in @("python3", "python", "py")) {
 if (Get-Command $name -ErrorAction SilentlyContinue) {
  if ($name -eq "py") { & $name -3 -c "import sys;sys.exit(0 if sys.version_info >= (3,9) else 1)" } else { & $name -c "import sys;sys.exit(0 if sys.version_info >= (3,9) else 1)" }
  if ($LASTEXITCODE -eq 0) { $pythonOK = $true; break }
 }
}
if (!$pythonOK) { $missing += "Python.Python.3.12" }
if ($missing.Count -gt 0) {
 Write-Host "Missing tools: $($missing -join ', ')"
 if (!(Get-Command winget -ErrorAction SilentlyContinue)) { throw "Install tools manually using docs/SETUP.md, then rerun." }
 if ((Read-Host "Install these tools using WinGet? [y/N]") -ne "y") { exit 1 }
 foreach ($id in $missing) { winget install --id $id --exact; if ($LASTEXITCODE -ne 0) { throw "Installer failed for $id" } }
 Write-Host "Close and reopen PowerShell, then rerun setup-windows.ps1 to refresh PATH."
 exit 0
}
& npm.cmd ci
if ($LASTEXITCODE -ne 0) { throw "npm ci failed" }
& npm.cmd run doctor
if ($LASTEXITCODE -ne 0) { throw "Tool checks failed" }
& npm.cmd run doctor:renderer
if ($LASTEXITCODE -ne 0) { Write-Host "Renderer reports missing optional tools; see docs/SETUP.md and test the sample render." }
Write-Host "Setup checked. Run npm run demo:check, then npm run render."
