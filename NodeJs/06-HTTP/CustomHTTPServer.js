//Task: Build a custom Task with Native HTTP Server in Node.js
const http = require('node:http');
const fs = require('node:fs');



const server = http.createServer((req,res)=>{
  const method = req.method;
  const path = req.url;

  const log = `\n[${Date.now()}]: ${method}  ${path}`;
  fs.appendFileSync('log.txt', log, 'utf-8');

  switch(method){
    case 'GET': {
      switch(path){
    case '/':
      res.writeHead(200);
      return res.end('hello');
    case '/contact-us':
      res.writeHead(200);
      return res.end(`Contact me at mohdsafee8400@gmail.com \n Phone Number: +91 96283-28561`)
    case '/tweet':
      res.writeHead(200);
      return res.end('Tweet 1: Kya Re Namune...')
    default:
      res.writeHead(404);   
      res.end('Wrong Query');
  } }
  
  case 'POST':{
    switch(path){
      case '/tweet':
      res.writeHead(201);
      return res.end('Your tweet is done.')
    }
  } 
 
  default:
    res.writeHead(404);
    res.end('Wrong request.'); 
  }


  // res.writeHead(404).end('You are lost.')
  // console.log(method);
  
});

server.listen(8000, ()=>{console.log("Thank You server.")})