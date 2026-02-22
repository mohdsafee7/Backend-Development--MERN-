const { log } = require('node:console');
const EventEmitter = require('node:events');

class Chat extends EventEmitter {
  sendMessage(msg){   //method
    console.log(`Message sent : ${msg}`);
    this.emit('messageRecieved', msg);
    
  }
}

const chat = new Chat();
chat.on('messageRecieved', (msg)=>{
  console.log(`Message recieved : ${msg}`);
})

//trigger event
chat.sendMessage("This is a packet.");