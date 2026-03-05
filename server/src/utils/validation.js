/**
 * Valida nomes de pasta para prevenir path traversal.
 * Aceita apenas caracteres alfanuméricos, underscore e hífen.
 */
export const isValidName = (name) => /^[a-zA-Z0-9_-]+$/.test(name);

/**
 * Escapa caracteres HTML para prevenir XSS.
 */
export const escapeHtml = (str) => {
  if (str == null) return '';
  const s = String(str);
  return s
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
    .replace(/"/g, '&quot;')
    .replace(/'/g, '&#039;');
};
