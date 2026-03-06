
const {pgTable,uuid, varchar} = require('drizzle-orm/pg-core');

const authorsTable = pgTable('authors', {
  id: uuid().primaryKey().defaultRandom(),
  firstname: varchar({length: 100}).notNull(),
  lastnmae: varchar({length: 40}),
  email: varchar({length: 30}).unique(),
});

module.exports = authorsTable;