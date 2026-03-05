import express from 'express';
import path from 'path';
import { REACT_BUILD_DIR } from '../config/paths.js';

/**
 * Serve ficheiros estáticos do build React (CSS, JS, imagens).
 */
export function serveStatic() {
  return express.static(REACT_BUILD_DIR);
}

/**
 * Catch-all para React Router (SPA).
 * Devolve index.html para qualquer rota não resolvida.
 */
export function serveSpa(req, res) {
  res.sendFile(path.join(REACT_BUILD_DIR, 'index.html'));
}
