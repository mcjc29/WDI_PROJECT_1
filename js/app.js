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
  console.log(subExpression());

function answersubEx() {
  return eval(subExpression());
}

  console.log(answersubEx());

function randomNumber(isOdd, min, max) {
  let num = Math.ceil(Math.random() * (max - min) + min);
  // console.log(`After generating random number: ${num}`);
  if (isOdd) {
    if (num % 2 === 0) num++;
  } else {
    if (num % 2 !== 0) num++;
  }
  // else if (num % 2 !== 0) num;
  // console.log(`After checking odd / even: ${num}`);
  return num;
}

// console.log(randomNumber());
// if (i === 0 || isOdd && num % 2 === 0) num +=1;
// if math.ceil( then to smallest num define)
// define i
function generateBracketPair(arr) {
  const lastItem = arr.length - 2;
  const openIndex = randomNumber(false, 0, arr.length - 4);
  const closeIndex = randomNumber(false, openIndex + 1, lastItem);
  //arr.splice(openIndex, 0, openBracket;
  // console.log(arr);
  // console.log(`openindex: ${openIndex}, closeIndex: ${closeIndex}`);
  arr[openIndex] = openBracket.concat(arr[openIndex]);
  arr[closeIndex] = (arr[closeIndex]).concat(closeBracket);

        console.log(eval(arr.join(' ')));
  // console.log(`what is open ${arr[openIndex]}`);
  // console.log(`what is close ${arr[closeIndex]}`);
  return arr;
}

function generateExp() {
  var arraySubEx = [];
  // const arrayLength = randomNumber(true, 1, 11);
  const arrayLength = randomNumber(true, 3, 11);
  for (var i = 0; i < arrayLength; i++) {
    if (i % 2 === 0) {
      arraySubEx.push(subExpression());
    } else {
      arraySubEx.push(operator());
    }
    //arraySubEx.push(i % 2 === 0 ? subExpression() : operator());
  }
  const numberOfPairs = Math.random() * (arrayLength / 2);
  for(i =0; i< numberOfPairs; i++){
    arraySubEx = generateBracketPair(arraySubEx);
  }
  return arraySubEx;
}

  // console.log(generateExp());


function ansGenerateExp() {
  return eval(generateExp());
}
ansGenerateExp();
  // console.log(ansGenerateExp());

// if starts and end with backets randomly assign!
