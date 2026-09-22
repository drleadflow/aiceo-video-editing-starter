# Setup on Mac and Windows

You need your own Codex or Claude Code access. Setup does not purchase accounts,
connect providers, upload recordings, or spend generation credits.

Download the ZIP from GitHub and extract it to a folder you own. Git is not needed.
Allow disk space for Node packages, the render browser and your videos. First setup
requires internet. Antivirus or enterprise policies may require IT assistance.

## Mac

Open Terminal, type `cd ` and drag the extracted folder into the window, then Return.
Run `bash setup-mac.sh`. It checks Node 22+, FFmpeg and Python. If missing,
it offers installation through an existing Homebrew installation. If Homebrew is
absent, use https://brew.sh or install the tools yourself; the script does not run
a downloaded shell installer. Rerun setup afterward. Apple Silicon and Intel use
the Homebrew installation available on your machine.

## Windows

Open PowerShell in the extracted folder. Run `powershell -File .\setup-windows.ps1`.
It checks Node 22+, FFmpeg and Python and offers missing tools through WinGet.
Review any installer prompts. If policy blocks PowerShell scripts, do not disable
security policy: use the manual commands below or ask IT. WinGet is supplied by
Microsoft App Installer; see https://learn.microsoft.com/windows/package-manager/winget/.
After installing tools, close/reopen the terminal and rerun the script to refresh PATH.

## Manual setup / restricted computers

Install Node 22+ from https://nodejs.org, Python 3.9+ from https://python.org,
and FFmpeg/ffprobe using your platform's supported distribution listed at
https://ffmpeg.org/download.html. Then, from this extracted folder:

```
npm ci
npm run doctor
npm run doctor:renderer
npm run demo:check
npm run render
```

The setup scripts use `npm ci`, respecting the checked-in dependency lockfile.
They do not copy your keys or overwrite .env. Rendering may download a browser.
If browser checks fail, run `npx hyperframes browser --help` and follow the pinned
CLI's supported installation options. Do not bypass browser or operating-system warnings.

## Common problems

- Command not found: reopen the terminal after installation; run `npm run doctor`.
- Node too old: update to Node 22+ before installing packages.
- File paths with spaces: put the full file path in double quotes.
- Missing source audio: the cutter expects both video and audio; add a deliberate
  audio track or choose a different source. It never invents speech.
- Skills missing: open the repository root, run `npm run sync:skills`, reopen it.
- API errors: core setup does not connect providers. See PROVIDERS.md.
- Preview works but export fails: run doctor:renderer, retain the error message,
  and check disk space. Do not report success until the MP4 opens.

Mac/Windows scripts and CI are provided. See VERIFICATION.md for what was actually
executed; publishing these scripts alone does not prove clean-machine compatibility.
