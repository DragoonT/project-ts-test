## Requirements

Install the following before starting:

* Node.js 22+
* Git
* One of the following databases:
  * SQLite (recommended for local development)
  * PostgreSQL 16+
  * SQL Server 2022+

<div align="center">

![Next.js](https://img.shields.io/badge/Next.js-000000?style=for-the-badge&logo=nextdotjs&logoColor=white)
![TypeScript](https://img.shields.io/badge/TypeScript-3178C6?style=for-the-badge&logo=typescript&logoColor=white)
![Prisma](https://img.shields.io/badge/Prisma-2D3748?style=for-the-badge&logo=prisma&logoColor=white)
![SQLite](https://img.shields.io/badge/SQLite-003B57?style=for-the-badge&logo=sqlite&logoColor=white)
![PostgreSQL](https://img.shields.io/badge/PostgreSQL-4169E1?style=for-the-badge&logo=postgresql&logoColor=white)
![SQL Server](https://img.shields.io/badge/SQL%20Server-CC2927?style=for-the-badge&logo=microsoftsqlserver&logoColor=white)

</div>

Verify installation:

```bash
node -v
npm -v
git --version
```

---

## Quick Start

Create a new project:

```bash
npx create-next-app@latest <project-name> --typescript --tailwind --app --s

cd <project-name>

npm install lucide-react
```
or
```bash
npx create-next-app@latest <project-name> --typescript --tailwind --app --src-dir

cd <project-name>

npm install lucide-react

```

### Clone Existing Project

```bash
git clone https://github.com/DragoonT/project-ts-test.git <project-name>

cd <project-name>

npm install
npm install lucide-react
```

If you encounter TLS/certificate issues:

### PowerShell

```powershell
$env:NODE_TLS_REJECT_UNAUTHORIZED="0"
```

### Command Prompt (CMD)

```cmd
set NODE_TLS_REJECT_UNAUTHORIZED=0
```

---

### Project Structure (app & src)

```text
project-name/
├── prisma/
│   ├── schema.prisma
│   ├── migrations/
│   └── seed.ts
├── public/
│   ├── images/
│   ├── icons/
│   └── favicon.ico
├── app/
│   ├── layout.tsx
│   ├── page.tsx
│   ├── api/                 # API routes
│   ├── auth/                # Authentication pages
│   └── (app)/               # Protected application pages
├── src/
│   ├── generated/
│   │   └── prisma/
│   ├── hooks/
│   │   └── useFetch.ts
│   ├── components/         # You must be create your icon etc by yourself
│   │   ├── ui/
│   │   ├── auth/
│   │   ├── dashboard/
│   │   └── layouts/
│   └── lib/
│       ├── prisma.ts
│       ├── auth.ts
│       ├── permissions.ts
│       ├── api.ts
│       └── utils.ts
├── .env
├── next.config.ts
├── prisma.config.ts
├── package.json
└── tsconfig.json
```

### Project Structure (src-dir)

```text
project-name/
├── prisma/
│   ├── schema.prisma
│   ├── migrations/
│   └── seed.ts
├── public/
│   ├── images/
│   ├── icons/
│   └── favicon.ico
├── src/
│   ├── app/
│   │   ├── layout.tsx
│   │   ├── page.tsx
│   │   ├── api/                 # API routes
│   │   ├── auth/                # Authentication pages
│   │   └── (app)/               # Protected application pages
│   ├── generated/
│   │   └── prisma/
│   ├── hooks/
│   │   ├── useFetch.ts
│   │   └── useTheme.ts
│   ├── components/              # You must be create your icon etc by yourself
│   │   ├── ui/
│   │   ├── auth/
│   │   ├── dashboard/
│   │   ├── forms/
│   │   └── layouts/
│   ├── lib/
│   │   ├── prisma.ts
│   │   ├── auth.ts
│   │   ├── permissions.ts
│   │   ├── api.ts
│   │   └── utils.ts
│   └── types/
│       └── index.ts
├── .env
├── next.config.ts
├── prisma.config.ts
├── package.json
├── tsconfig.json
└── README.md
```

---

## Environment Variables

### SQLite

```env
DATABASE_URL="file:./dev.db"
```

### PostgreSQL

```env
DATABASE_URL="postgresql://username:password@localhost:5432/database_name"
```

### SQL Server

```env
DATABASE_URL="sqlserver://localhost:1433;database=database_name;user=username;password=password;trustServerCertificate=true"
```

### Application

```env
NEXT_PUBLIC_APP_URL="http://localhost:3000"
SESSION_SECRET=""

RESEND_API_KEY=""

GOOGLE_CLIENT_ID=""
GOOGLE_CLIENT_SECRET=""

GITHUB_CLIENT_ID=""
GITHUB_CLIENT_SECRET=""

STRIPE_SECRET_KEY=""
NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY=""
```

or

```env
DATABASE_URL="file:./dev.db"
SESSION_SECRET="dev-secret-change-me"
NEXT_PUBLIC_APP_URL="http://localhost:3000"
NEXT_PUBLIC_APP_NAME="Project"
```

---

## Database

Generate Prisma Client:

```bash
npx prisma generate
```

Create and run migrations:

```bash
npm run db:migrate
```

Seed the database:

```bash
npm run db:seed
```

or in SQLite with easy

```bash
npx prisma db push
npx prisma generate
npm run dev
```

and for you want to see data in prisma database

```bash
npx prisma studio
```

open brownser:

```text
http://localhost:5555
```

Supported providers:

- SQLite
- PostgreSQL
- SQL Server


---

## Development

Start development server:

```bash
npm run dev
```

Open:

```text
http://localhost:3000
```

---

## Build

```bash
npm run build
npm run start
```
---

## Credit

* Learning NextPolyglot from splitteam (P'Jack)
* DragoonT create all of this Project with no icon ui
