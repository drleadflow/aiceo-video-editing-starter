#!/usr/bin/env python3
"""Cut explicit original-source keep ranges. Requires video AND audio.
Optional --words accepts {"words":[{"text":"hello","start":0,"end":0.4}]}.
Outputs an MP4, .map.json and, when requested, .words.json. Never overwrites.
"""
import argparse, json, math, subprocess
from pathlib import Path

def run(args):
    return subprocess.run(args, check=True, capture_output=True, text=True).stdout

def main():
    p=argparse.ArgumentParser(description=__doc__)
    p.add_argument('source',type=Path); p.add_argument('plan',type=Path)
    p.add_argument('output',type=Path); p.add_argument('--words',type=Path)
    a=p.parse_args()
    mapping=a.output.with_suffix('.map.json'); wordsout=a.output.with_suffix('.words.json')
    for f in [a.output,mapping]+([wordsout] if a.words else []):
        if f.exists(): p.error(f'Output already exists: {f}. Choose a new version.')
    meta=json.loads(run(['ffprobe','-v','error','-show_streams','-show_format','-of','json',str(a.source)]))
    types={s['codec_type'] for s in meta['streams']}
    if not {'video','audio'} <= types:p.error('Source must have video and audio.')
    duration=float(meta['format']['duration']); ranges=json.loads(a.plan.read_text())['keep']
    if not isinstance(ranges,list) or not ranges:p.error('keep must be a nonempty list.')
    previous=0; cursor=0; cuts=[]; filters=[]; labels=[]
    for i,pair in enumerate(ranges):
        if not isinstance(pair,list) or len(pair)!=2:p.error('Each keep range needs two numbers.')
        start,end=pair
        if any(isinstance(n,bool) or not isinstance(n,(int,float)) or not math.isfinite(n) for n in pair):p.error('Range values must be finite numbers.')
        if not 0<=start<end<=duration or start<previous:p.error('Ranges must be in bounds, sorted and nonoverlapping.')
        # Quantize to the output frame grid so sidecars and video use identical boundaries.
        start=round(start*30)/30;end=round(end*30)/30
        if end<=start:p.error('Range is shorter than one output frame.')
        length=end-start; previous=end
        filters.extend([f'[0:v:0]fps=30,trim=start={start}:end={end},setpts=PTS-STARTPTS,setsar=1[v{i}]',f'[0:a:0]atrim=start={start}:end={end},asetpts=PTS-STARTPTS,aresample=48000,apad,atrim=duration={length}[a{i}]'])
        labels.extend([f'[v{i}]',f'[a{i}]'])
        cuts.append({'source_start':start,'source_end':end,'output_start':cursor,'output_end':cursor+length});cursor+=length
    filters.append(''.join(labels)+f'concat=n={len(cuts)}:v=1:a=1[v][a]')
    words=None
    if a.words:
        raw=json.loads(a.words.read_text())['words'];words=[]
        for c in cuts:
            for w in raw:
                if w.get('type','word')!='word':continue
                s=float(w['start']);e=float(w['end'])
                if not math.isfinite(s+e) or e<s:p.error('Invalid word timing.')
                if s>=c['source_start'] and e<=c['source_end']:
                    words.append({**w,'start':s-c['source_start']+c['output_start'],'end':e-c['source_start']+c['output_start']})
                elif max(s,c['source_start'])<min(e,c['source_end']):
                    p.error('A keep boundary crosses a word. Adjust it before cutting.')
    a.output.parent.mkdir(parents=True,exist_ok=True)
    subprocess.run(['ffmpeg','-hide_banner','-loglevel','error','-n','-i',str(a.source),'-filter_complex',';'.join(filters),'-map','[v]','-map','[a]','-c:v','libx264','-crf','18','-preset','fast','-pix_fmt','yuv420p','-c:a','aac','-b:a','192k','-movflags','+faststart',str(a.output)],check=True)
    mapping.write_text(json.dumps({'fps':30,'duration':cursor,'cuts':cuts},indent=2))
    if words is not None:wordsout.write_text(json.dumps({'words':words},indent=2))
    print(f'Created {a.output}. Review every join. Expected duration: {cursor:.3f}s.')

if __name__=='__main__':main()
