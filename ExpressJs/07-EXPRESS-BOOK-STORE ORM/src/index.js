require('dotenv/config');

const {drizzle} = require('drizzle-orm/node-postgres');

const db = drizzle(process.env.DATABASE_URL, {
  log: ['error', 'warn', 'query'], //log all queries, errors and warnings to the console
});

module.exports = db;