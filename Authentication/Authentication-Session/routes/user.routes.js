import express from 'express';
import db from '../db/index.js';
import { usersTable, userSessions } from '../db/schema.js'
import {eq} from 'drizzle-orm';
import {randomBytes, createHmac, sign} from 'node:crypto';
import jwt from 'jsonwebtoken'
const router = express.Router();
import { ensureAuthenticated } from '../middleware/auth.middleware.js';

//update
router.patch('/', ensureAuthenticated, async (req, res)=>{
  const {name} = req.body;
  await db.update(usersTable).set({name}).where(eq(usersTable.id, user.id));

  return res.json({status : 'success'});
})


//get the current logged-in user details
router.get('/',ensureAuthenticated, async (req, res)=>{
  return res.json({ user: req.user});
})

//signup route for user registration
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
  //sha256 is a hashing algorithm that produces a fixed-size output (256 bits) regardless of the input size. It is commonly used for password 
  // hashing and data integrity verification. digest('hex') converts the hashed output into a hexadecimal string representation.

  const [user] = await db.insert(usersTable).values({
    name,
    email,
    password: hashedPassword,
    salt,
  }).returning({id: usersTable.id});

  return res.status(201).json({status: 'success', data: {userId: user.id}});
});



//login route for user authentication
router.post('/login', async (req, res)=>{
  const { email, password } = req.body;

   const [existingUser] = await db
  .select({
    id: usersTable.id,
    email: usersTable.email,
    name: usersTable.name,
    salt: usersTable.salt,
    password: usersTable.password,
    role: usersTable.role,
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
 
  const payload = { // Create a payload for the JWT token that includes user information
    id : existingUser.id,
    email : existingUser.email,
    name : existingUser.name,
    role: existingUser.role,
  };

  console.log('Login route working fine...');
  
  // Generate a JWT token using the payload and a secret key from environment variables. The token will be used for authenticating subsequent requests.
  const token = jwt.sign(payload, process.env.JWT_SECRET, {expiresIn: '1h'}); 
  //expiresIn: '1h' option can be added to set an expiration time for the token, after which it will no longer be valid.
  // const token = sign(payload, process.env.JWT_SECRET, { expiresIn: '1h' });

  return res.json({status: 'success', token });

});

export default router;