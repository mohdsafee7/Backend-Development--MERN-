const dotenv = require('dotenv');
dotenv.config(); // Load environment variables from .env file
const { defineConfig } = require('drizzle-kit');

const config = defineConfig({
  dialect : 'postgresql',
  out: './drizzle',
  schema: './src/db/schema.js',
  dbCredentials: {
    url:process.env.DATABASE_URL,
  },
});

module.exports = config;