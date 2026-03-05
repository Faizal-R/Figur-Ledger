# 💎 Figur Ledger

[![Turborepo](https://img.shields.io/badge/built%20with-Turborepo-000000.svg?style=flat-square&logo=turborepo)](https://turbo.build/)
[![TypeScript](https://img.shields.io/badge/TypeScript-5.x-blue.svg?style=flat-square&logo=typescript)](https://www.typescriptlang.org/)
[![Next.js](https://img.shields.io/badge/Next.js-15.x-black.svg?style=flat-square&logo=next.js)](https://nextjs.org/)
[![Microservices](https://img.shields.io/badge/Architecture-Microservices-orange?style=flat-square)](https://microservices.io/)

**Figur Ledger** is a premium, enterprise-grade financial ledger system built on a modern microservices architecture. Designed for scalability, security, and a superior user experience, it provides a comprehensive suite of banking and financial services—from core account management to complex loan processing and real-time notifications.

---

## 🚀 Vision

To provide a robust, transparent, and aesthetically elite financial platform that bridges the gap between complex backend banking logic and a seamless, high-performance user interface.

## 🏗️ System Architecture

The project is structured as a **Monorepo** managed by **Turborepo**, ensuring efficient builds, shared configurations, and a unified development experience.

### Backend Infrastructure

- **API Gateway:** A centralized entry point (`apps/api-gateway`) handling routing, JWT authentication, rate limiting, and request orchestration.
- **Domain Microservices:**
  - **`auth-service`**: Identity management, secure registration, and multi-role authentication.
  - **`user-account-service`**: Managing user profiles and various types of financial accounts (Savings, Current, etc.).
  - **`transaction-service`**: The core ledger engine, processing high-integrity financial movements using **PostgreSQL** and **Prisma**.
  - **`loan-credit-service`**: End-to-end loan lifecycle management, including product definitions, applications, and EMI scheduling.
  - **`payment-billing-service`**: Facilitating biller management and utility payments.
  - **`notification-service`**: An event-driven service listening to **RabbitMQ** for real-time email and system alerts.
  - **`report-analytics-service`**: Data-intensive service for generating deep financial insights and account statements.

### Frontend Excellence

- **`apps/web`**: A state-of-the-art **Next.js** application featuring the **"EliteTheme"**—a dark, glassmorphic design system using **Tailwind CSS**, **Framer Motion**, and **shadcn/ui**.

### Shared Packages (`/packages`)

- `messaging-sdk`: Standardized RabbitMQ communication patterns.
- `shared`: Common logic, middleware, and constants.
- `types`: Unified TypeScript definitions across the entire stack.
- `ui`: Reusable design system components.
- `handlers`: Standardized error and response handling.

---

## ✨ Key Features

### 🏦 For Customers

- **Unified Dashboard:** Real-time overview of balances, recent transactions, and loan statuses.
- **Secure Transactions:** Seamless fund transfers between internal and external accounts.
- **Loan Marketplace:** Browse loan products, simulate EMIs, and apply with ease.
- **Billing Center:** Save frequent billers and automate utility payments.
- **Rich Statements:** Generate and export detailed financial reports in various formats.

### 💼 For Employees

- **Loan Review Pipeline:** Comprehensive tools for evaluating and approving/rejecting loan applications.
- **Customer Support Tools:** Deep visibility into user accounts and transaction histories.
- **KYC/Profile Management:** Streamlined workflows for user verification and updates.

### 👑 For Administrators

- **System Governance:** Full control over loan product parameters and interest rates.
- **Biller Management:** Configure and manage the ecosystem of utility providers.
- **Analytics & Reporting:** High-level insights into system performance and financial health.

---

## 🛠️ Tech Stack

| Layer                | Technologies                                                                        |
| :------------------- | :---------------------------------------------------------------------------------- |
| **Frontend**         | Next.js 15, React, TypeScript, Tailwind CSS, Framer Motion, TanStack Query, Zustand |
| **Backend**          | Node.js, Express.js, InversifyJS (DI), Zod                                          |
| **Data Persistence** | MongoDB (Mongoose), PostgreSQL (Prisma)                                             |
| **Message Broker**   | RabbitMQ                                                                            |
| **Infrastructure**   | Docker, Docker Compose, Turborepo                                                   |
| **Testing/Linting**  | ESLint, Prettier, TypeScript                                                        |

---

## 🚦 Getting Started

### Prerequisites

- **Node.js**: v18+
- **Docker & Docker Compose**: For running the microservices and databases.
- **NPM/PNPM**: For package management.

### Installation & Setup

1. **Clone the repository:**

   ```bash
   git clone https://github.com/Faizal-R/Figur-Ledger.git
   cd Figur-Ledger
   ```

2. **Install dependencies:**

   ```bash
   npm install
   ```

3. **Configure Environment:**
   Each service requires its own `.env` file. Follow the `.env.example` in each `/services/*` and `/apps/api-gateway` directory.

   ```bash
   # Example for Auth Service
   cp services/auth-service/.env.example services/auth-service/.env
   ```

4. **Launch with Docker:**
   Spin up the entire ecosystem (databases, broker, and services):

   ```bash
   docker-compose up --build -d
   ```

5. **Run the Web App Locally:**
   ```bash
   npm run dev --workspace=web
   ```

---

## 📖 Development Commands

- `npm run dev`: Run all services and apps in development mode.
- `npm run build`: Build all projects in the monorepo.
- `npm run lint`: Run linting across the entire codebase.
- `npm run format`: Standardize code formatting.

---

## 🤝 Contributing

Contributions are what make the open-source community such an amazing place to learn, inspire, and create. Any contributions you make are **greatly appreciated**.

1. Fork the Project
2. Create your Feature Branch (`git checkout -b feature/AmazingFeature`)
3. Commit your Changes (`git commit -m 'Add some AmazingFeature'`)
4. Push to the Branch (`git push origin feature/AmazingFeature`)
5. Open a Pull Request

---

## ⚖️ License

Distributed under the MIT License. See `LICENSE` for more information.

---

<p align="center">
  Built with ❤️ by the Figur Ledger Team
</p>
