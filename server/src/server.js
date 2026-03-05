import express from 'express';
import { securityHeaders, corsMiddleware } from './middleware/security.js';
import { registerRoutes } from './routes/index.js';
import { CLIENTS_DIR } from './config/paths.js';

const app = express();

// Middleware global
app.use(securityHeaders);
app.use(corsMiddleware);

// Rotas (ordem: lab → preview → react)
registerRoutes(app);

// Vercel: exporta a app como handler serverless (sem listen)
export default app;

// Local: inicia o servidor
if (!process.env.VERCEL) {
  const PORT = process.env.PORT || 3000;
  app.listen(PORT, () => {
    console.log(`🚀 Servidor Studio17 rodando na porta ${PORT}`);
    console.log(`📂 Servindo previews de: ${CLIENTS_DIR}`);
  });
}
