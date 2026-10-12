# WellSpring — Preventive Health Intelligence Platform

WellSpring is a full-stack health-awareness application built with React, TypeScript, Vite, Java, Spring Boot, Spring Security, JWT and MySQL.

## Features in the existing codebase
- Disease awareness and prevention information
- Medicinal plant and Ayurvedic educational content
- Diet-plan browsing
- BMI, sleep, symptom-checking and wellness utilities
- User authentication and role-protected administration
- Support/contact workflow

Feature availability and production behavior must be verified with the test checklist; source presence alone is not proof that every workflow is fully functional.

> **Health disclaimer:** WellSpring is for general education, not diagnosis or treatment. Symptom results and wellness content must not replace advice from a qualified healthcare professional. Seek urgent medical help for emergency symptoms. Do not start, stop or change medication based on this app.

## Repository layout
- `app/` — React + TypeScript + Vite frontend
- `wellspring-backend/` — Spring Boot REST API

## Requirements
- Node.js LTS and npm
- Java 17+
- Maven 3.8+ (or a Maven wrapper, if added)
- MySQL 8+ or a permitted remote/managed MySQL instance

## Local development
1. Create an empty development database named `wellspring_db` using your approved MySQL environment. If MySQL cannot be installed on your organisation laptop, use an organisation-approved remote development database or a permitted development environment; do not put production credentials in your local files.
2. Flyway applies the versioned schema and educational-content migrations on backend startup. Do not run schema or seed SQL manually.
3. Set backend environment variables in your terminal or IDE run configuration:
   - `DB_URL` — JDBC URL for the development database
   - `DB_USERNAME`
   - `DB_PASSWORD`
   - `JWT_SECRET` — a random secret used only for local development
   - `CORS_ALLOWED_ORIGINS=http://localhost:5173`
4. Start the API from `wellspring-backend/` with `mvn spring-boot:run`.
5. Create an untracked `app/.env.local` containing:
   ```dotenv
   VITE_API_URL=http://localhost:8080/api
   ```
6. In `app/`, run `npm ci` then `npm run dev`.

Never commit `.env.local`, passwords, signing keys, database dumps or real customer/health information.

## Build and test
Frontend, from `app/`:
```bash
npm ci
npm run lint
npm run build
```

Backend, from `wellspring-backend/`:
```bash
mvn test
mvn package
```

Run the tests against an isolated test database. Do not point tests at production data. See the [Production Readiness Checklist](docs/PRODUCTION_CHECKLIST.md), [Test Report](docs/TEST_REPORT.md), [Dependency Audit](docs/DEPENDENCY_AUDIT.md), and [controlled administrator provisioning](docs/ADMIN_BOOTSTRAP.md).

## Production configuration
Backend environment variables:
- `PORT` — hosting platform port (defaults to 8080)
- `DB_URL`, `DB_USERNAME`, `DB_PASSWORD` — managed MySQL connection
- `JWT_SECRET` — strong, random, private signing key
- `JWT_EXPIRATION` — token lifetime in milliseconds
- `CORS_ALLOWED_ORIGINS` — exact deployed frontend origin(s), comma-separated

Frontend:
- `VITE_API_URL` — absolute HTTPS API base URL ending in `/api`

Do not deploy with empty secrets, default credentials, broad CORS rules or demo admin accounts. Use TLS, database backups, restricted database network access, monitored health checks and a migration-controlled schema. Review all authorization rules and seed data before public launch.

## Security notice
Credentials or JWT keys previously committed to Git must be treated as compromised and rotated. Updating a file does not remove secrets from Git history. Dependency/build folders previously committed must be removed from repository tracking in a dedicated cleanup change; `.gitignore` alone does not untrack existing files.

## Deployment status
Deployment is not claimed complete by this README. First pass the build/test checklist, configure the hosting provider and managed database, deploy the API, set the frontend API URL, then verify registration, login, protected routes and persisted CRUD flows against the live services.

No license is currently specified.
