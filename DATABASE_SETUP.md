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

   # Seed the database with existing test entries
   npx prisma db seed
   ```

4. If you get an error about missing seed command, add this to package.json:
   ```json
   {
     "prisma": {
       "seed": "node prisma/seed.js"
     }
   }
   ```

5. Start the servers:
   ```bash
   npm run dev
   ```

The waitlist entries should now be visible in the admin dashboard 

## Troubleshooting

If you can't see the entries:
1. Verify PostgreSQL is running (check Services in Task Manager)
2. Confirm your DATABASE_URL is correct in .env
3. Try resetting and reseeding the database:
   ```bash
   npx prisma migrate reset --force
   npx prisma db seed
