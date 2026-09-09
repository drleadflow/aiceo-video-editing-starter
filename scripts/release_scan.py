#!/usr/bin/env python3
"""Scan tracked release files when inside a Git repository, else this starter.
This catches common mistakes; manually review the release manifest too.
"""
from pathlib import Path
import re, subprocess, sys
root=Path(__file__).resolve().parent.parent
r=subprocess.run(['git','rev-parse','--show-toplevel'],cwd=root,capture_output=True,text=True)
if r.returncode==0 and Path(r.stdout.strip()).resolve()==root:
    names=subprocess.check_output(['git','ls-files','-z'],cwd=root).decode().split('\0')
    files=[root/n for n in names if n]
else:
    files=[p for p in root.rglob('*') if p.is_file() and not any(x in p.relative_to(root).parts for x in ['node_modules','.git','vendor','renders','projects','__pycache__'])]
patterns=[r'gh[pousr]_[A-Za-z0-9]{20,}',r'sk-[A-Za-z0-9_-]{20,}',r'-----BEGIN (?:RSA |EC |OPENSSH )?PRIVATE KEY-----',r'/Users/[^/\s]+/',r'https://drive\.google\.com/(?:file|drive)/']
bad=[]
for p in files:
    rel=str(p.relative_to(root))
    if p.is_symlink():bad.append((rel,'symlink'));continue
    if p.name.startswith('.env') and p.name!='.env.example':bad.append((rel,'environment file'))
    if p.suffix.lower() in ['.mov','.mp4','.mp3','.wav','.gif','.jpg','.jpeg','.png','.webp']:bad.append((rel,'media file'))
    if p.name==Path(__file__).name:continue
    try:s=p.read_text()
    except UnicodeDecodeError:bad.append((rel,'unexpected binary'));continue
    if any(re.search(x,s) for x in patterns):bad.append((rel,'potential private data'))
    for line in s.splitlines():
        if re.match(r'^\s*[A-Z_]*(?:API_KEY|TOKEN|SECRET|PASSWORD)\s*=\s*[^\s#]+',line):bad.append((rel,'populated secret assignment'))
for name,reason in bad:print(name+': '+reason)
print(f'Scanned {len(files)} release files; {len(bad)} findings. Manual review still required.')
sys.exit(bool(bad))
