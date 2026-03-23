
const {pgTable, varchar, uuid, text, index} = require('drizzle-orm/pg-core');
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
/*
Here's a breakdown of what's happening:

index('title_index'): This creates an index named title_index on the booksTable.
.using("gin", sqlto_tsvector('english', ${table.title})): This specifies the gin index method and the expression to be indexed. The expression to_tsvector('english', ${table.title}) creates a text search vector from the title field of the booksTable.
*/

module.exports = {
  booksTable,
}