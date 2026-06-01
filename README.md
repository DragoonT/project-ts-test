## Requirements

Install the following before starting:

* Node.js 22+
* Git
* One of the following databases:
  * SQLite (recommended for local development)
  * PostgreSQL 16+
  * SQL Server 2022+

Verify installation:

```bash
node -v
npm -v
git --version
```

---

### Project Structure

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
│   ├── components/
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


---

## Create Project

```bash
npx create-next-app@latest project-name \
  --typescript \
  --tailwind \
  --app \
  --src-dir
```

Install dependencies:

```bash
npm install
npm install lucide-react
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

Supported providers:

- SQLite
- PostgreSQL
- SQL Server
```

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
<div align="center">

![Next.js](https://img.shields.io/badge/Next.js-000000?style=for-the-badge&logo=nextdotjs&logoColor=white)
![TypeScript](https://img.shields.io/badge/TypeScript-3178C6?style=for-the-badge&logo=typescript&logoColor=white)
![Prisma](https://img.shields.io/badge/Prisma-2D3748?style=for-the-badge&logo=prisma&logoColor=white)
![SQLite](https://img.shields.io/badge/SQLite-003B57?style=for-the-badge&logo=sqlite&logoColor=white)
![PostgreSQL](https://img.shields.io/badge/PostgreSQL-4169E1?style=for-the-badge&logo=postgresql&logoColor=white)
![SQL Server](https://img.shields.io/badge/SQL%20Server-CC2927?style=for-the-badge&logo=microsoftsqlserver&logoColor=white)

</div>