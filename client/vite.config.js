import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

// https://vite.dev/config/
export default defineConfig({
  plugins: [react()],
  server: {
    proxy: {
      // Previews de clientes (/:pais/:projeto) e lab (/lab/:projeto)
      // Dinâmico: qualquer pasta em previews_clientes (ex: ES, GR) é reconhecida automaticamente
      // Exclui: articles, partners (React), src, assets, node_modules (Vite)
      '^/(?!articles|partners|case-studies|src|assets|node_modules)([a-zA-Z0-9_-]+)/([a-zA-Z0-9_-]+)': {
        target: 'http://localhost:3000',
        changeOrigin: true,
      },
    },
  },
})
