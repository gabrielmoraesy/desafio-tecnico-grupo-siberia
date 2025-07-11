# 🔐 Sistema de Autenticação - Grupo Sibéria

Sistema completo de autenticação desenvolvido com Next.js, featuring login/cadastro com email/senha e integração Google OAuth. Design responsivo e mobile-first, pronto para produção.

## ✨ Características

- 🚀 **Next.js 15** com App Router e TypeScript
- 🎨 **Design System** com Tailwind CSS e Shadcn/ui
- 🔒 **Autenticação Segura** com NextAuth.js
- 📱 **Mobile First** - Totalmente responsivo
- 🗃️ **Banco de Dados** Prisma ORM + PostgreSQL
- ✅ **Validação** react-hook-form + Zod
- 🔐 **Segurança** Hash de senhas com bcryptjs

## 🛠️ Tecnologias

| Categoria | Tecnologia |
|-----------|------------|
| **Frontend** | Next.js 15, TypeScript, Tailwind CSS |
| **UI Components** | Shadcn/ui, Radix UI |
| **Autenticação** | NextAuth.js, Google OAuth |
| **Banco de Dados** | Prisma ORM, PostgreSQL |
| **Validação** | Zod, react-hook-form |
| **Estilização** | Tailwind CSS, CSS Modules |

## 📦 Instalação e Configuração

### Pré-requisitos
- Node.js 18+ 
- npm ou yarn
- Docker (para desenvolvimento local)

### 1. Clone o Repositório
```bash
git clone https://github.com/gabrielmoraesy/desafio-tecnico-grupo-siberia.git
cd desafio-tecnico-grupo-siberia
```

### 2. Instale as Dependências
```bash
npm install
```

### 3. Configure as Variáveis de Ambiente
```bash
cp .env.example .env
```

Edite o arquivo `.env` com suas configurações:
```env
# PostgreSQL
DATABASE_URL="postgresql://postgres:postgres@localhost:5432/tamojunto"

# NextAuth
NEXTAUTH_URL="http://localhost:3000"
NEXTAUTH_SECRET="your-nextauth-secret"

# Google OAuth (opcional)
GOOGLE_CLIENT_ID="your-google-client-id"
GOOGLE_CLIENT_SECRET="your-google-client-secret"
```

### 4. Configure o Banco de Dados

**Opção A: Docker (Recomendado para desenvolvimento)**
```bash
docker compose -f prisma/docker-compose.yml up -d
```

**Opção B: PostgreSQL local ou em nuvem**
- Configure a `DATABASE_URL` no `.env`

### 5. Execute as Migrações
```bash
npx prisma migrate dev --name init
npx prisma generate
```

### 6. Inicie o Servidor de Desenvolvimento
```bash
npm run dev
```

🎉 **Acesse:** [http://localhost:3000/login](http://localhost:3000/login)

## � Estrutura do Projeto

```
src/
├── app/                    # App Router (Next.js 13+)
│   ├── api/               # API Routes
│   │   ├── auth/          # NextAuth endpoints
│   │   ├── register/      # Registro de usuários
│   │   ├── db-test/       # Teste de conexão DB
│   │   └── migrate/       # Migração de produção
│   ├── dashboard/         # Página protegida
│   ├── login/            # Página de autenticação
│   ├── globals.css       # Estilos globais
│   ├── layout.tsx        # Layout principal
│   └── page.tsx          # Página inicial
├── assets/               # Imagens e recursos estáticos
├── components/           # Componentes React
│   ├── Forms/           # Formulários de login/registro
│   ├── TabsAuth/        # Componente de tabs
│   └── ui/              # Componentes UI (Shadcn)
├── lib/                 # Utilitários e configurações
│   ├── prisma.ts        # Cliente Prisma
│   └── utils.ts         # Funções auxiliares
├── providers/           # Providers React
├── schemas/             # Schemas de validação (Zod)
├── types/               # Tipos TypeScript
└── middleware.ts        # Middleware de autenticação

prisma/
├── migrations/          # Migrações do banco
├── docker-compose.yml   # PostgreSQL para desenvolvimento
└── schema.prisma        # Schema do banco de dados
```

## 🚀 Scripts Disponíveis

```bash
npm run dev         # Servidor de desenvolvimento
npm run build       # Build para produção
npm run start       # Servidor de produção
npm run lint        # Linter ESLint
npx prisma studio   # Interface visual do banco
npx prisma generate # Gera o cliente Prisma
```

## � Funcionalidades de Autenticação

### 📝 Registro de Usuário
- Validação de nome, email e senha
- Confirmação de senha
- Hash seguro da senha (bcryptjs)
- Prevenção de emails duplicados

### 🔑 Login
- **Email/Senha:** Autenticação tradicional
- **Google OAuth:** Login social integrado
- Sessões seguras com JWT
- Redirecionamento automático

### 🛡️ Proteção de Rotas
- Middleware automatizado
- Redirecionamento para login
- Gerenciamento de sessões

## 🎨 Interface

- **Design Responsivo:** Mobile-first approach
- **Tabs Interativas:** Alternância fluida login/cadastro
- **Validação em Tempo Real:** Feedback instantâneo
- **Loading States:** UX aprimorada
- **Toast Notifications:** Feedback de ações

## 🔒 Segurança

- ✅ Hash de senhas com bcryptjs
- ✅ Validação client/server-side
- ✅ Proteção CSRF
- ✅ Sanitização de inputs
- ✅ Middleware de autenticação
- ✅ Variáveis de ambiente seguras

## � Produção

### Configuração Google OAuth
1. Acesse [Google Cloud Console](https://console.cloud.google.com)
2. Configure **Authorized JavaScript origins**
3. Configure **Authorized redirect URIs**

### Deploy
O projeto está otimizado para deploy em plataformas modernas:
- Vercel (recomendado)
- Railway
- Heroku
- AWS

## 📄 Licença

Este projeto foi desenvolvido como desafio técnico para o **Grupo Sibéria**.

---

Desenvolvido com ❤️ por [Gabriel Moraes](https://github.com/gabrielmoraesy)
