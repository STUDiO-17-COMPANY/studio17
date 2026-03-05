import helmet from 'helmet';
import cors from 'cors';

/**
 * Middleware de segurança (headers HTTP).
 * ContentSecurityPolicy desativado para compatibilidade com projetos estáticos antigos.
 */
export const securityHeaders = helmet({
  contentSecurityPolicy: false,
});

/**
 * Middleware CORS para permitir requisições cross-origin.
 */
export const corsMiddleware = cors();
