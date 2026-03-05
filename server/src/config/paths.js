import path from 'path';
import { fileURLToPath } from 'url';

const __dirname = path.dirname(fileURLToPath(import.meta.url));
export const ROOT = process.env.VERCEL ? process.cwd() : path.join(__dirname, '../../..');
export const CLIENTS_DIR = path.join(ROOT, 'client/previews_clientes');
export const LAB_DIR = path.join(ROOT, 'client/lab');
export const REACT_BUILD_DIR = path.join(ROOT, 'client/dist');
