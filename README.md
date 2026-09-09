# Edit videos with Codex and HyperFrames

A small, inspectable starting point for turning a talking-head recording into a tighter reel. Built from a real iterative editing session: transcript cleanup, two-line hooks, meaningful B-roll, readable graphics, sound timing and versioned exports.

**What actually runs the edit:** Codex is the agent operating local files and commands. HyperFrames renders HTML compositions. FFmpeg cuts and processes media. An ordinary ChatGPT conversation without these execution tools is not the same setup.

## Start here

Install Node.js 22 or newer, Python 3 and FFmpeg. Open this folder in Codex. From its terminal:

```sh
npm install
npm run check
npm run render
```

This renders a six-second typography sample into `renders/`. It needs no API key or footage. It is intentionally silent. First install downloads dependencies; rendering may also download the browser runtime. The pinned HyperFrames version is 0.8.31. macOS is the validation target for this starter; other operating systems need their own smoke check.

## Edit your recording

1. Create `projects/my-reel/v01/` and copy your recording there. Keep the original elsewhere too.
2. Read [the complete workflow](docs/WORKFLOW.md).
3. Give Codex the brief in [EDIT-BRIEF.md](docs/EDIT-BRIEF.md), with your file path and desired duration.
4. Reuse a timed transcript or choose a transcription provider. ElevenLabs is optional and requires your own account. Copy `.env.example` to `.env` only if needed. Never commit the filled file.
5. Save a cut plan before rendering. The optional cut script below takes explicit keep ranges; it does not decide which words to remove.
6. Make the first edit, review it, and refine one issue at a time into a new version.

```sh
python3 scripts/cut.py projects/my-reel/source.mp4 projects/my-reel/keep.json projects/my-reel/v01/cut.mp4
```

`keep.json` shape: `{"keep": [[0.2, 3.5], [5.1, 8.0]]}`. Ranges are seconds in the original source, sorted and non-overlapping. This utility requires source video and audio, normalizes the edited output to 30 fps, and writes a mapping sidecar. If supplying a transcript, pass `--words words.json`; see the script's help. It performs hard cuts, so listen for clipped consonants and abrupt room tone.

## Included

- A renderable, credential-free typography demo.
- A portable two-line title design preset, with user-supplied font option.
- A validated keep-range cutter with an original-to-edited time map and optional transcript retiming.
- Editing brief, full workflow, quality checklist and lessons learned.
- A release scan that rejects common credential patterns, local paths and personal-media files.

## Deliberately excluded

Private recordings, transcripts, client transformations, downloaded creator references, meme GIFs, soundboard audio, API keys and third-party brand assets. Supply your own authorized media. A release scan helps catch mistakes but is not a guarantee; review the exact tracked file list before publication.

## Credits

Based on lessons from Nate Herk's [HyperFrames Student Kit](https://github.com/nateherkai/hyperframes-student-kit) and [HyperFrames](https://github.com/heygen-com/hyperframes). The original kit's MIT notice and teaching-kit permission are retained. This starter does not redistribute the original kit's brand assets, footage or fonts. HyperFrames and GSAP remain under their own licenses installed with npm.

The example demonstrates layout mechanics, not automatic editorial judgment. A good edit still needs a clear brief and human review.
