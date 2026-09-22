---
name: higgsfield-broll
description: Plan and generate optional Higgsfield images or moving B-roll, then import the result into this video project.
---

# Higgsfield Broll

Read docs/PROVIDERS.md first. Higgsfield is optional and requires the user's own access and credits. Prefer an already connected official tool or CLI; otherwise guide the user through the website and import their downloaded result. Do not assume a skill installs a connector.
Create a shot brief: narration phrase, purpose, duration, aspect ratio, subject and identity references, camera motion, action, lighting, continuity and exclusions. Example: a doctor walks through a bright hospital corridor; stable identity and white coat; gentle tracking shot; no text, watermarks or added jewelry. Use only authorized likeness inputs.
Inspect the chosen tool's current model schema, supported inputs and cost before submission; https://docs.higgsfield.ai/docs is the API reference. Do not guess model flags or endpoints. Obtain any missing authorization for paid generation/uploads, then save the returned job ID immediately. On timeout inspect that job; do not blindly submit a duplicate. Download completed output into projects/<slug>/assets/generated/ and record prompt/model/source/job in an adjacent JSON manifest. Inspect actual motion and identity. Import locally with npm run import-asset -- <slug> <downloaded-file>. Keep its audio muted unless deliberately chosen for the mix.
