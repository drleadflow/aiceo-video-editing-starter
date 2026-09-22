# Optional services

The starter works without cloud generation accounts. Your assistant subscription,
ElevenLabs usage, HeyGen usage and Higgsfield usage are separate. Verify current
pricing in the provider dashboard; never imply credits are included.

## ElevenLabs transcription

Create your own key with speech-to-text access. Copy `.env.example` to `.env`
and enter the key locally, not in a chat message or a screenshot. The included
helper reads it and uploads source audio only when you run:

```
npm run transcribe -- "projects/my-reel/assets/source.mp4"
```

Read `node scripts/transcribe-elevenlabs.mjs --help` for options. Reuse existing
transcripts rather than paying twice. This is Scribe transcription, NOT Voice
Isolator. Noise cleanup is a separate optional Voice Isolator operation; use your
connected ElevenLabs tool or website, compare with the original, and import the
result. Never claim cleanup was performed because a transcript was created.

## Higgsfield B-roll

Use the bundled `higgsfield-broll` skill. Easiest beginner path: create the shot in
your Higgsfield web account, download it, then import the MP4. An already connected
Higgsfield plugin/CLI may automate this; the starter does not bundle that executable.
API users should follow https://docs.higgsfield.ai/docs; API credentials and
model requirements differ from web login. Check current schema and price before
using references or submitting paid jobs. No generation is triggered during setup.

## HeyGen presenter

Use `heygen-presenter`. Select an authorized presenter and voice in your HeyGen
account, generate the agreed script, and download the result. For connected tools
or API automation, follow https://developers.heygen.com/docs/for-ai-agents.md and
https://developers.heygen.com/llms.txt. The starter does not provision accounts,
train a digital twin, install the CLI, or connect an API key automatically.
HyperFrames is a local composition renderer, not your HeyGen avatar account.

## Import a downloaded result

```
npm run import-asset -- my-reel "path to downloaded clip.mp4"
```

The file is copied to `projects/my-reel/assets/generated/`; existing files are never
overwritten. Keep a sidecar JSON with provider, model, job ID, prompt and rights.
Keep credentials OUT of that sidecar. Inspect lipsync/identity and mute generated
B-roll audio unless it intentionally belongs in the mix.

Copyable brief: “Create a 4-second vertical tracking shot of a doctor walking through
an airy hospital corridor. Preserve my authorized reference likeness and white
coat. Natural motion, no lettering or extra accessories. Show the shot plan and
cost before any generation that I have not authorized.”
