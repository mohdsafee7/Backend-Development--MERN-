const fs = require('node:fs');

// console.log(typeof fs);

//to read file
const content = fs.readFileSync('notes.txt', 'utf-8');
console.log(content);


// fs.writeFileSync('copy.txt', 'hey', 'utf-8');
fs.writeFileSync('copy.txt', 'Hey Jacob. this is me. \n Your boy BadShah.', 'utf-8');
// fs.appendFileSync('copy.txt', '\n\nHululu I am luluHu Hu R U ? LuHulu?', 'utf-8');

// console.log(contents);


// fs.mkdirSync('games');
// fs.mkdirSync('newdir');
// fs.rmdirSync('newdir');
// fs.mkdirSync('games/xyz/s/a', {recursive: true});
// fs.rmdirSync('games/xyx');


// fs.unlinkSync('copy.txt'); //deletes the file
fs.unlinkSync('copy.txt');

