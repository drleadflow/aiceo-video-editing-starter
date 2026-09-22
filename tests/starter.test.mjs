import test from 'node:test';
import assert from 'node:assert/strict';
import {mkdtempSync,mkdirSync,writeFileSync,readFileSync,existsSync,cpSync,readdirSync} from 'node:fs';
import {tmpdir} from 'node:os';
import {join,resolve} from 'node:path';
import {spawnSync} from 'node:child_process';
const root=resolve(import.meta.dirname,'..');
function sandbox(){const dir=mkdtempSync(join(tmpdir(),'aiceo space '));mkdirSync(join(dir,'examples/demo'),{recursive:true});writeFileSync(join(dir,'examples/demo/index.html'),'<div>fixture</div>');return dir;}
function run(file,args,dir){return spawnSync(process.execPath,[join(root,'scripts',file),...args],{cwd:dir,encoding:'utf8'});}
test('new projects preserve versions and support folders with spaces',()=>{const dir=sandbox();assert.equal(run('new-video.mjs',['my-reel'],dir).status,0);const p=join(dir,'projects/my-reel/v01/index.html');writeFileSync(p,'original');assert.equal(run('new-video.mjs',['my-reel','--from','projects/my-reel/v01'],dir).status,0);assert.equal(readFileSync(p,'utf8'),'original');assert.equal(readFileSync(join(dir,'projects/my-reel/v02/index.html'),'utf8'),'original');});
test('project names cannot traverse out of project folder',()=>{const dir=sandbox();assert.notEqual(run('new-video.mjs',['../oops'],dir).status,0);assert.equal(existsSync(join(dir,'oops')),false);});
test('import never overwrites an existing generated asset',()=>{const dir=sandbox(),input=join(dir,'test clip.mp4');writeFileSync(input,'first');assert.equal(run('import-asset.mjs',['my-reel',input],dir).status,0);writeFileSync(input,'second');assert.notEqual(run('import-asset.mjs',['my-reel',input],dir).status,0);assert.equal(readFileSync(join(dir,'projects/my-reel/assets/generated/test clip.mp4'),'utf8'),'first');});
test('mirrored skills contain identical complete supporting files',()=>{function walk(p){return readdirSync(p,{withFileTypes:true}).flatMap(x=>x.isDirectory()?walk(join(p,x.name)): [join(p,x.name)]);}for(const file of walk(join(root,'.claude/skills'))){const mirror=join(root,'.agents/skills',file.slice(join(root,'.claude/skills').length+1));assert.equal(readFileSync(file,'utf8'),readFileSync(mirror,'utf8'));}});
