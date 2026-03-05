import express from 'express';
import { resolvePreviewPath } from '../services/pathService.js';
import { escapeHtml } from '../utils/validation.js';

/**
 * Middleware que serve ficheiros estáticos de um preview de cliente.
 * Rota: /:pais/:projeto
 */
export function serveClientPreview(req, res, next) {
  const { pais, projeto } = req.params;

  const { valid, projectPath, error, statusCode } = resolvePreviewPath(pais, projeto);

  if (!valid) {
    const safeError = escapeHtml(error);
    return res.status(statusCode || 500).send(`<h1>${statusCode === 404 ? '404' : ''} - ${safeError}</h1>`);
  }

  express.static(projectPath)(req, res, next);
}
