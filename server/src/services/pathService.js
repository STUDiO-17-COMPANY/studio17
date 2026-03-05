import path from 'path';
import fs from 'fs';
import { isValidName } from '../utils/validation.js';
import { CLIENTS_DIR, LAB_DIR } from '../config/paths.js';

/**
 * Resolve e valida o caminho de um projeto lab.
 * @returns {{ valid: boolean, projectPath?: string, error?: string, statusCode?: number }}
 */
export function resolveLabPath(projeto) {
  if (!isValidName(projeto)) {
    return { valid: false, error: 'Invalid project name', statusCode: 400 };
  }

  const projectPath = path.join(LAB_DIR, projeto);

  if (!projectPath.startsWith(LAB_DIR)) {
    return { valid: false, error: 'Acesso Proibido', statusCode: 403 };
  }

  if (!fs.existsSync(projectPath)) {
    return { valid: false, error: 'Projeto Lab Não Encontrado', statusCode: 404 };
  }

  return { valid: true, projectPath };
}

/**
 * Resolve e valida o caminho de um preview de cliente.
 * @returns {{ valid: boolean, projectPath?: string, error?: string, statusCode?: number }}
 */
export function resolvePreviewPath(pais, projeto) {
  if (!isValidName(pais) || !isValidName(projeto)) {
    return { valid: false, error: 'Invalid path', statusCode: 400 };
  }

  const projectPath = path.join(CLIENTS_DIR, pais, projeto);

  if (!projectPath.startsWith(CLIENTS_DIR)) {
    return { valid: false, error: 'Acesso Proibido', statusCode: 403 };
  }

  if (!fs.existsSync(projectPath)) {
    return { valid: false, error: 'Preview de Projeto Não Encontrado', statusCode: 404 };
  }

  return { valid: true, projectPath };
}
