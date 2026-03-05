import express from 'express';
import { serveLabProject } from '../controllers/labController.js';

const router = express.Router();

/**
 * /lab/:projeto - Serve experiências internas da equipa
 */
router.use('/lab/:projeto', serveLabProject);

export default router;
