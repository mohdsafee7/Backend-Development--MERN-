const http = require('node:http')

const server = http.createServer((req,res)=>{
  console.log(`Incoming requrest at [${Date.now()}]`);
  // console.log(req.headers);
  // console.log(req.method);
  // console.log(req.url);


  switch(req.url){
    case '/':
      res.writeHead(200);
      return res.end(`You are at Homepage.`);
      
    case '/contact-us':
      res.writeHead(200);
      return res.end('You are at Contact Page');
      
    case '/profile':
      res.writeHead(200);
      return res.end('You are at profile page.');
    default:
      res.writeHead(404);
      res.end('You are lost!');
  }
  
  
  
  // res.end(`You can read headers at : ${req.headers['accept-language']}`);
});

server.listen(8000, ()=>{
  console.log('Server is running on PORT: 8000');
  
})