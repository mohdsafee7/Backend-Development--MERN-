//SESSION BASED AUTHENTICATION - is a stateful authentication mechanism where the server stores user information 
//                               (session data), and the client uses a session ID to stay authenticated.
//Server is Statefull
//Short lived Session like Banking

import express from 'express';

const app = express();
const PORT = 8000;

app.use(express.json()); 

const DIARY = {};
const EMAILS = new Set();

//Here is my car, pls park it and give me back a token
//say email-- unique car number
app.post('/signup', (req, res)=>{
  const {name, email, password} = req.body;

  if(EMAILS.has(email)){
    return res.status(400).json({error : 'Email already taken'});
  }

  //create a token for user
  const token = `${Date.now()}`;

  //do entry in diary
  DIARY[token] = {name, email, password};
  EMAILS.add(email);

  return res.json({status : 'Success', token});

})

//take back your car
app.post('/me', (req, res)=>{
  const {token} = req.body;

  if(!token){
    return res.status(400).json({error : 'Missing Token'});
  }

  if(!(token in DIARY)){
    return res.status(400).json({error : 'Invalid Token'});
  }

  const entry = DIARY[token];

  return res.json({data : entry});
})

app.post('/private-data', (req, res)=>{
  const {token} = req.body;

  if(!token){
    return res.status(400).json({error : 'Missing Token'});
  }

  if(!(token in DIARY)){
    return res.status(400).json({error : 'Invalid Token'});
  }

  const entry = DIARY[token];

  return res.json({data : { privateData : "Access Granted"}});
})

app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});