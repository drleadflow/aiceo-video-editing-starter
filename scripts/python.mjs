import {spawnSync} from 'node:child_process';
const found=[['python3',[]],['python',[]],['py',['-3']]].find(([c,a])=>{const r=spawnSync(c,[...a,'-c','import sys;sys.exit(0 if sys.version_info >= (3,9) else 1)']);return !r.error&&r.status===0});
if(!found){console.error('Python 3.9+ missing. See docs/SETUP.md.');process.exit(1);}
const r=spawnSync(found[0],[...found[1],...process.argv.slice(2)],{stdio:'inherit'});process.exit(r.status??1);
