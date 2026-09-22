# AI CEO Lab Video Editing Starter

Turn your recording into a reviewed reel with Codex or Claude Code, HyperFrames,
reusable editing skills and optional AI-generated B-roll.

## Start here

1. **Download ZIP:** use GitHub's Code → Download ZIP, then extract it. Git is optional.
2. **Set up:** [Mac or Windows instructions](docs/SETUP.md). Run the included setup
   script to check/install tools with your permission. Internet is required initially.
3. **Open the extracted folder in Codex or Claude Code.** Use your own assistant account.
4. **Try the six-second example:** `npm run demo:check`, then `npm run render`.
   It is silent typography; find the MP4 in `renders/`. No API key required.
5. **Create your first project:** `npm run new-video -- my-reel`.
   Copy your recording to `projects/my-reel/assets/source.mp4`.

Tell your assistant:

> Use edit-video to edit projects/my-reel/assets/source.mp4 into a 9:16 reel.
> Map the hook and storyboard first. Preserve my meaning and complete words.
> Use the red two-line title preset. Show me a clean dialogue cut before adding
> captions, B-roll and music. Save a new version and review the actual export.

Codex discovers `.agents/skills/`; Claude Code discovers `.claude/skills/`.
Reopen the project after setup if skills aren't visible. Open the repository root,
not only a video subfolder. `npm run sync:skills` mirrors the canonical Claude
skill folders for Codex; no symlinks or global skill installation are required.

## Choose your workflow

| I want to… | Use |
| --- | --- |
| Edit my own recording | `edit-video` |
| Review pauses / retakes | `cut-silences` / `cut-mistakes` |
| Plan explanatory visuals | `video-storytelling` |
| Build compositions / motion | `hyperframes` / `gsap` |
| Create alternate opening hooks | `hook-variations` |
| Generate optional B-roll | `higgsfield-broll` |
| Generate an optional AI presenter | `heygen-presenter` |

[Complete editing workflow](docs/WORKFLOW.md) · [Brief](docs/EDIT-BRIEF.md) ·
[Providers and costs](docs/PROVIDERS.md) · [Verification status](docs/VERIFICATION.md)

## Included / bring your own

Included: nine skills with their supporting references and scripts, source-to-edit
mapping, transcript retiming, EDL review, two title palettes, project scaffolding,
and a synthetic media test. Selected resources come from Nate Herk's student kit;
[attribution and licenses](docs/PROVENANCE.md) are retained.

Bring your footage, a timed transcript or transcription service, and licensed
music/fonts. No subscriptions, generation credits, avatar identities, private
recordings, commercial songs or account credentials are bundled.
The optional provider skills guide connected tools or website exports; they do
not silently install a vendor integration or guarantee API access.

## Useful commands

```sh
npm run doctor
npm run doctor:renderer
npm run preview
npm run new-video -- my-reel
npm run check -- projects/my-reel/v01
npm run render -- projects/my-reel/v01
npm run new-video -- my-reel --from projects/my-reel/v01
npm test
npm run test:media
```

Originals and outputs live in ignored `projects/` and `renders/`. Never publish
those folders or your `.env`. Updates should be extracted into a separate folder;
copy your private projects and locally stored settings deliberately. Do not overwrite
an existing working installation with an unreviewed update.
