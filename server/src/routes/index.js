import labRoutes from './labRoutes.js';
import previewRoutes from './previewRoutes.js';
import reactRoutes from './reactRoutes.js';

/**
 * Regista todas as rotas na app Express.
 * Ordem importante: rotas específicas primeiro, catch-all por último.
 */
export function registerRoutes(app) {
  app.use(labRoutes);
  app.use(previewRoutes);
  app.use(reactRoutes);
}
