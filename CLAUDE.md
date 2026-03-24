# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Commands

```bash
npm run dev      # Start development server with ts-node --esm
npm run build    # Compile TypeScript and copy swagger.json to dist/
npm run start    # Start production server
```

## Architecture Overview

**Pattern**: MVC with ES modules, async/await, and TypeScript

**Entry Point**: `src/server.ts` - initializes DB, seeds roles, starts Express server

**Core Flow**:
1. `src/app.ts` - Express app setup with CORS, JSON parser, rate limiting, and route mounting
2. Routes (`src/routes/*.ts`) - Define endpoints with Swagger documentation
3. Controllers (`src/controllers/*.ts`) - Handle requests, interact with models
4. Models (`src/models/*.ts`) - Mongoose schemas with business logic
5. Middlewares (`src/middlewares/*.ts`) - Auth, rate limiting, caching, role checks

**Data Pipeline**:
- `POST /server/incoming_data` receives data with `CL-X-TOKEN` and `CL-X-EVENT-ID` headers
- Validates account via `app_secret_token`, looks up destinations
- Adds job to BullMQ `dataQueue` (Redis-backed)
- `src/workers/dataProcessor.worker.ts` processes jobs, forwards data to destinations via axios
- Logs success/failure to `Log` model

**Authentication**:
- JWT tokens issued on login/register (`src/utils/generateToken.ts`)
- `protect` middleware (`src/middlewares/auth.middleware.ts`) validates Bearer token
- Role-based access control via `role.middleware.ts`

**Key Models**:
- `User` - email, password (bcrypt hashed), timestamps
- `Account` - multi-tenant accounts with `app_secret_token`
- `AccountMember` - user-account associations
- `Destination` - target URLs with HTTP method and headers
- `Log` - event tracking with status (success/failed)

## Environment Variables

Required in `.env`:
- `PORT` - Server port (default: 3000)
- `MONGO_URL` - MongoDB connection string
- `REDIS_HOST` - Redis host (default: 127.0.0.1)
- `REDIS_PORT` - Redis port (default: 6379)
- `JWT_SECRET` - JWT signing secret

## Swagger Documentation

Config in `src/config/swagger.json`, served at `GET /api-docs`
