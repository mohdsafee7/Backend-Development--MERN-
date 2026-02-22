const EventEmitter = require('node:events');

class ChatRoom extends EventEmitter {
  constructor(){
    super()
    this.users = new Set();
  }

  join(user){
    this.users.add(user);
    this.emit('join', user);
  }

  sendMessage(user, message){
    //validate the user first
    if(this.users.has(user)){
      this.emit('message', user, message)
    }else{
      console.log(`${user} is not in the chat`);
    }
  }

  leave(user){
    if(this.users.has(user)){
      this.users.delete(user);
      this.emit('leave', user);
    }else{
      console.log(`${user} is not in the chat`);
    }
  }

}

module.exports = ChatRoom;