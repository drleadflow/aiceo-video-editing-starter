// Generated diagnostic picture/tone only, not human speech or stock media.
import {mkdtempSync,writeFileSync,readFileSync,existsSync} from 'node:fs';import {tmpdir} from 'node:os';import {join,resolve} from 'node:path';import {spawnSync} from 'node:child_process';import assert from 'node:assert/strict';
const dir=mkdtempSync(join(tmpdir(),'aiceo media '));
function run(cmd,args){const p=spawnSync(cmd,args,{encoding:'utf8'});if(p.status!==0)throw Error(p.stderr||`${cmd} failed`);return p.stdout;}
const source=join(dir,'source.mp4'),output=join(dir,'cut.mp4'),plan=join(dir,'keep.json');
run('ffmpeg',['-v','error','-f','lavfi','-i','testsrc2=size=320x568:rate=30:duration=4','-f','lavfi','-i','sine=frequency=440:sample_rate=48000:duration=4','-c:v','libx264','-pix_fmt','yuv420p','-c:a','aac','-shortest',source]);
writeFileSync(plan,JSON.stringify({keep:[[0,1],[2,3]]}));
run(process.execPath,['scripts/python.mjs','scripts/cut.py',source,plan,output]);
const meta=JSON.parse(run('ffprobe',['-v','error','-show_format','-show_streams','-of','json',output]));assert.ok(Math.abs(Number(meta.format.duration)-2)<.1);assert.ok(meta.streams.some(s=>s.codec_type==='audio'));assert.ok(meta.streams.some(s=>s.codec_type==='video'));
run('ffmpeg',['-v','error','-i',output,'-f','null','-']);
const repeat=spawnSync(process.execPath,['scripts/python.mjs','scripts/cut.py',source,plan,output]);assert.notEqual(repeat.status,0);
writeFileSync(join(dir,'words.json'),JSON.stringify({words:[{text:'boundary',start:.8,end:1.2}]}));const crossing=spawnSync(process.execPath,['scripts/python.mjs','scripts/cut.py',source,plan,join(dir,'cross.mp4'),'--words',join(dir,'words.json')]);assert.notEqual(crossing.status,0);assert.equal(existsSync(join(dir,'cross.mp4')),false);
console.log('PASS: A/V cut, duration, full decode, overwrite protection and word-boundary rejection. Fixture: '+dir);
