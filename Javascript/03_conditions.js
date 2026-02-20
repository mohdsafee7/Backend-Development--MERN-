let score =44;
if(typeof score === 'number'){
  console.log("Yes");
}
else {
  console.log("No");
}

let arr = [1];

// if(arr.length){
//   console.log("Length hai");
// }
// else{
//   console.log("Empty");
  
// }

//const deleted = arr.pop();

let popularTeas = ["green tea", "oolong tea", "chai"];

let softCopy = popularTeas; //same reference
// popularTeas.pop();
// console.log(softCopy);

//Hard copy
let hardCopy = [...popularTeas];  //or popularccities.slice();
// popularTeas.pop();
// console.log(popularTeas);

// console.log(hardCopy);

let impopularTeas = ["patti chai","no chai"];

// let mergedTeas = [popularTeas, impopularTeas]
let mergedTeas = popularTeas.concat(impopularTeas)

// console.log(mergedTeas);

//check if patti chai is in the array
if(impopularTeas.includes("patti chai")){
  console.log("Yes it is present");
}

//shift removes from starting
//unshift add in starting


for(let i = 0;  i < impopularTeas.length; i++)
  console.log(impopularTeas[i]);
  