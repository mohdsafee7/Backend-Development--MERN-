import express from 'express';
import db from '../db/index.js';
import { usersTable, userSessions } from '../db/schema.js'
import {eq} from 'drizzle-orm';
import {randomBytes, createHmac} from 'node:crypto';
import { error } from 'node:console';

const router = express.Router();

router.get('/', (req, res)=>{

})

router.post('/signup', async (req, res)=>{
  const {name, email, password} = req.body; //extracting data from request body

  const [existingUser] = await db
  .select({
    email: usersTable.email,
  })
  .from(usersTable)
  .where(eq(usersTable.email, email));

  if(existingUser){
    return res.status(400).json({error: `User with email ${email} already exists`});
  }

  const salt = randomBytes(256).toString('hex'); // Generate a random salt for password hashing 
  const hashedPassword = createHmac('sha256', salt).update(password).digest('hex'); // Hash the password using HMAC with the generated salt
  //sha256 is a hashing algorithm that produces a fixed-size output (256 bits) regardless of the input size. It is commonly used for password hashing and data integrity verification.
  //digest('hex') converts the hashed output into a hexadecimal string representation.

  const [user] = await db.insert(usersTable).values({
    name,
    email,
    password: hashedPassword,
    salt,
  }).returning({id: usersTable.id});

  return res.status(201).json({status: 'success', data: {userId: user.id}});
});

router.post('/login', async (req, res)=>{
  const { email, password } = req.body;

   const [existingUser] = await db
  .select({
    id: usersTable.id,
    email: usersTable.email,
    salt: usersTable.salt,
    password: usersTable.password,
  })
  .from(usersTable)
  .where(eq(usersTable.email, email));

  if(!existingUser){
    return res.status(404).json({error: `User with email ${email} does not exist`});
  }

  const salt = existingUser.salt; // Retrieve the salt associated with the user from the database
  const existingHash = existingUser.password; // Retrieve the stored hashed password from the database

  const newHash = createHmac('sha256', salt).update(password).digest('hex'); // Hash the provided password using the same salt and algorithm

  if(newHash !== existingHash){
    return res.status(401).json({error: 'Incorrect password'});
  }

  //Generate a seesion for user
  const [session] = await db.insert(userSessions).values({
    userId: existingUser.id,
  })
  .returning({id: userSessions.id});

  return res.json({status: 'success', sessionId: session.id});

});

export default router;