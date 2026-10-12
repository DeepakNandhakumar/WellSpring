# Frontend Dependency Audit

The `production-readiness` branch updates the lockfile to compatible patched versions, including Axios 1.20.0 and React Router 7.18.4. CI runs:

```bash
npm audit --omit=dev --audit-level=high
```

This production-dependency audit passed on the tested branch commit before the latest documentation/CI-only changes.

## Remaining development-tooling advisories

The full audit previously reported eight remaining advisories in development/build tooling, including the Tailwind CSS 3.4.x dependency chain (`chokidar`, `braces`, `micromatch`, and `postcss-selector-parser`). The reported advisories did not have compatible fixes within the existing Tailwind CSS 3.x dependency range at the time of that run.

These are not production runtime dependencies, but they still matter to developer/build environments. Plan a separate, tested Tailwind CSS major-version migration with its associated plugins rather than applying a forced upgrade blindly.

Re-run `npm audit` before each production release because advisory databases and available patched versions change over time. Do not treat an earlier audit result as a permanent guarantee.
