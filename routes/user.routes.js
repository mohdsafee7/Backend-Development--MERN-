import express from 'express';
import { db } from '../db/index.js';
import { usersTable } from '../models/index.js';
import { eq } from 'drizzle-orm';
import { randomBytes, createHmac } from 'crypto';
const router = express.Router();

router.post('/signup', async (req, res) => {
  const { firstname, lastname, email, password } = req.body;

  // if(!firstname)    return res.status(400).json({error: 'firstname is requires'}); 
  // we are going to use Zod for validating these fields

  const [existingUser] = await db.select({
    id: usersTable.id,
  }).from(usersTable).where(eq(usersTable.email, email));

  //if user exist
  if(existingUser)
      return res
        .status(400)
        .json({ error: `User with email ${email} already exists!`});
  
  const salt = randomBytes(256).toString('hex');
  const hashedPassword = createHmac('sha256', salt).update(password).digest('hex');


  const [user] = await db.insert(usersTable).values({
    email,
    firstname,
    lastname,
    salt,
    password: hashedPassword,
  }).returning({ id: usersTable.id });


  return res.status(201).json({ data: { userId: user.id } } );
})

export default router;