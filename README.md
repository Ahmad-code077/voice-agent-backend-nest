# Voice Agent SaaS – NestJS Backend

This repository contains the **NestJS control plane** for a Voice Agent SaaS platform.

The backend is responsible for **call orchestration, multi-tenant access control, real-time streaming, and integrations**. All AI-heavy processing (STT, LLM, TTS) is intentionally delegated to a separate Python service.

This separation keeps the system reliable, scalable, and easy to reason about.

---

## High-Level Architecture

```
Telnyx (Calls & Media)
        │
        ▼
NestJS Backend (Authority Layer)
        │
        ├── Auth / Tenants / Billing
        ├── Call Lifecycle Management
        ├── WebSocket Gateways
        ├── Usage Tracking
        │
        ▼
Python AI Services (Workers)
        ├── Speech-to-Text
        ├── LLM Processing
        └── Text-to-Speech
```

**Important rule:**

- Telnyx never talks directly to Python
- Python never controls call flow

NestJS is the single source of truth.

---

## Core Responsibilities

This backend handles:

- Incoming Telnyx webhooks
- Call answering, routing, and termination
- Real-time audio streaming
- Tenant and role-based authorization
- Usage and billing metering
- Forwarding audio/text to AI services
- Streaming AI responses back to callers

It does **not**:

- Perform speech recognition
- Generate AI responses
- Synthesize audio

---

## Tech Stack

### Backend

- **Node.js 20+**
- **TypeScript (strict mode)**
- **NestJS** (Express adapter)
- **PostgreSQL** (shared multi-tenant database)
- **TypeORM** (ORM)
- **WebSockets** (real-time streaming)

### External Services

- **Telnyx** – Telephony & media streams
- **Python (FastAPI)** – STT, LLM, TTS

### Frontend (separate repo)

- Next.js
- TypeScript
- Tailwind + shadcn/ui

---

## Project Structure

```
src/
├── app.module.ts
├── main.ts
├── modules/
│   ├── auth/
│   ├── tenants/
│   ├── users/
│   ├── calls/
│   ├── telephony/
│   ├── ws/
│   ├── billing/
│   └── analytics/
└── common/
    ├── guards/
    ├── decorators/
    └── interceptors/
```

Each module is tenant-aware and isolated.

---

## Database Model (Simplified)

Key entities include:

- Tenant
- User
- Call
- AgentConfig
- UsageLog
- BillingRecord

All tables are scoped using `tenant_id`.

The Python service receives only:

- `call_id`
- `tenant_id`

It never mutates database state.

---

## Authentication & Authorization

### Authentication

- JWT-based authentication
- Designed to work with providers like **Clerk** or **Auth0**

### Authorization

- Tenant isolation enforced at the backend
- Role-based access:
  - OWNER
  - ADMIN
  - STAFF

Authorization is enforced using NestJS Guards.

---

## Real-Time Communication

- Telnyx → NestJS: Webhooks + Media Streams
- Frontend → NestJS: WebSockets
- NestJS → Python: WebSockets (binary + JSON)

All real-time flows are coordinated by NestJS.

---

## Getting Started

### Prerequisites

- Node.js 20+
- PostgreSQL
- Telnyx account
- Python AI service running separately

### Install Dependencies

```
npm install
```

### Run in Development

```
npm run start:dev
```

### Build for Production

```
npm run build
npm run start:prod
```

---

## Environment Variables

```
PORT=3000
DATABASE_URL=postgres://...
TELNYX_API_KEY=...
TELNYX_PUBLIC_KEY=...
AI_SERVICE_WS_URL=ws://python-service
```

---

## Design Principles

- Clear separation of concerns
- One authoritative backend
- Stateless AI workers
- Predictable call lifecycle
- Minimal magic, explicit logic

---

## Status

This project is under active development.

Architecture-first, features second.

---

## License

MIT
