import {mkdirSync, copyFileSync} from 'node:fs';
mkdirSync('examples/demo/vendor', {recursive:true});
copyFileSync('node_modules/gsap/dist/gsap.min.js', 'examples/demo/vendor/gsap.min.js');
console.log('Demo ready. Run npm run check, then npm run render.');
