import { validateUserToken} from '../utils/token.js';
/**
 * 
 * @param {import("express").Request} req 
 * @param {import("express".Response)} res 
 * @param {import("express").NextFunction} next 
 */
export function authenticationMiddleware(req, res, next) {
  const authHeader = req.headers['authorization'];

  if(!authHeader){
    return next();
  }

  if(!authHeader.startsWith('Bearer')){
    return res.status(400).json({ error: 'Authorization header must start with Bearer' });
  }

  const token = authHeader.split(' ')[1]; // ['Bearer', 'token']

  const payload = validateUserToken(token);

  req.user = payload; // we are going to use this in our protected routes

  next();
}