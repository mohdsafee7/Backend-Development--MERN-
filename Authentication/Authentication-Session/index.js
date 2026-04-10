import express from 'express';
import userRouter from './routes/user.routes.js';
import adminRouter from  './routes/admin.route.js'
const app = express();
const PORT = process.env.PORT ?? 8000;
import jwt from 'jsonwebtoken'
import { authenticationMiddleware } from './middleware/auth.middleware.js';

app.use(express.json()); // Middleware to parse JSON request bodies


console.log('Before middleware');

// Middleware to authenticate incoming requests by verifying the JWT token and attaching the decoded user information to the request object. This allows subsequent route handlers to access the authenticated user's details.
app.use(authenticationMiddleware);


app.get('/', (req, res)=>{
  return res.json({status : 'Server is up and running'})
})



app.use('/user', userRouter);
app.use('/admin', adminRouter);


app.listen(PORT, ()=>{
  console.log("server is running");
})
