# WellSpring setup and deployment

WellSpring is a full-stack application with a Vite/React/TypeScript frontend, a Java 17/Spring Boot REST API, and a MySQL database.

## Before starting

- Use only development tools and database services approved by your organisation.
- Never commit real database credentials, JWT signing keys, access tokens, or production environment files.
- If any real secret was previously committed, rotate it. Removing it from the latest commit does not invalidate the exposed secret or erase it from Git history.
- This is a health-awareness application, not a medical diagnostic service. Symptom results and lifestyle suggestions must not be presented as a professional diagnosis.

## Frontend: local development

1. Open a terminal in the app directory.
2. Copy app/.env.example to app/.env.local and set VITE_API_URL to the API base URL. Vite variables are public browser configuration; never put secrets in them.
3. Install dependencies using the lockfile: npm ci.
4. Start the frontend: npm run dev.
5. Validate the production bundle: npm run build.

## Backend: local development

1. Use an approved Java 17 and Maven installation.
2. Create a MySQL database named wellspring_db using your approved local or development database service.
3. Configure DB_URL, DB_USERNAME, DB_PASSWORD, and a strong random JWT_SECRET in your local environment. See wellspring-backend/.env.example for variable names; Spring Boot does not automatically load that example file.
4. Set CORS_ALLOWED_ORIGINS to the exact local frontend origin, normally http://localhost:5173.
5. From wellspring-backend, run mvn test, then mvn spring-boot:run.
6. Check the API health endpoint at http://localhost:8080/api/health if the endpoint is available in the current backend build.

MySQL is required by the current backend configuration. Do not install MySQL or Docker on a managed organisation laptop without IT approval.

## Deployment architecture

- Deploy the frontend as a static Vite site (for example, Vercel) with the project root set to app and VITE_API_URL set to the deployed backend's HTTPS API base URL ending in /api.
- Deploy wellspring-backend to a Java 17 container-capable host using its Dockerfile.
- Provision a separate managed MySQL database that is reachable from the backend host. The frontend must never connect directly to MySQL.
- Set DB_URL, DB_USERNAME, DB_PASSWORD, JWT_SECRET, JWT_EXPIRATION, CORS_ALLOWED_ORIGINS, and PORT in the backend host's secret/environment settings. Use the exact production frontend origin in CORS_ALLOWED_ORIGINS.
- Use a unique randomly generated JWT signing secret of at least 32 bytes; do not reuse any value that appeared in Git history.
- Confirm the backend health check, CORS, registration, login, role authorization, CRUD operations, and database persistence before calling the deployment production-ready.

## Container build

Frontend:

    docker build --build-arg VITE_API_URL=https://YOUR-BACKEND-HOST/api -t wellspring-frontend ./app

Backend:

    docker build -t wellspring-backend ./wellspring-backend

Provide backend environment variables at runtime through the hosting platform or approved secret manager. Do not bake secrets into Docker images.

## Readiness checklist

- [ ] Frontend npm ci, lint, and npm run build pass.
- [ ] Backend mvn test and package build pass.
- [ ] Registration and login work against the real API.
- [ ] Protected user routes and admin endpoints enforce server-side authorization.
- [ ] Data changes persist in MySQL and invalid input is rejected.
- [ ] CORS permits only the intended frontend origins.
- [ ] Secrets are rotated and stored outside source control.
- [ ] Direct navigation/refresh works for frontend routes.
- [ ] Mobile/responsive and accessibility checks pass.
- [ ] Backup, monitoring, and error logging are configured for the chosen host.

The configuration files in this repository are deployment foundations, not proof of a successful live deployment. Complete the checklist against the actual environment before describing the site as production-ready.
