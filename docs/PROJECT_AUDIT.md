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
2. **High — generated content tracked:** the cleanup branch tree still included roughly 28,714 paths under `node_modules`, plus frontend build and backend target artifacts. Ignore rules do not remove files already tracked.
3. **High — seed credentials:** existing seed SQL includes a known demo/admin account pattern. Production must not initialize a default administrator. Review and replace seed initialization before launch.
4. **High — schema strategy:** the existing schema SQL starts by dropping tables. It must never be executed against production. Production profile should validate a migration-managed schema instead.
5. **High — deployment settings:** production frontend URL, database credentials, JWT secret, CORS and hosting port need environment-based configuration.
6. **Medium — automated coverage:** no dedicated backend test source tree was visible in the inspected cleanup branch. End-to-end workflows still need automated coverage and live verification.
7. **Health content review:** seed data contains medical and herbal claims, including treatment-like directions. Review against authoritative clinical sources, remove unsupported claims and present clear educational disclaimers.

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
- Tracked generated directories still require removal from the Git tree.
- Seed SQL still requires a safe production initialization redesign.
- Authentication, authorization, endpoint contracts, health content, and all UI flows need test-driven review.

## Exit criteria
Use `docs/PRODUCTION_CHECKLIST.md`; do not mark production-ready until CI passes, secrets are rotated, repository artifacts are removed, all critical security findings are resolved, and deployed end-to-end workflows are verified.
