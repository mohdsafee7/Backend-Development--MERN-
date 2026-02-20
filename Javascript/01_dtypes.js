console.log("Hello");
process.stdout.write("Chai")
console.table({city: "Jaipur"});
console.warn({city : "Jaipur"})

//object
let teaTypes = ["lemon", "masala"];

let getScore;

const username = "safee"

console.log(typeof teaTypes)


let expo = 2 ** 3;
console.log(expo);

let num1 = 10;
 num1 /= 5;
 console.log(num1);
 
let bal = new Number(11);
console.log(typeof bal);

let str =  `Hole is ${bal}` //backticks
console.log(str);


let sm1 = Symbol();
let sm2 = Symbol();

console.log(sm1 == sm2);

const user = {
  "name hai": "hissi",
  isLogged : true
};

user.name = "safee"; //we are only changing primitives, but the mem. loc is still same
console.log(user['name hai']);
console.log(user);


let today = new Date();
console.log(today.getDate());
console.log(today.getFullYear());


function orderTea(tea){
  function cnfOrder(){
    return "Order confirmed.";
  }
  return cnfOrder();
}

let order = orderTea("chai");
console.log(order);
