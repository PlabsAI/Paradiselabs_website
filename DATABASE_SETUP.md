# Database Setup for Windows

Quick guide to set up the PostgreSQL database for the waitlist feature.

## Steps

1. Download and install PostgreSQL for Windows:
   https://www.postgresql.org/download/windows/
   - Keep the default port (5432)
   - Remember your postgres user password

2. Create a `.env` file in the project root with:
   ```
   DATABASE_URL="postgresql://postgres:your_password@localhost:5432/paradiselabs?schema=public"
   ```
   Replace `your_password` with your postgres password

3. Open Command Prompt and run:
   ```bash
   # Create the database
   psql -U postgres -c "CREATE DATABASE paradiselabs"

   # Generate Prisma client
   npx prisma generate

   # Run migrations to set up tables
   npx prisma migrate dev

   # This will seed the database with initial test entries (only needed once):
   # - test1@example.com (developer)
   # - test2@example.com (designer)
   # - test3@example.com (business)
   npx prisma db seed

   # After this initial setup, new waitlist entries will be saved automatically
   # and persist in the database. You won't need to run the seed command again.
   ```

4. Start the servers:
   ```bash
   npm run dev
   ```

The waitlist entries should now be visible in the admin dashboard 

## Troubleshooting

If you can't see the entries:
1. Verify PostgreSQL is running (check Services in Task Manager)
2. Confirm your DATABASE_URL is correct in .env
3. Try resetting the database (WARNING: this will clear all entries and re-run seeding):
   ```bash
   npx prisma migrate reset --force
   ```
   Note: Only use this if you want to start fresh. It will remove all waitlist entries
   and restore only the initial test data.

## Note About TypeScript

If you see TypeScript errors in VS Code:
1. Open Command Palette (Ctrl+Shift+P)
2. Type "TypeScript: Restart TS Server"
3. Press Enter
