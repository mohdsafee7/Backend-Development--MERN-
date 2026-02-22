const EventEmitter = require('node:events');

const eventEmitter = new EventEmitter();

eventEmitter.once('notifyOnce', (user, phone)=>{
  console.log(`Good Morning ${user}. Have a nice day! \n 
    Your phone number is ${phone}`);
})

//emit the event, it will emit only once.
eventEmitter.emit('notifyOnce', 'Safee', 9628328561);
eventEmitter.emit('notifyOnce', 'Safee', 9628328561);
