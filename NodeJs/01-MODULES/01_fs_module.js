const fs = require('fs');

// console.log(typeof fs);

//to read file
const content = fs.readFileSync('notes.txt', 'utf-8')

console.log(content);



