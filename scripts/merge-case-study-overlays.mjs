import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const root = path.join(__dirname, '..');
const mainPath = path.join(root, 'client/public/case-studies.json');

const localeFiles = [
  { code: 'pt', file: 'case-study-overlays-pt.json' },
  { code: 'es', file: 'case-study-overlays-es.json' },
  { code: 'el', file: 'case-study-overlays-el.json' },
];

const main = JSON.parse(fs.readFileSync(mainPath, 'utf8'));
let slo = { ...(main.studyLocaleOverlays || {}) };

for (const { code, file } of localeFiles) {
  const fp = path.join(__dirname, file);
  if (!fs.existsSync(fp)) {
    console.warn('skip missing', file);
    continue;
  }
  const overlays = JSON.parse(fs.readFileSync(fp, 'utf8'));
  slo[code] = { ...(slo[code] || {}), ...overlays };
}

main.studyLocaleOverlays = slo;
fs.writeFileSync(mainPath, `${JSON.stringify(main, null, 2)}\n`);
console.log('merged case study overlays:', localeFiles.map((x) => x.code).join(', '));
