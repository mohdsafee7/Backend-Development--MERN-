require('dotenv/config'); // Load environment variables from .env file
const db = require('./src/index');

// dotenv.config(); // Initialize dotenv to read the .env file

const { userTable} = require('./src/db/schema')
async function getAllUsers() {
  const users = await db.select().from(userTable);
  console.log(`Users in DB `, users);
  return users;
}

async function createUser(id, name, email){
  await db.insert(userTable).values({
    id,
    name,
    email,
  });
}

// createUser(1, 'Mohd Safee', 'mohdsafee@example.com');
// createUser(2, 'Akku', 'ak@example.com');


getAllUsers(); //drizzle orm converts the result into an array of objects with keys matching the column names defined in the schema.
