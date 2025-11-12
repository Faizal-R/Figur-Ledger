# Auth Service

Authentication microservice built with Clean Architecture principles.

## 🏗️ Architecture

This service follows Clean Architecture with clear separation of concerns:

```
src/
├── domain/                 # Enterprise Business Rules
│   ├── entities/          # Domain entities (Auth, Token)
│   └── repositories/      # Repository interfaces
├── application/           # Application Business Rules
│   ├── interfaces/        # Service interfaces (Hash, JWT)
│   └── use-cases/         # Use cases (Register, Login, etc.)
├── infrastructure/        # Frameworks & Drivers
│   ├── database/          # Database connection & Prisma
│   ├── repositories/      # Repository implementations
│   ├── security/          # Security implementations (Bcrypt, JWT)
│   ├── http/              # HTTP layer (Controllers, Routes, Middleware)
│   └── config/            # Configuration files
├── shared/                # Shared utilities
│   ├── errors/            # Custom error classes
│   └── utils/             # Utility functions
└── di/                    # Dependency Injection container
```

## 🚀 Getting Started

### Prerequisites

- Node.js >= 18
- PostgreSQL >= 14
- npm/yarn/pnpm

### Installation

1. Install dependencies:
```bash
npm install
```

2. Copy environment variables:
```bash
cp .env.example .env
```

3. Update `.env` with your database credentials and secrets

4. Generate Prisma client:
```bash
npm run prisma:generate
```

5. Run database migrations:
```bash
npm run prisma:migrate
```

### Development

```bash
npm run dev
```

### Production

```bash
npm run build
npm start
```

## 📡 API Endpoints

### Authentication

- `POST /api/v1/auth/register` - Register new user
- `POST /api/v1/auth/login` - Login user
- `POST /api/v1/auth/refresh-token` - Refresh access token
- `POST /api/v1/auth/logout` - Logout user
- `GET /api/v1/auth/verify` - Verify access token

### Health Check

- `GET /health` - Service health check

## 🧪 Testing

```bash
npm test
```

## 📝 Environment Variables

See `.env.example` for all required environment variables.

## 🔒 Security Features

- Password hashing with bcrypt
- JWT-based authentication
- Token refresh mechanism
- CORS protection
- Helmet security headers
- Input validation

## 📦 Database Schema

### Auth Table
- id (UUID)
- email (String, unique)
- password (String, hashed)
- createdAt (DateTime)
- updatedAt (DateTime)

### RefreshToken Table
- id (UUID)
- token (String, unique)
- userId (UUID, FK)
- expiresAt (DateTime)
- createdAt (DateTime)

## 🛠️ Tech Stack

- **Framework**: Express.js
- **Language**: TypeScript
- **Database**: PostgreSQL
- **ORM**: Prisma
- **Authentication**: JWT + Bcrypt
- **Validation**: express-validator
- **Security**: Helmet + CORS

## 📚 Design Patterns

- Clean Architecture
- Dependency Injection
- Repository Pattern
- Use Case Pattern
- Singleton Pattern (Container)

## 🔄 Dependency Flow

```
Infrastructure → Application → Domain
```

Dependencies point inward, following the Dependency Rule of Clean Architecture.
