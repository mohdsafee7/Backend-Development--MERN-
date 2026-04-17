import express from 'express';
import userRouter from './routes/user.routes.js';
import { authenticationMiddleware } from './middleware/auth.middleware.js';
import urlRouter from './routes/url.routes.js';
const app = express();
const PORT = process.env.PORT ?? 8000;

app.use(express.json());
app.use(authenticationMiddleware); // this will add the user payload to req.user if the token is valid, otherwise it will be undefined

app.get('/', (req, res)=>{
  console.log('everything is fine');

  return res.status(200).json({status: 'success'})
  
})

app.use('/user', userRouter);
app.use(urlRouter); // this will add the urlRouter to the app, and all the routes defined in urlRouter will be prefixed with /url. For example, the /shorten route defined in urlRouter will be accessible at /url/shorten.


app.listen(PORT, ()=>{
  console.log(`Server is running on PORT ${PORT}`);
  
})