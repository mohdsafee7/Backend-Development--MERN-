//add function a+b
exports.myAdd =  function add(a,b){
  return a+b;
}

//subtract function a-b 
exports.sub = function sub(a,b){
  return a-b;
}

//multiply function a*b
function mul(a,b){
  return a*b;
}

//divide function a/b
function div(a,b){
  if(b === 0){
    throw new Error('Cannot divide by zero');
  }
  return a/b;
}



//1. Named Exports
// - exports.<name> = value
// - module.exports.<name> = value
//const { <name> } = require('./module_name')


//2. Default Exports
//There can be only one default export in 1 module
//Default exports don't have any name

module.exports = function() {console.log('Hey i am default export bro.')};
