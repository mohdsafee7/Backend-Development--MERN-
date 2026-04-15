import express from 'express';


const app = express();
const PORT = process.env.PORT ?? 8000;

app.get('/', (req, res)=>{
  console.log('everything is fine');

  return res.status(200).json({status: 'success'})
  
})

app.listen(PORT, ()=>{
  console.log(`Server is running on PORT ${PORT}`);
  
})