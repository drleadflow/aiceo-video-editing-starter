import {spawnSync} from 'node:child_process';
let failed=false;
function check(name,cmd,args){const r=spawnSync(cmd,args,{encoding:'utf8'});const ok=!r.error&&r.status===0; console.log(`${ok?'OK':'MISSING'} ${name}`);if(!ok)failed=true;return ok;}
if(Number(process.versions.node.split('.')[0])<22){console.log('MISSING Node 22+');failed=true;}else console.log('OK Node '+process.versions.node);
check('FFmpeg','ffmpeg',['-version']); check('ffprobe','ffprobe',['-version']);
const py=[['python3',[]],['python',[]],['py',['-3']]].find(([c,a])=>{const r=spawnSync(c,[...a,'-c','import sys;sys.exit(0 if sys.version_info >= (3,9) else 1)']);return !r.error&&r.status===0});
console.log(py?'OK Python 3.9+':'MISSING Python 3.9+');if(!py)failed=true;
console.log('Renderer/browser: run npm run doctor:renderer. First render may download a browser.');
console.log(failed?'See docs/SETUP.md; install missing tools, reopen terminal, rerun doctor.':'Core tools ready. Next: npm run check, then npm run render.');process.exitCode=failed?1:0;
