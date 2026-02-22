const fs = require('node:fs')

console.log("Start of the File");

const content = fs.readFile('notes.txt', 'utf-8', function(error, data) {
  if(error) console.log(error);
  else console.log("Got content: ", data);
  
});
// console.log(content)

console.log("End of the File");


