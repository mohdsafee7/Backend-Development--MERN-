import jwt from 'jsonwebtoken';
import { userTokenSchema } from '../validations/token.validation.js';
const JWT_SECRET = process.env.JWT_SECRET;

export async function createUserToken(payload) {
  const validationResult =await userTokenSchema.safeParseAsync(payload);

  if(validationResult.error){
    throw new Error("Invalid payload for token creation" + validationResult.error.message);
  }

  const payloadValidatedData = validationResult.data;

  const token = jwt.sign(payloadValidatedData, JWT_SECRET, { expiresIn: '1h' });
  return token;
}


export function validateUserToken(token){
  try {
    const payload = jwt.verify(token, JWT_SECRET);

    return payload;
  } catch (error) {
    return null;
  }
}