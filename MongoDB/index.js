import 'dotenv/config';
import express from 'express';
import { connectMongoDB } from './connection.js';
import userRouter from './routes/user.routes.js';


const app = express();
const PORT = process.env.PORT ? process.env.PORT : 8000;


connectMongoDB(process.env.MONGODB_URL).then(()=>{
  console.log('MongoDB connected successfully');
})

app.use(express.json());
app.use('/user', userRouter);

app.listen(PORT, () => {
  console.log(`Server is running on PORT ${PORT}`);
})

