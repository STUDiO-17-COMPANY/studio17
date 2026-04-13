import express from 'express';
import { serveStatic, serveSpa } from '../controllers/reactController.js';
import { serveCaseStudyWithOg } from '../controllers/caseStudyOgController.js';

const router = express.Router();

/**
 * Case study pages: same SPA entry with per-slug Open Graph in HTML for crawlers.
 */
router.get('/case-studies/:slug', serveCaseStudyWithOg);

/**
 * Ficheiros estáticos do build React
 */
router.use(serveStatic());

/**
 * Catch-all para React Router (SPA)
 */
router.get('*', serveSpa);

export default router;
