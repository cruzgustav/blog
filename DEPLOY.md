# 📚 VORTEK BLOG - Guia Completo de Deploy

## Visão Geral

Vortek Blog é uma plataforma de blog SaaS construída com:
- **Next.js 16** com App Router
- **Prisma ORM** com SQLite (dev) / Turso (produção)
- **Tailwind CSS 4** + shadcn/ui
- **TypeScript**

---

## 🚀 Deploy no Cloudflare Pages

### Pré-requisitos

1. Conta no [Cloudflare](https://dash.cloudflare.com/sign-up)
2. Conta no [Turso](https://turso.tech) (banco de dados - plano gratuito)
3. Node.js 18+ ou Bun instalado
4. Git

---

### Passo 1: Configurar Banco de Dados (Turso)

O Turso é um banco SQLite otimizado para edge/serverless, perfeito para Cloudflare Pages.

```bash
# Instalar CLI do Turso
curl -sSfL https://get.turso.tech/install.sh | bash

# Fazer login
turso auth login

# Criar banco de dados
turso db create vortek-blog

# Obter URL de conexão
turso db show vortek-blog
# Anote a URL: libsql://seu-banco.turso.io

# Criar token de autenticação
turso db tokens create vortek-blog
# Anote o token
```

### Passo 2: Configurar Schema do Banco

```bash
# Clone o projeto
git clone <seu-repo>
cd vortek-blog

# Instalar dependências
bun install

# Criar arquivo .env
cp .env.example .env
```

Edite o `.env`:
```env
DATABASE_URL="libsql://seu-banco.turso.io"
TURSO_AUTH_TOKEN="seu-token-aqui"
NEXTAUTH_SECRET="gere-uma-chave-longa-e-aleatoria"
NEXTAUTH_URL="https://seu-projeto.pages.dev"
```

```bash
# Gerar cliente Prisma
bun run db:generate

# Aplicar schema ao banco
bun run db:push

# Rodar seed para dados iniciais
bunx bun prisma/seed.ts
```

---

### Passo 3: Deploy no Cloudflare Pages

#### Opção A: Deploy via Dashboard (Recomendado)

1. Acesse [Cloudflare Pages](https://dash.cloudflare.com/?to=/:account/pages)
2. Clique em **"Create a project"** → **"Connect to Git"**
3. Selecione seu repositório GitHub/GitLab
4. Configure o build:
   - **Framework preset**: Next.js
   - **Build command**: `bun run build:cf`
   - **Build output directory**: `.vercel/output/static`

5. Adicione variáveis de ambiente:
   ```
   DATABASE_URL=libsql://seu-banco.turso.io
   TURSO_AUTH_TOKEN=seu-token-aqui
   NEXTAUTH_SECRET=sua-chave-secreta-longa
   NEXTAUTH_URL=https://seu-projeto.pages.dev
   ```

6. Clique em **"Save and Deploy"**

#### Opção B: Deploy via CLI

```bash
# Login no Cloudflare
bunx wrangler login

# Build do projeto
bun run build:cf

# Deploy
bun run cf:deploy
```

---

### Passo 4: Configurar Domínio Personalizado (Opcional)

1. No dashboard do Cloudflare Pages, vá em **"Custom domains"**
2. Clique em **"Set up a custom domain"**
3. Digite seu domínio (ex: `blog.vortek.com`)
4. Siga as instruções para configurar DNS

---

## 🔧 Desenvolvimento Local

```bash
# Instalar dependências
bun install

# Configurar ambiente
cp .env.example .env
# Edite o .env com suas configurações locais

# Gerar cliente Prisma
bun run db:generate

# Aplicar schema
bun run db:push

# Rodar seed (dados iniciais)
bunx bun prisma/seed.ts

# Iniciar servidor de desenvolvimento
bun run dev
```

Acesse: http://localhost:3000

**Nota**: Em desenvolvimento local, o projeto usa SQLite com Node.js runtime. Em produção (Cloudflare Pages), usa Turso com Edge Runtime.

---

## 📁 Estrutura do Projeto

```
vortek-blog/
├── prisma/
│   ├── schema.prisma      # Schema do banco de dados
│   └── seed.ts            # Dados iniciais
├── public/                # Arquivos estáticos
├── src/
│   ├── app/               # App Router (páginas)
│   │   ├── page.tsx       # Home
│   │   ├── artigo/[slug]/ # Página de artigo
│   │   └── admin/         # Painel admin
│   ├── components/        # Componentes React
│   │   ├── blocks/        # Blocos de conteúdo
│   │   └── ui/            # Componentes UI (shadcn)
│   ├── hooks/             # Custom hooks
│   └── lib/               # Utilitários
├── .env.example           # Variáveis de ambiente (template)
├── next.config.ts         # Configuração Next.js
├── package.json           # Dependências
├── wrangler.toml          # Configuração Cloudflare
├── DEPLOY.md              # Este arquivo
└── README.md              # Documentação principal
```

---

## 🔐 Autenticação

O sistema usa sessões personalizadas com cookies.

**Credenciais padrão (após seed):**
- Email: `admin@vortek.com`
- Senha: `admin123`

⚠️ **IMPORTANTE**: Altere as credenciais em produção!

---

## 🎨 Personalização

### Tema e Cores

As cores estão definidas em `src/app/globals.css`:

```css
:root {
  --background: 0 0% 100%;
  --foreground: 240 10% 3.9%;
  --accent: 239 84% 67%;  /* Roxo principal */
  /* ... */
}

.dark {
  --background: 240 10% 3.9%;
  --foreground: 0 0% 98%;
  --accent: 239 84% 67%;
  /* ... */
}
```

### Logo e Nome

Edite o componente de header em:
- `src/app/page.tsx` (home)
- `src/app/artigo/[slug]/article-client.tsx` (artigo)

---

## 🐛 Troubleshooting

### Erro: "Database connection failed"

1. Verifique se a DATABASE_URL e TURSO_AUTH_TOKEN estão corretos
2. Confirme se o token do Turso não expirou
3. Teste a conexão:
   ```bash
   turso db shell vortek-blog
   ```

### Erro: "Build failed"

1. Verifique os logs de build no Cloudflare
2. Certifique-se que todas as dependências estão no package.json
3. Teste localmente:
   ```bash
   bun run build:cf
   ```

### Erro no desenvolvimento local

Se tiver problemas com Prisma local:
```bash
# Regenerar cliente
bun run db:generate

# Recriar banco
bun run db:push
bunx bun prisma/seed.ts
```

---

## 📦 Scripts Disponíveis

| Script | Descrição |
|--------|-----------|
| `bun run dev` | Servidor de desenvolvimento |
| `bun run build` | Build padrão (Node.js) |
| `bun run build:cf` | Build para Cloudflare Pages |
| `bun run lint` | Verificar código |
| `bun run db:push` | Aplicar schema ao banco |
| `bun run db:generate` | Gerar cliente Prisma |

---

## 📞 Suporte

- **Documentação Next.js**: https://nextjs.org/docs
- **Documentação Prisma**: https://www.prisma.io/docs
- **Cloudflare Pages**: https://developers.cloudflare.com/pages
- **Turso**: https://docs.turso.tech

---

## 📄 Licença

MIT License - Sinta-se livre para usar e modificar.

---

**Desenvolvido com ❤️ pela equipe Vortek**
