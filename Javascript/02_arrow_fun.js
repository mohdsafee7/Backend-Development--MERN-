// const calcT = (price, quantity) => {
//   return price*quantity;
// }
const calcT = (price, quantity) => price*quantity;


let totalCost = calcT(10,22);
console.log(totalCost);

//higher order function
function makeTea(type){
  console.log(type);
  
}
function process(makeTea){
  return makeTea('earl gray');
}

process(makeTea)

function createTea(name){
  return function(teaType){
    return `Making ${teaType} Of ${name}`;
  }
}

const teaMaker = createTea("Safee");
let res = teaMaker("green wali")
console.log(teaMaker);
console.log(res);
