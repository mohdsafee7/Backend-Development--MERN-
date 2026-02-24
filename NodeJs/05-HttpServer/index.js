const http = require('node:http');


//create a server
const server = http.createServer((req,res)=>{ //inside this is called listener function
  console.log('I got an incoming request');

  res.writeHead(200);
  // res.end('Thanks for visiting my server.'); 
  res.write('Thanks for visiting my server.');
  res.end();
  
});

//bound the server to port no. 8000
server.listen(8000, ()=>{
  console.log(`Http server is up and running on port 8000`);
});