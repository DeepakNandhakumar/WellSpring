# WellSpring Production Readiness Checklist

Do not call the application production-ready until all applicable items are verified.

## Repository and secrets
- [ ] Rotate any database password or JWT secret previously committed.
- [ ] Remove tracked `node_modules`, `dist`, and `target` artifacts from the current Git tree.
- [ ] Confirm no real credentials or private data exist in tracked files.
- [ ] Review dependency vulnerabilities and update supported dependencies after testing.

## Build and tests
- [ ] `cd app && npm ci && npm run lint && npm run build`
- [ ] `cd wellspring-backend && mvn test && mvn package`
- [ ] Add meaningful automated tests for authentication, authorization, validation, and persistence.
- [ ] Verify database initialization/migration on a fresh, isolated database.

## Security
- [ ] Activate the `prod` Spring profile.
- [ ] Configure a unique, strong `JWT_SECRET` through the hosting secret manager.
- [ ] Configure managed MySQL credentials through private environment variables.
- [ ] Restrict `CORS_ALLOWED_ORIGINS` to the actual HTTPS frontend origin(s).
- [ ] Confirm all admin operations enforce server-side ADMIN authorization.
- [ ] Confirm passwords are hashed and there is no default admin account/password.
- [ ] Confirm logs and error responses do not expose secrets, tokens, SQL or personal data.
- [ ] Review token expiry, logout behavior, rate limiting and account abuse protections.
- [ ] Use TLS and restrict database network access to the backend host where supported.

## Live end-to-end checks
- [ ] Frontend loads over HTTPS and nested routes survive refresh.
- [ ] Backend health endpoint responds correctly.
- [ ] Registration and login succeed with a new test account.
- [ ] Invalid credentials and invalid form inputs are rejected safely.
- [ ] User-only endpoints reject anonymous requests.
- [ ] Admin endpoints reject ordinary users and allow only verified admins.
- [ ] Data created/updated/deleted through the UI persists in the database.
- [ ] Contact/support form persists a message and admin access is restricted.
- [ ] Browser console and network panel show no failed API calls or CORS errors.
- [ ] Database backups and recovery process are configured and tested.

## Deployment notes
- Frontend Vercel project root: `app`; build command `npm run build`; output directory `dist`.
- Frontend environment variable: `VITE_API_URL=https://<your-api-host>/api`.
- Backend container: repository-root `Dockerfile`.
- Backend environment variables: `DB_URL`, `DB_USERNAME`, `DB_PASSWORD`, `JWT_SECRET`, `CORS_ALLOWED_ORIGINS`, optional `JWT_EXPIRATION` and platform `PORT`.
- Provision managed MySQL separately; this repository does not provision a database provider.
- Configure DNS, HTTPS, health checks, monitoring, backups and alerting in the hosting provider.

A checklist item must be marked complete only after it has been tested and evidence recorded. Source code and configuration alone do not establish that the deployed system works.
