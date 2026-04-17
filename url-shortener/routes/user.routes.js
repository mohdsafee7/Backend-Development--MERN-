import express from 'express';
import { signupPostRequestBodySchema, loginPostRequesBodySchema } from '../validations/request.validation.js';
import {hashPasswordwithSalt} from '../utils/hash.js';
import { getUserByEmail, createUser } from '../services/user.services.js';
import { createUserToken } from '../utils/token.js';

const router = express.Router();

router.post('/signup', async (req, res) => {
  // const { firstname, lastname, email, password } = req.body;
  const validationResult = await signupPostRequestBodySchema.safeParseAsync(req.body);

  if(validationResult.error){
    return res.status(400).json({ error: validationResult.error.format() });
  }
 
  const { firstname, lastname, email, password } = validationResult.data;

  // if(!firstname)    return res.status(400).json({error: 'firstname is requires'}); 
  // we are going to use Zod for validating these fields

  const existingUser = await getUserByEmail(email);
  //if user exist
  if(existingUser)
      return res
        .status(400)
        .json({ error: `User with email ${email} already exists!`});
  
  const {salt, password: hashedPassword} = hashPasswordwithSalt(password);


  const user = await createUser(firstname, lastname, email, hashedPassword, salt);


  return res.status(201).json({ data: { userId: user.id } } );
})

//login route
router.post('/login', async (req, res) =>{
  const validationResult = await loginPostRequesBodySchema.safeParseAsync(req.body);

  if(validationResult.error){
    return res.status(400).json({error: validationResult.error.format()});
  }

  const {email, password} = validationResult.data;

  const user = await getUserByEmail(email);
  //if user exist
  if(!user)
      return res
        .status(400)
        .json({ error: `User with email ${email} does not exist!`});
      
  const { password: hashedPassword } = hashPasswordwithSalt(password, user.salt);

  if(user.password != hashedPassword ){
    return res.status(400).json({error: `Incorrect Password`});
  }

  //auth jwt
  const token = await createUserToken({ id: user.id });

  return res.status(200).json({ data: { token } });
})

export default router;