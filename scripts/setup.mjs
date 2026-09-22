import {mkdirSync,copyFileSync} from 'node:fs';
mkdirSync('examples/demo/vendor',{recursive:true});copyFileSync('node_modules/gsap/dist/gsap.min.js','examples/demo/vendor/gsap.min.js');
await import('./sync-skills.mjs');console.log('Demo assets prepared. Run npm run doctor to verify external tools. No accounts or keys were connected.');
