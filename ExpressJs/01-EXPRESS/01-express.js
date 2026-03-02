const express  = require('express');
const { log } = require('node:console');

const app = express();

app.get('/', function (req,res){
  res.end('Homepage.')
});

app.get('/contact-us', (req,res)=>{
  res.end('You can contact me at modhsafee8400@gmail.com')
})

app.post('/tweet', (req,res)=>{
  res.end('Your tweet has posted.')
})

app.get('/tweet', (req,res)=>{
  res.end('Tweet-1\nTweet-2');
})

app.listen(8000, ()=>{
  console.log(`Server is running on port 8000`);
})