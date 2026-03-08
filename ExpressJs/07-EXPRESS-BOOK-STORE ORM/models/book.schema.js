
const {pgTable, integer, varchar, uuid, text, index} = require('drizzle-orm/pg-core');
const authorsTable = require('./author.schema');
const { sql } = require('drizzle-orm');

const booksTable = pgTable('books', {
  id: uuid().primaryKey().defaultRandom(),
  title: varchar({length: 100}).notNull(),
  // author: varchar({length: 100}).notNull(),
  description: text(),
  authorId: uuid().references(()=>authorsTable.id).notNull(),
}, (table) =>({
  titleIndex: index('title_index').using("gin", sql`to_tsvector('english', ${table.title})`),
}))


module.exports = {
  booksTable,
}