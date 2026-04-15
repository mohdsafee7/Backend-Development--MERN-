// Drizzle config - a configuration file that is used by Drizzle Kit and contains all the information
//  about your database connection, migration folder and schema files.

import 'dotenv/config';
import { defineConfig } from 'drizzle-kit';

export default defineConfig({
  out: './drizzle', // The folder where the generated migration files will be stored.
  schema: './models/index.js', // The folder where your schema files are located.
  dialect: 'postgresql', // The database dialect you are using (e.g., 'postgresql', 'mysql', 'sqlite').
  dbCredentials: {
    url: process.env.DATABASE_URL, // The database connection URL, typically stored in an environment variable for security.
  },
})