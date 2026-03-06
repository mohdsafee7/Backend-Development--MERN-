require('dotenv/config');
const { defineConfig } = require('drizzle-kit');

const config = defineConfig({
  out: './drizzle',
  schema: './models',
  dialect: 'postgresql',
  dbCredentials: {
    url: process.env.DATABASE_URL,
  },
});

module.exports = config;