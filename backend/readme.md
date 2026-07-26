### Key Architectural Highlights

- **Unified Identity System**: Uses a shared `Person` entity for all personas, ensuring single-source logic for authentication, security, and credentials.
- **Clean Layered Architecture**:
    - **Entities**: Domain models with encapsulated business logic.
    - **Repositories**: Abstracted data access layer using Drizzle ORM.
    - **Services**: Pure business logic isolation.
    - **Controllers & DTOs**: Strict request/response validation and handling.
- **Centralized Response Engine**: A unified `callService` middleware handles all success/error responses consistently across the API.
- **Role-Based Access Control (RBAC)**: Secure middleware protecting routes based on persona permissions.

```mermaid
flowchart LR
    A[Client / External Request] --> B[Controller + DTO]
    B --> C[Service]
    C --> D[Repository + DAO]
    D --> E[Entity / Model]
    E --> F[(Database)]
```

- Controller + DTO handle incoming requests and response shape.
- Service contains the business logic.
- Repository + DAO communicate with the database.
- Entity stores the core domain model that is persisted.


## 🛠 Tech Stack

- **Runtime**: Node.js & TypeScript
- **Framework**: Express.js
- **Database**: SQLite (Local-first, high performance)
- **ORM**: Drizzle ORM (Type-safe, lightweight)
- **Authentication**: JWT (JSON Web Tokens) with AuthPayload union types.
- **File Handling**: Multer for vendor shop and food image uploads.
- **Utility**: Bcrypt for high-security password hashing.

## 📊 Database Design

The project uses a relational schema optimized for SQLite:
- **Person**: Core credentials and common identity data.
- **Vendor**: Business-specific details linked to a Person ID.
- **Customer**: Profile data linked to a Person ID.
- **Food/Cart**: Managed relationship for order fulfillment.


```

## 📜 Available Scripts

| Script | Description |
| :--- | :--- |
| `npm run dev` | Starts the server with `nodemon` for auto-reloading. |
| `npm run build` | Compiles TypeScript to production JavaScript. |
| `npm run start` | Runs the compiled application. |
| `npm run db:push` | Syncs `schema.ts` with the SQLite database. |
| `npm run db:studio` | Opens Drizzle Studio for visual database management. |

## 🏗 Project Structure

```text
src/
├── api/
│   ├── controller/   # Request handlers & Response formatting
│   ├── entity/       # Business domain entities (Rich Models)
│   ├── services/     # Core Business Logic
│   ├── repos/        # Data Access (Repository Pattern)
│   ├── dto/          # Data Transfer Objects & Interfaces
│   ├── middleware/   # Auth, Upload, and Response wrappers
│   └── utils/        # Auth helpers & Error classes
├── infrastructure/
│   ├── database/     # Drizzle schema & connectivity
│   └── daos/         # Physical data access objects
└── index.ts          # Application entry point
```




