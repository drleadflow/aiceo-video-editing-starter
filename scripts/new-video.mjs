import {existsSync,mkdirSync,cpSync,writeFileSync} from 'node:fs';
import {resolve,sep} from 'node:path';
const args=process.argv.slice(2),slug=args[0];
if(!slug||!/^[a-z0-9]+(?:-[a-z0-9]+)*$/.test(slug)){console.error('Usage: npm run new-video -- my-reel [--from projects/my-reel/v01]');process.exit(1);}
const base=resolve('projects',slug);let n=1;while(existsSync(`${base}/v${String(n).padStart(2,'0')}`))n++;
const out=`${base}/v${String(n).padStart(2,'0')}`;
let source='examples/demo';if(args[1]==='--from'){source=resolve(args[2]||'');if(!source.startsWith(resolve('projects')+sep)||!existsSync(source+'/index.html'))throw Error('Source must be an existing project version.');}
mkdirSync(base+'/assets',{recursive:true});cpSync(source,out,{recursive:true});
writeFileSync(out+'/BRIEF.md','# Edit brief\n\nAudience:\nOne idea:\nOpening hook:\nSource file: ../assets/\nMust preserve:\nScenes / source ranges:\n');
console.log('Created '+out+' (starter visuals; replace with your footage).');
