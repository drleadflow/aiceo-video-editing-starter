---
name: edit-video
description: Coordinate an edit of user footage, from storyboard and transcript through a reviewed HyperFrames reel.
---

# Edit Video

Read README.md, docs/WORKFLOW.md and AGENTS.md at the repository root. Run npm run doctor before starting. Use npm run new-video -- <slug> to create a private versioned project. Copy authorized footage into assets/; preserve its original. Record audience, idea, aspect ratio, hook, scenes and required words in BRIEF.md before building.
Use an existing word-timed transcript or the optional ElevenLabs helper (docs/PROVIDERS.md). Never fabricate word times. For silence removal use cut-silences; then pass BOTH edited video and retimed transcript to cut-mistakes. A clean recording can need no cuts. Keep the complete word and natural breath at each join.
Read hyperframes for composition contracts and gsap for animation. Use presets/ for titles. Plan optional generation with higgsfield-broll or heygen-presenter only when requested. Keep B-roll silent; original dialogue is a separate audio track. Make distinct opening/title variants after locking the body edit.
Run npm run check -- projects/<slug>/v01 and npm run render -- projects/<slug>/v01. Watch encoded frames and listen to joins; log actual checks in VERIFY.md. Structural checks do not prove perceptual quality. Preserve approved versions; do not publish without user authorization.
