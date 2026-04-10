import { timestamp } from "drizzle-orm/pg-core";
import { integer, pgTable, varchar, uuid, text, pgEnum} from "drizzle-orm/pg-core";

export const userRoleEnum = pgEnum('user_role', ['USER', 'ADMIN']); // Define an enum type for user roles, which can be either 'USER' or 'ADMIN'. 
// This will be used to specify the role of each user in the database.

export const usersTable = pgTable("users", {
  id: uuid().primaryKey().defaultRandom(),
  name: varchar({ length: 255 }).notNull(),
  email: varchar({ length: 255 }).notNull().unique(),
  password: text().notNull(),
  salt: text().notNull(), // for password hashing it is used to make password more secure by adding random string to it
  role: userRoleEnum('user_role').default('USER').notNull(), // Add a 'role' column to the users table, which uses the defined enum type. The default value is set to 'USER', and it cannot be null.
});


export const userSessions = pgTable("user_sessions", {
  id: uuid().primaryKey().defaultRandom(),
  userId: uuid().references(() => usersTable.id).notNull(),
  createdAt: timestamp().defaultNow().notNull(),
})