# WellSpring — Preventive Health Intelligence Platform

Full-stack health-awareness project built with React, TypeScript, Vite, Java, Spring Boot, Spring Security, REST APIs, and MySQL.

## Main features
- Disease awareness and prevention information
- Medicinal plants, Ayurvedic topics, and diet-plan content
- BMI, sleep, symptom-checking, and wellness utilities
- User authentication and role-based admin features

> **Disclaimer:** Educational information only; not a substitute for professional medical advice, diagnosis, or treatment.

## Repository layout
- `app/` — React + TypeScript frontend
- `wellspring-backend/` — Spring Boot API

## Local setup
1. Install Java 17+, Maven, Node.js, and MySQL.
2. Create a local MySQL database named `wellspring_db`.
3. Configure backend environment variables: `DB_URL`, `DB_USERNAME`, `DB_PASSWORD`, `JWT_SECRET`, and optionally `JWT_EXPIRATION` and `CORS_ALLOWED_ORIGINS`.
4. Run the backend from `wellspring-backend/` with `mvn spring-boot:run`.
5. In `app/`, create an untracked `.env.local` containing `VITE_API_URL=http://localhost:8080/api`.
6. Run `npm install` and `npm run dev` inside `app/`.

## Checks
Frontend: `npm run build` and `npm run lint` from `app/`.
Backend: `mvn test` and `mvn package` from `wellspring-backend/`.

These are suggested checks; this documentation update does not claim they have been executed.

## Security notes
- Never commit local `.env` files, database passwords, or token-signing keys.
- Rotate credentials that were committed previously; editing the latest file does not erase Git history.
- Review seed data and remove known demo/admin credentials before production.
- Use a strong unique JWT key, restrict CORS to trusted origins, and review authorization before deployment.
- Generated build output and dependency directories should not be tracked.

WellSpring is a learning/health-awareness application. Verify medical information with qualified professionals. No license is currently specified.