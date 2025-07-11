# Tamo Junto Autenticação

Tela de autenticação Next.js baseada no Figma, com login/cadastro seguro, mobile first, pronto para produção.

## 🚀 Tecnologias
- Next.js (App Router, TypeScript)
- Tailwind CSS
- Shadcn UI
- NextAuth (email/senha + Google)
- Prisma ORM + PostgreSQL (Docker para dev)
- react-hook-form + Zod
- SOLID, boas práticas, pronto para deploy na Vercel

## 📦 Instalação e uso local

1. **Clone o projeto:**
   ```bash
   git clone <repo-url>
   cd desafio-tecnico-grupo-siberia
   ```
2. **Copie o arquivo de variáveis de ambiente:**
   ```bash
   cp .env.example .env
   # Edite o .env conforme necessário
   ```
3. **Suba o banco de dados (Docker):**
   ```bash
   docker compose -f prisma/docker-compose.yml up -d
   ```
4. **Rode as migrações do Prisma:**
   ```bash
   npx prisma migrate dev --name init
   ```
5. **Instale as dependências:**
   ```bash
   npm install
   ```
6. **Inicie o projeto:**
```bash
npm run dev
```

Acesse: [http://localhost:3000/login](http://localhost:3000/login)

## 📝 Funcionalidades
- Banner ilustrativo responsivo (desktop/mobile)
- Tabs "Entrar" e "Cadastrar" (Shadcn UI)
- Login com email/senha e Google
- Cadastro validado (nome, email, senha, confirmar senha)
- Redirecionamento para `/dashboard` após login/cadastro
- Middleware protegendo `/dashboard`
- Prisma User: id, name, email, password (hashed), image, provider
- Estrutura de pastas clara e SOLID

## 🌐 Deploy na Vercel
1. Configure as variáveis de ambiente no painel da Vercel conforme `.env.example`.
2. Use um banco PostgreSQL (ex: Vercel Postgres, Supabase, Neon).
3. Rode as migrações no ambiente de produção:
   ```bash
   npx prisma migrate deploy
   ```

## 📁 Estrutura de pastas
- `src/components/` - Componentes de UI
- `src/lib/` - Helpers e instâncias
- `src/hooks/` - Hooks customizados
- `src/middlewares/` - Middlewares Next.js
- `src/schemas/` - Schemas Zod
- `prisma/` - Schema, seeds, migrations, docker-compose

## 🔒 Segurança
- Senhas sempre hashadas (bcryptjs)
- JWT via NextAuth
- Middleware protegendo rotas

## 🎨 Figma
- [Link do Figma: Tamo Junto Autenticação](#) <!-- Substitua pelo link real -->

---

Projeto desenvolvido para desafio prático de autenticação, mobile first, seguro e pronto para produção.
