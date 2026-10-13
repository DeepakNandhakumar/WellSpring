# WellSpring — Preventive Health Intelligence Platform

WellSpring is a full-stack health-awareness web application for exploring general wellness information and using simple lifestyle tools. It brings together disease-awareness content, medicinal plant information, diet and wellness guidance, and personal health utilities in one interface.

> **Health disclaimer:** WellSpring is an educational wellness project, not a medical device or diagnostic service. Symptom-checker output and general wellness content must not replace advice from a qualified healthcare professional. Seek urgent medical care for emergency symptoms.

## Features

- Public pages for disease awareness, medicinal plants, about, contact, privacy, and terms.
- Account registration and login with JWT-based authentication.
- Personal dashboard with diet, Ayurvedic information, BMI, sleep, yoga/exercise, symptom-checking, and health to-do tools.
- Admin pages for managing health content and reviewing support messages.
- Role-protected frontend routes backed by Spring Security API authorization.

Availability and behaviour of each feature must be verified against the running backend and database; the feature list describes the intended application modules.

## Technology

| Layer | Stack |
| --- | --- |
| Frontend | React, TypeScript, Vite, Tailwind CSS, React Router |
| API | Java 17, Spring Boot, Spring Security, REST, JWT |
| Persistence | MySQL, Spring Data JPA |
| Frontend HTTP client | Axios |
| Build | npm, Maven |

## Repository structure

- `app/` — React frontend.
- `wellspring-backend/` — Spring Boot API.
- `DEPLOYMENT.md` — local setup, environment variables, container builds, deployment architecture, and readiness checklist.

## Local setup

### 1. Frontend

Use an approved Node.js installation. From the frontend directory:

```sh
cd app
cp .env.example .env.local
npm ci
npm run dev
```

Set `VITE_API_URL` in `.env.local` to the API base URL, normally `http://localhost:8080/api` for local development. Vite environment variables are visible to the browser; never put credentials or secrets in them.

### 2. Backend and database

Use an approved Java 17, Maven, and MySQL development environment. Create a database named `wellspring_db`. For a brand-new empty database only, run the `schema.sql` and `data.sql` scripts once as described in `DEPLOYMENT.md`; do not run the seed script against an existing database because its sample relationships assume fresh IDs. The application does not auto-run SQL scripts at startup. Then configure these environment variables for the backend process:

- `DB_URL`
- `DB_USERNAME`
- `DB_PASSWORD`
- `JWT_SECRET` — use a strong, unique random secret
- `CORS_ALLOWED_ORIGINS` — the exact frontend origin, normally `http://localhost:5173`
- Optional: `JWT_EXPIRATION`, `PORT`, and `JPA_DDL_AUTO` (use `validate` in production after schema provisioning)

See `wellspring-backend/.env.example` for a template. Spring Boot does not automatically load that example file; configure the values in your shell or approved secret manager.

From `wellspring-backend/`:

```sh
mvn test
mvn spring-boot:run
```

Do not install MySQL, Docker, or other development tools on a managed organisation device without IT approval.

### 3. Verify a build

From `app/`:

```sh
npm run lint
npm run build
```

From `wellspring-backend/`:

```sh
mvn test
mvn package
```

A successful build is not by itself proof that authentication, persistence, or deployment works end-to-end. Follow the checklist in `DEPLOYMENT.md` and test against the actual configured database and API.

## Deployment

The frontend can be hosted as a static Vite application with the project root set to `app`. The backend needs a Java 17-compatible container host and a reachable managed MySQL database. Configure production environment variables in the host's secret settings, set `VITE_API_URL` to the deployed HTTPS API base URL, and restrict CORS to the actual frontend origin.

Container build files are provided for the frontend and backend. Deployment is not considered production-ready until the real API, database, authentication, authorization, CORS, and direct route refresh have been verified.

## Security notes

- Never commit `.env` files containing real values, database credentials, JWT secrets, or tokens.
- Rotate any credential that was previously exposed in a repository or commit history.
- Enforce permissions on the backend; frontend route guards alone are not a security boundary.
- Use HTTPS and a managed secret store in deployed environments.
- Avoid entering sensitive personal or medical information into a demo application unless its privacy and security controls have been formally assessed.

## Project

Repository: https://github.com/DeepakNandhakumar/WellSpring
