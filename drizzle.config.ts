import dotenv from 'dotenv';
import { defineConfig } from 'drizzle-kit';

dotenv.config({ path: '.env' });

export default defineConfig({
  schema: './src/lib/db/schema.ts',
  dialect: 'postgresql',
  dbCredentials: {
    url: process.env.POSTGRES_URL!,
    ssl: {
      rejectUnauthorized: false // This bypasses the certificate validation
    }
  },
  tablesFilter: ['portfolio_*'],
});
