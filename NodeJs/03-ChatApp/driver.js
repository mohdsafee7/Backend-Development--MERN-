const { log } = require('node:console');
const ChatRoom = require('./chatRoom')

const chat = new ChatRoom();

chat.on('join', (user)=>{
  console.log(`${user} has just joined the chat.`);
})

chat.on('message', (user, message)=>{
  console.log(`${user} : ${message}`);
})

chat.on('leave', (user)=>{
  console.log(`${user} left the chat`);
});


//simulating the chat

chat.join('Safee')
chat.join('Magnet')

chat.sendMessage('Safee', 'Hey, How are you!');
chat.sendMessage('Magnet', 'I am fine, Aap kaise h.');

chat.leave('Safee')
chat.sendMessage('Safee', 'This message will not be sent bcz Safee left the chat.')
chat.leave('Magnet')
