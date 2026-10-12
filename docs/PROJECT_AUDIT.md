# WellSpring Initial Repository Audit

Audit scope: GitHub source tree on `main` and `security-repo-cleanup`. This is static source inspection, not a local execution or live deployment test.

## Existing architecture found
- React + TypeScript + Vite frontend under `app/`.
- Spring Boot REST API under `wellspring-backend/`.
- Spring Security and JWT authentication classes.
- JPA entities/repositories and MySQL schema/seed SQL.
- Public pages, authentication, wellness utilities, and admin pages.

## Findings
1. **Critical — credentials in repository history:** the original `main` configuration contained a database password and hard-coded JWT secret. Treat them as compromised and rotate them. Removing them from a later commit does not erase history.
2. **High — generated content tracked (remediation committed on this branch):** the starting cleanup branch tracked more than 26,000 generated dependency/build files. The `production-readiness` branch now removes `app/node_modules`, `app/dist`, `wellspring-backend/target`, and `.vscode` from the current tree; `.gitignore` prevents them being re-added. Previously committed blobs can still exist in Git history.
3. **High — seed credentials (remediated on this branch):** the starting seed script included a known demo/admin account pattern. That seed script was removed; the Flyway content migration creates no users or default credentials. Administrator access uses the controlled provisioning guide.
4. **High — schema strategy (remediated on this branch):** the starting schema script dropped tables. It has been replaced by versioned, non-destructive Flyway migrations; production validates the migrated schema and disables Spring SQL initialization.
5. **High — deployment settings:** production frontend URL, database credentials, JWT secret, CORS and hosting port need environment-based configuration.
6. **Medium — automated coverage:** no dedicated backend test source tree was visible in the inspected cleanup branch. End-to-end workflows still need automated coverage and live verification.
7. **Health content review:** herbal remedy seed directions have been replaced with neutral educational guidance and the symptom checker no longer presents rule matches as AI diagnosis or clinical confidence. Disease, diet and plant content still requires clinical/editorial review before being represented as medically authoritative.

## Changes started on `production-readiness`
- Expanded ignore rules for generated artifacts and local secrets.
- Changed default backend configuration to environment-based credentials and reduced verbose logging.
- Added a production Spring profile that validates the schema and disables SQL initialization.
- Added a Vercel SPA route fallback.
- Added a root Dockerfile for the backend.
- Added a GitHub Actions workflow for frontend lint/build and backend test/package.
- Updated setup/security/deployment documentation.

## Not yet verified
- No local build/test command has been executed in this audit.
- No deployment or live API/database integration has been performed.
- Generated dependency/build artifacts have been removed from the current branch tree; old Git history may still contain them.
- Flyway migration and safe educational seed data are in place; content still needs qualified clinical/editorial review.
- Authentication, authorization, endpoint contracts, health content, and all UI flows need test-driven review.

## Exit criteria
Use `docs/PRODUCTION_CHECKLIST.md`; do not mark production-ready until CI passes, secrets are rotated, repository artifacts are removed, all critical security findings are resolved, and deployed end-to-end workflows are verified.
