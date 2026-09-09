import {mkdirSync} from 'node:fs';
import {spawnSync} from 'node:child_process';
mkdirSync('renders', {recursive:true});
const out = `renders/demo-${new Date().toISOString().replace(/[:.]/g,'-')}.mp4`;
const r = spawnSync('npx', ['--no-install','hyperframes','render','examples/demo','--quality','high','--output',out], {stdio:'inherit',shell:process.platform==='win32'});
process.exit(r.status ?? 1);
