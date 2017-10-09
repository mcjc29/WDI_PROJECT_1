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



var arraySubEx = [];
let randomOddNumber = Math.ceil(Math.random() * (10 - 1) + 1);
if (randomOddNumber % 2 === 0) randomOddNumber +=1;
console.log(randomOddNumber);

for (var i = 0; i < randomOddNumber; i++) {
  arraySubEx.push(subExpression());
  if (i === 0 || i % 2 === 1 && i !== randomOddNumber) {
    arraySubEx.push(operator());
  }
}
console.log(arraySubEx);




function bracket() {

}

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
