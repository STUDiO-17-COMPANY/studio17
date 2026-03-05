import express from 'express';
import { serveStatic, serveSpa } from '../controllers/reactController.js';

const router = express.Router();

/**
 * Ficheiros estáticos do build React
 */
router.use(serveStatic());

/**
 * Catch-all para React Router (SPA)
 */
router.get('*', serveSpa);

export default router;
