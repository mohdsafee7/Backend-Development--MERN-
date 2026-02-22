const {Buffer} = require('node:buffer');

const buf = Buffer.alloc(4);
console.log(buf);

const buf2 = Buffer.from('Hello Safee');
console.log(buf2)
console.log(buf2.toString());

const buf3 = Buffer.allocUnsafe(10);
console.log(buf3);

const buf4 = Buffer.alloc(10);
buf4.write('Hello Safee');
console.log(buf4.toString());

const buf5 = Buffer.from('Chai and Code');
console.log(buf5);
console.log(buf5.toString('utf-8', 0, 4));


const buf6 = Buffer.from('Safee');
console.log(buf6);
buf6[0] = 0x47;
console.log(buf6);
console.log(buf6.toString());


const buf7 = Buffer.from('Mohd ');
const merged = Buffer.concat([buf7, buf6]);
console.log(merged.toString());
console.log(merged.length);

