import * as fs from 'node:fs/promises';
import { buildTools } from '@zooduck/build-tools';

await fs.rm('modules/@zooduck/safe-dom-parser', { recursive: true, force: true });
await fs.mkdir('modules/@zooduck/safe-dom-parser', { recursive: true });
await fs.copyFile('src/SafeDOMParser.module.js', 'modules/@zooduck/safe-dom-parser/index.module.js');
await buildTools.removeCommentsFromFile('modules/@zooduck/safe-dom-parser/index.module.js');
