import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const localesDir = path.join(__dirname, '../client/src/locales');

for (const loc of ['en', 'pt', 'es', 'el']) {
  const extraPath = path.join(__dirname, `locale-extra.${loc}.json`);
  if (!fs.existsSync(extraPath)) {
    console.warn('skip', loc, '(no extra file)');
    continue;
  }
  const extra = JSON.parse(fs.readFileSync(extraPath, 'utf8'));
  const targetPath = path.join(localesDir, `${loc}.json`);
  const j = JSON.parse(fs.readFileSync(targetPath, 'utf8'));
  if (extra.contactPatch) Object.assign(j.contact, extra.contactPatch);
  if (extra.articlesPage) j.articlesPage = extra.articlesPage;
  if (extra.partnersPage) j.partnersPage = extra.partnersPage;
  fs.writeFileSync(targetPath, `${JSON.stringify(j, null, 2)}\n`);
  console.log('merged', loc);
}
