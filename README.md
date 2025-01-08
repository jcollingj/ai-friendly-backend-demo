# AI-Friendly Backend Template

A sample backend template that leverages AI tooling to create a fully typed, auto-documented API server.

## Features

- **Type Safety**: End-to-end type safety from database to API endpoints using Prisma and TypeBox
- **Auto-Documentation**: Automatic Swagger documentation generation for API exploration and testing
- **AI-Optimized**: Structured for efficient AI-assisted development using tools like Cursor
- **Production Ready**: Includes deployment configuration for Railway and database integration with Supabase
- **Developer Experience**: Streamlined workflow for rapid iteration and schema changes

## Tech Stack

- **Database**: Supabase (PostgreSQL)
- **ORM**: Prisma
- **Backend Framework**: Elysia
- **Schema Validation**: TypeBox
- **Deployment**: Railway
- **Development**: Cursor (AI-assisted IDE)

## Project Structure

- `Dockerfile` - Container configuration for building

- `prisma/`
  - `schema.prisma` - Database schema definition 

- `src/`
  - `endpoints/` - API endpoint handlers
    - `...` - Individual endpoint files
  - `server.ts` - Main Alesia application
  - `types.ts` - Typebox schemas and type definitions
  - `db.ts` - Database operations and queries
  - `p_db.md` - Database-related prompt
  - `p_endpoints.md` - Endpoint-related prompt
  - `p_types.md` - Type-related prompt



## How It Works

This repository is designed to make AI-assisted backend development smooth and reliable. Here's how it works:

### 1. Database Schema as Source of Truth
The database schema (in `prisma/schema.prisma`) serves as the single source of truth. After making changes to your database in Supabase:

1. Run `bunx prisma db pull && bunx prisma generate` to update your local schema
2. The Prisma schema provides the foundation for generating the rest of your backend

### 2. Prompts as Documentation
The `src/p_*.md` files serve as both documentation and AI prompts:

- `p_types.md` - Templates for generating TypeBox schemas
- `p_db.md` - Templates for database operations
- `p_endpoints.md` - Templates for API endpoints

These prompts ensure consistent code generation and serve as documentation for the codebase patterns.

### 3. AI-Assisted Code Generation
Using Cursor (or similar AI-enabled IDE):

1. Select the file you want to update
2. Use CMD+K to open the inline editor
3. Reference relevant schema and prompt files
4. Describe your changes
5. Let the AI generate the appropriate code

For example, after adding a new table:

