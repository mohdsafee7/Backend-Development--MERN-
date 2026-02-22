const EventEmitter = require('node:events');
const eventEmitter = new EventEmitter();

eventEmitter.on('error', (err)=>{
  console.log(`Error Occured : ${err.message}`);
  
})

eventEmitter.emit('error', new Error('Something went wrong...'));