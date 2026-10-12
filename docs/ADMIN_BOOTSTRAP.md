# Controlled Administrator Provisioning

WellSpring intentionally does not seed a default administrator account.

1. Register a normal account through the application using the intended administrator's unique email address.
2. Confirm the account exists in the correct database and verify the email/identity through your organization's approved process.
3. Connect to the production database using an authorized, audited administrative connection. Never put credentials in Git or chat.
4. Run the following parameterized operation through your database client, replacing the placeholder with the verified email address:

   ```sql
   UPDATE users
   SET role = 'ADMIN'
   WHERE email = '<verified-admin-email>' AND role = 'USER';
   ```

5. Verify exactly one intended row was updated. If zero or more than one row was affected, stop and investigate.
6. Sign out and sign in again so the account receives a fresh token reflecting the updated role.
7. Record the approval and operator in your organization's access-control audit trail. Periodically review and remove administrator access when no longer required.

Do not expose a public endpoint that allows users to assign themselves the ADMIN role. Do not use a shared/default administrator password. For a real organization, prefer centralized identity, MFA, and an audited privileged-access workflow.
