const EventEmitter = require('node:events'); //importing events module

const eventEmitter = new EventEmitter(); //created an instance of EE

eventEmitter.on('greet', (user, i)=>{
  console.log(`This event is Emitted by ${user} ${i}.`);
  
})

//Emit the event
eventEmitter.emit('greet', 'Safee', 7);
// eventEmitter.emit('greet', 'Safee', 7);


eventEmitter.on('foo', ()=>{
  console.log("Sofi");
})
//another eventlistener on the same foo
eventEmitter.on('foo', ()=>{
  console.log("This is 2nd listner Sofi i.e, multicallable");
})

eventEmitter.emit('foo');
// eventEmitter.emit('foo');
// eventEmitter.emit('foo');

//no. of listeners
const totalListeners =  eventEmitter.listenerCount('foo');
console.log("Total listeners on foo: " , totalListeners);

//way 2 of listener
const myListener = () => { console.log("myListener fun on test");}
eventEmitter.on('test', myListener);
eventEmitter.emit('test');
// eventEmitter.emit('test');
//remove the listener from the test event
eventEmitter.removeListener('test', myListener);
eventEmitter.emit('test');
