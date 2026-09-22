# Verification for starter v2

Verified locally on 2026-09-22, macOS Apple Silicon, Node 22.23.2:

- Pinned npm installation and postinstall completed.
- Nine unit/integration tests passed: transcript preservation and retiming, reviewed
  cuts, empty cut plans, invalid bounds, beat timing, project version preservation,
  traversal rejection, asset overwrite refusal, mirrored skill consistency.
- Synthetic A/V fixture passed: two-second cut, audio/video streams, complete decode,
  refusal to overwrite and refusal to cut through a timed word.
- HyperFrames 0.8.31 sample check passed runtime, layout, motion and contrast checks.
- Six-second sample rendered as H.264 1080x1920. An encoded frame was visually checked.
- Release scan passed for tracked files. No personal source media or credentials included.
- npm reported zero vulnerabilities after pinning the transitive adm-zip patch at 0.6.1.

Limits: this machine already had development tools. A fresh-machine installer test
and Windows/Intel Mac acceptance are not yet established. The CI matrix is provided
for Mac, Windows and Linux; check its actual run before advertising platform support.
No paid ElevenLabs, HeyGen or Higgsfield calls were made. Provider skills support
connected tools or manual website exports; account access is not bundled. The demo
is silent typography, not a demonstration of automatic speech editing. The synthetic
media test uses a diagnostic tone and fictional transcript, not human speech.

The optional GSAP audio-reactive helper requires NumPy in a Python environment;
local TTS references also have extra dependencies. These are not required for the
basic editing path and are not installed automatically. Upstream producer-only QA
scripts were excluded; use the packaged renderer checks plus perceptual review.
