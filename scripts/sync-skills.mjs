import {cpSync, readdirSync, mkdirSync, rmSync} from 'node:fs';
for (const item of readdirSync('.claude/skills',{withFileTypes:true})) {
 if(!item.isDirectory()) continue;
 mkdirSync('.agents/skills',{recursive:true});
 rmSync(`.agents/skills/${item.name}`,{recursive:true,force:true});
 cpSync(`.claude/skills/${item.name}`,`.agents/skills/${item.name}`,{recursive:true});
}
console.log('Project skills installed for Codex and Claude Code. Reopen the project if needed.');
