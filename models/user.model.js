import { uuid } from 'drizzle-orm/pg-core';
import { pgTable, integer, varchar } from 'drizzle-orm/pg-core';

export const usersTable = pgTable('users', {
  id: uuid().primaryKey().defaultRandom(),

})