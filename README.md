# Data Pusher

A Node.js/TypeScript backend API service for managing and pushing data to configured destinations.

## Features

- **Authentication & Authorization** - JWT-based authentication with role-based access control
- **Account Management** - Multi-account support with team members
- **Destination Management** - Configure and manage data destinations
- **Data Handling** - API endpoints for data operations and transformation
- **Background Processing** - Queue-based data processing using BullMQ
- **Caching** - Redis integration for performance optimization
- **Rate Limiting** - Request rate limiting to protect API endpoints
- **Activity Logging** - Comprehensive logging of system activities
- **API Documentation** - Swagger/OpenAPI interactive documentation

## Tech Stack

- **Runtime**: Node.js with TypeScript
- **Framework**: Express.js 5.x
- **Database**: MongoDB with Mongoose ODM
- **Cache/Queue**: Redis with BullMQ
- **Authentication**: JWT (jsonwebtoken) + bcrypt
- **Validation**: express-validator
- **API Docs**: swagger-jsdoc + swagger-ui-express

## Project Structure

```
src/
├── app.ts                 # Express app configuration
├── server.ts              # Application entry point
├── config/                # Configuration files
│   ├── db.ts              # MongoDB connection
│   ├── redis.ts           # Redis connection
│   ├── bull.ts            # BullMQ queue setup
│   └── seedRoles.ts       # Role seeding on startup
├── controllers/           # Request handlers
│   ├── auth.controller.ts
│   ├── account.controller.ts
│   ├── dataHandler.controller.ts
│   ├── destination.controller.ts
│   └── log.controller.ts
├── middlewares/           # Express middlewares
│   ├── auth.middleware.ts
│   ├── role.middleware.ts
│   ├── cache.middleware.ts
│   └── rateLimit.middleware.ts
├── models/                # MongoDB schemas
│   ├── user.model.ts
│   ├── account.model.ts
│   ├── accountMember.model.ts
│   ├── destination.model.ts
│   ├── log.model.ts
│   └── role.model.ts
├── routes/                # API route definitions
│   ├── auth.routes.ts
│   ├── account.routes.ts
│   ├── dataHandler.routes.ts
│   ├── destination.routes.ts
│   └── log.routes.ts
├── workers/               # Background job processors
│   └── dataProcessor.worker.ts
├── utils/                 # Helper utilities
│   └── generateToken.ts
└── types/                 # TypeScript type definitions
```

## Getting Started

### Prerequisites

- Node.js 18+
- MongoDB
- Redis

### Installation

1. Clone the repository:
   ```bash
   git clone <repository-url>
   cd data-pusher
   ```

2. Install dependencies:
   ```bash
   npm install
   ```

3. Create a `.env` file with required environment variables:
   ```env
   PORT=3000
   MONGODB_URI=mongodb://localhost:27017/data-pusher
   REDIS_HOST=localhost
   REDIS_PORT=6379
   JWT_SECRET=your-secret-key
   ```

4. Run the development server:
   ```bash
   npm run dev
   ```

### Available Scripts

- `npm run dev` - Start development server with ts-node
- `npm run build` - Compile TypeScript and copy config files
- `npm run start` - Start production server

## API Endpoints

### Authentication
- `POST /api/auth/register` - Register new user
- `POST /api/auth/login` - Login and get JWT token

### Accounts
- Account management endpoints

### Destinations
- Destination configuration endpoints

### Data Handler
- Data processing endpoints

### Logs
- Activity log endpoints

## API Documentation

Access the Swagger documentation at `http://localhost:3000/api-docs` when the server is running.

## License

MIT - see [LICENSE](LICENSE) for details.
