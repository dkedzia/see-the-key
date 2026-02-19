/**
 * Copies dictionary files from node_modules to public/dictionaries for browser loading.
 * Vite serves files from public/ at root path.
 */
import fs from 'node:fs';
import path from 'node:path';
import { fileURLToPath } from 'node:url';

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const projectRoot = path.resolve(__dirname, '..');
const publicDir = path.join(projectRoot, 'public', 'dictionaries');

const dictionaries = [
  { pkg: 'dictionary-pl', prefix: 'pl' },
  { pkg: 'dictionary-en', prefix: 'en' },
];

fs.mkdirSync(publicDir, { recursive: true });

for (const { pkg, prefix } of dictionaries) {
  const pkgDir = path.join(projectRoot, 'node_modules', pkg);
  const aff = path.join(pkgDir, 'index.aff');
  const dic = path.join(pkgDir, 'index.dic');

  if (fs.existsSync(aff)) {
    fs.copyFileSync(aff, path.join(publicDir, `${prefix}.aff`));
  }
  if (fs.existsSync(dic)) {
    fs.copyFileSync(dic, path.join(publicDir, `${prefix}.dic`));
  }
}
