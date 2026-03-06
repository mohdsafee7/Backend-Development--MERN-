
const {pgTable, integer, varchar, uuid, text} = require('drizzle-orm/pg-core');
const authorsTable = require('./author.schema')
const booksTable = pgTable('books', {
  id: uuid().primaryKey().defaultRandom(),
  title: varchar({length: 100}).notNull(),
  author: varchar({length: 100}).notNull(),
  description: text(),
  authorId: uuid().references(()=>authorsTable.id).notNull(),
})


module.exports = {
  booksTable,
}