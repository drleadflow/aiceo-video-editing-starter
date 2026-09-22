import {mkdirSync,existsSync,readFileSync} from 'node:fs';import {spawnSync} from 'node:child_process';import {resolve,dirname} from 'node:path';
const project=process.argv[2]||'examples/demo';if(!existsSync(resolve(project,'index.html')))throw Error('Project needs index.html');
mkdirSync('renders',{recursive:true});const out=`renders/demo-${new Date().toISOString().replace(/[:.]/g,'-')}.mp4`;
const pkgPath=resolve('node_modules/hyperframes/package.json');const pkg=JSON.parse(readFileSync(pkgPath));const bin=typeof pkg.bin==='string'?pkg.bin:pkg.bin.hyperframes;
const r=spawnSync(process.execPath,[resolve(dirname(pkgPath),bin),'render',project,'--quality','high','--output',out],{stdio:'inherit'});process.exit(r.status??1);
