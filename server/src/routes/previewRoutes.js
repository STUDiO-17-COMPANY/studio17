import express from 'express';
import { serveClientPreview } from '../controllers/previewController.js';

const router = express.Router();

/**
 * /:pais/:projeto - Serve previews de clientes
 * Ex: /CY/VMC, /PT/ProjetoX
 */
router.use('/:pais/:projeto', serveClientPreview);

export default router;
