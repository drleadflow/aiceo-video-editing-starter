#!/usr/bin/env bash
set -euo pipefail
cd "$(dirname "$0")"
missing=()
if ! command -v node >/dev/null || ! node -e 'process.exit(Number(process.versions.node.split(".")[0])>=22?0:1)'; then missing+=(node@22); fi
command -v ffmpeg >/dev/null && command -v ffprobe >/dev/null || missing+=(ffmpeg)
command -v python3 >/dev/null || missing+=(python)
if [ ${#missing[@]} -gt 0 ]; then
 echo "Missing tools: ${missing[*]}"
 if ! command -v brew >/dev/null; then echo 'Install Homebrew from https://brew.sh or follow docs/SETUP.md, then rerun.'; exit 1; fi
 read -r -p "Install these tools with Homebrew? [y/N] " answer
 if [[ "$answer" != y && "$answer" != Y ]]; then exit 1; fi
 brew install "${missing[@]}"
fi
if command -v brew >/dev/null && [ -d "$(brew --prefix)/opt/node@22/bin" ]; then export PATH="$(brew --prefix)/opt/node@22/bin:$PATH"; fi
npm ci
npm run doctor
npm run doctor:renderer || echo "Renderer reports missing optional tools; run the sample render to check the required path."
echo 'Setup checked. Run npm run demo:check, then npm run render.'
