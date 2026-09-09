# Release verification

Checked on macOS with Node 22 and FFmpeg on 2026-09-09.

- Pinned dependencies installed successfully.
- HyperFrames check passed for the sample.
- Sample rendered to H.264 MP4, 1080x1920, exactly 6 seconds. It is intentionally silent.
- Keep-range cutter smoke test produced a 2-second file from two source intervals.
- Word timestamps were remapped correctly through a removed interval.
- Release-file scan reported no credential patterns, personal media or private paths.
- No live transcription API call is included in the sample or claimed as tested here.

Known dependency finding: npm audit reports a moderate adm-zip symlink extraction advisory, inherited through HyperFrames. npm currently reports no automatic fix. This sample does not import ZIP archives; avoid extracting untrusted archives through the affected dependency. Recheck the upstream fix before upgrading. See https://github.com/advisories/GHSA-vwc7-r8mq-g2x9.

This is a tested small starter, not a copy of the private production project or a one-command replacement for editorial judgment. Other operating systems have not been verified.
