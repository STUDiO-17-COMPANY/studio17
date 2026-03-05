# Studio17 Website

Website do estúdio Studio17 com React (frontend) e Express (backend), incluindo previews de projetos de clientes e experiências de lab.

## Stack Tecnológica

- **Frontend:** React 19, Vite 7, Tailwind CSS, GSAP, Lenis, Phosphor Icons, React Router
- **Backend:** Express (MVC)
- **i18n:** 4 idiomas (EN, pt-PT, es-ES, el-GR) com geolocalização

## Estrutura do Projeto

```
Studio17-Website/
├── client/                 # Frontend React (Vite)
│   ├── src/
│   │   ├── context/        # LocaleContext (i18n)
│   │   ├── locales/        # Traduções (en, pt, es, el.json)
│   │   ├── components/    # Navbar, Footer, etc.
│   │   ├── pages/         # Home, Articles, Partners
│   │   └── hooks/         # useLenis, useNavbarScroll, useScrollReveal
│   ├── previews_clientes/ # Previews por país (CY, PT, RO, etc.) – dinâmico
│   ├── lab/               # Experiências internas da equipa
│   └── dist/              # Build de produção
├── server/                 # Backend Express (MVC)
│   └── src/
│       ├── config/         # Caminhos e configuração
│       ├── controllers/    # Handlers de rotas
│       ├── middleware/     # Segurança (Helmet, CORS)
│       ├── routes/         # Definição de rotas
│       ├── services/       # Lógica de negócio
│       └── utils/          # Validações e helpers
├── src/server.js          # Entry point Vercel (re-exporta server)
├── vercel.json             # Config deploy Vercel
├── package.json            # Scripts raiz (build, start)
└── README.md
```

## Fluxo do Projeto

### Desenvolvimento

1. **Iniciar o ambiente de desenvolvimento** (Vite + Express na mesma porta):

   ```bash
   cd client && npm run dev
   ```

   - **Vite** corre em `http://localhost:5173` (dev server com HMR)
   - **Express** corre em `http://localhost:3000` (servidor de previews)
   - O Vite faz **proxy dinâmico** de `/:pais/:projeto` e `/lab/:projeto` para o Express (qualquer pasta em `previews_clientes` é reconhecida automaticamente)
   - Resultado: tudo acessível em `http://localhost:5173`

2. **Apenas o frontend** (sem previews de clientes):

   ```bash
   cd client && npm run dev:client
   ```

### Produção

1. **Build do React** (ou `npm run build` na raiz):

   ```bash
   cd client && npm run build
   ```

   Gera a pasta `client/dist/` com os ficheiros estáticos.

2. **Iniciar o servidor** (ou `npm run start` na raiz):

   ```bash
   cd server && npm start
   ```

   O Express serve:
   - O build React em `/`, `/articles`, `/partners`, etc.
   - Previews de clientes em `/:pais/:projeto` (ex: `/CY/VMC`)
   - Projetos lab em `/lab/:projeto` (ex: `/lab/ContactUs`)

### Internacionalização (i18n)

- **Idiomas:** Inglês (en), Português (pt-PT), Espanhol (es-ES), Grego (el-GR)
- **Geolocalização:** Deteção automática via [Kamero API](https://geo.kamero.ai) – PT, ES, GR, CY → idioma local; outros países → inglês
- **Seletor manual:** O utilizador pode alterar o idioma na navbar; a escolha fica em `localStorage`
- **Contexto:** `LocaleContext` + `useLocale()` com função `t(key)` para traduções

### Rotas

| Rota | Descrição |
|------|-----------|
| `/` | Página principal (React SPA) |
| `/articles` | Artigos |
| `/partners` | Parceiros |
| `/:pais/:projeto` | Preview de cliente (ex: `/CY/VMC`, `/PT/ProjetoX`) |
| `/lab/:projeto` | Experiência lab (ex: `/lab/ContactUs`) |

**Nota:** Novos países em `previews_clientes/` (ex: `ES`, `GR`) funcionam automaticamente sem alterar código – o proxy e o servidor reconhecem qualquer pasta válida.

## Pré-requisitos

- Node.js 18+
- npm

## Instalação

```bash
# Dependências do client
cd client && npm install

# Dependências do server
cd server && npm install
```

### Scripts na raiz

```bash
npm run build   # Instala e faz build do client
npm run start   # Inicia o servidor Express
```

## Variáveis de Ambiente

Para dados sensíveis (API keys, etc.), criar ficheiros `.env` **localmente**. Estes ficheiros estão no `.gitignore` e **não são commitados**.

- `client/.env` – variáveis do frontend (ex: `VITE_API_URL`)
- `server/.env` – variáveis do backend (ex: `PORT`, `NODE_ENV`)

## Deploy (Vercel)

1. Conectar o repositório em [vercel.com](https://vercel.com) → New Project
2. Root Directory: `./` (raiz do projeto)
3. Framework Preset: **Other**
4. O `vercel.json` define: `buildCommand`, `installCommand` e `functions` (entry: `src/server.js`)

O `src/server.js` na raiz re-exporta `server/src/server.js`. O Express corre como função serverless e serve o React, previews e lab.

## Segurança

- Ficheiros `.env` e `.env.*` estão no `.gitignore`
- Nunca commitar credenciais, API keys ou tokens
- O servidor valida nomes de pastas (`isValidName`) para prevenir path traversal
- Erros HTML escapados com `escapeHtml()` para prevenir XSS
- Script Phosphor Icons carregado com SRI e `crossorigin`
# studio17
