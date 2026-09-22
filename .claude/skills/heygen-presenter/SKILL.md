---
name: heygen-presenter
description: Create an optional HeyGen avatar/presenter segment and integrate its exported video into a local edit.
---

# Heygen Presenter

Read docs/PROVIDERS.md. HyperFrames rendering and HeyGen avatar generation are separate capabilities. Check whether an official HeyGen connector, authenticated CLI or user API account is actually available. If not, use the user-driven website export path; do not claim connection.
Before an API workflow read https://developers.heygen.com/docs/for-ai-agents.md and discover current models and endpoints. Use a stock avatar or a likeness/voice the user is authorized to use. Follow provider consent requirements for digital twins; do not reuse private account IDs from another project.
Prepare the exact script, avatar, voice, format and expected cost. Generate only within the user's authorized scope. Save job ID before polling, distinguish queued/failed/completed, and never retry an uncertain paid creation blindly. Download into projects/<slug>/assets/generated/, retain source/job metadata, then check lipsync, pronunciation and framing. Use npm run import-asset -- <slug> <downloaded-file>. Transcribe the generated dialogue if captions are required; do not infer exact timings from script length.
