/*
Expression => Whole thing
((Sub-expression) && Sub-expression) || Sub-expression
Length (Number of sub-expressions in the total expression)

Array = [sub-expression, sub-expression, sub-expression]
Add bracket
Final = sub-expression + '&&'
Add bracket !
choose arbitarily say max 5 expressions
either bracket all inc ! or brack subs in || &&

calculate expressions along the way on submit button
if subexpression = 0 the change html to false
*/

const operators = ['||', '&&'];
const emptyOrNor = ['', '!'];
const tValue = [true, false];
const openBracket = '(';
const closeBracket = ')';

function emptyOrNot(){
  return `${emptyOrNor[Math.floor(emptyOrNor.length * Math.random())]}`;
}
function tvVal(){
  return `${tValue[Math.floor(tValue.length * Math.random())]}`;
}
function operator(){
  return `${operators[Math.floor(operators.length * Math.random())]}`;
}

function subExpression() {
  return `${emptyOrNot()} ${tvVal()} ${operator()} ${emptyOrNot()} ${tvVal()}`;
}
// console.log(subExpression());

function answersubEx() {
  return eval(subExpression());
}
// console.log(answersubEx());

function randomNumber(isOdd, min, max){
  let num = Math.floor(Math.random() * (max - min) +min);
  if (isOdd && num % 2 === 0) num +=1;
  if (!isOdd && num % 2 === 1) num +=1;
  // console.log(num);
  return num;
}

function generateBracketPair(arr) {
  const openIndex = randomNumber(false, 0, arr.length -1);
  const closeIndex = randomNumber(false, openIndex +1, arr.length -1);
  //arr.splice(openIndex, 0, openBracket;
  arr[openIndex] = openBracket.concat(arr[openIndex]);
  arr[closeIndex] = arr[closeIndex].concat(closeBracket);
  console.log(arr[openIndex]);
  console.log(arr[closeIndex]);
  return arr;
}

function generateExp() {
  var arraySubEx = [];
  const arrayLength = randomNumber(true, 1, 20);
  for (var i = 0; i < arrayLength; i++) {
    if (i % 2 === 0) {
      arraySubEx.push(subExpression());
    } else arraySubEx.push(operator());

    //arraySubEx.push(i % 2 === 0 ? subExpression() : operator());
  }
  const numberOfPairs = Math.random() * (arrayLength/2);
  for(i =0; i< numberOfPairs; i++){
    arraySubEx = generateBracketPair(arraySubEx);
  }
  return arraySubEx;
}

generateExp();
console.log(generateExp());
//


// console.log(arraySubEx);




// console.log(bracketed());

// ensure no empty array is spat out & operator not on end

// // //
// function complexExp() {
//   return `${arraySubEx}, ${operator()}`;
// }
// console.log(complexExp());
//
// function answerComplexExp() {
//   return eval(subExpression());
// }
// console.log(answerComplexExp());
