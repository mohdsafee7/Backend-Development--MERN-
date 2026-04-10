import jwt from 'jsonwebtoken';

export const authenticationMiddleware = async (req, res, next) =>{

  try {
    const tokenHeader = req.header('authorization'); // Extract the JWT token from the Authorization header of the incoming request. The token is expected to be in the format "Bearer <token
    //Header Authorization : Bearer <token>
    
    if(!tokenHeader){
    return next();
   }

   if(!tokenHeader.startsWith('Bearer ')){
    return res.status(400).json({error: 'authorization header must start with Bearer'});
  } 
  
  const token = tokenHeader.split(' ')[1]; // Extract the actual token from the header by splitting the string and taking the second part (the token itself).

  const decoded = jwt.verify(token, process.env.JWT_SECRET); // Verify the JWT token using the secret key from environment variables. If the token is valid, it will return the decoded payload.

  req.user = decoded; // Attach the decoded user information to the request object, making it available for subsequent middleware and route handlers.
  console.log('Authenticated user:', req.user);
  
  next();
  }
  catch(err){
    console.log('Error is occuring in authentication middleware', err);
    return res.status(401).json({error: 'Invalid or expired token'});
  }
}


export const ensureAuthenticated = (req, res, next) =>{
  if(!req.user){
    return res.status(401).json({error: 'You must be authenticated to access this resource'});
  }
  next();
}

export const restrictToRole = (role) =>{ // This function takes a role as an argument and returns a middleware function that checks if the authenticated user has the specified role. If not, it returns a 403 Forbidden response.
  return (req, res, next) =>{
    if(req.user.role !== role){
      return res.status(403).json({error: 'You do not have permission to access this resource'});
    }

    return next();
  }
}