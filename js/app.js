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

let $problem = null;
let $stats = null;
let $submit = null;
let $input = null;

let stats = 0;

const operators = ['||', '&&'];
const emptyOrNor = ['', '!'];
const tValue = [true, false];
const openBracket = '(';
const closeBracket = ')';

$(init);

function init() {
  $problem = $('.problem');
  $stats = $('.stats');
  $submit = $('input[type="submit"]');
  $input = $('input[type="text"]');

  $('button').on('click', startGame);
}

function startGame() {
  generateExp();
  console.log(correctAnswer());
  $submit.on('click', checkAnswer);
}

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
// function answersubEx() {
//   return eval(subExpression());
// }
// // console.log(answersubEx());

function randomNumber(isOdd, min, max) {
  let num = Math.ceil(Math.random() * (max - min) + min);
  if (isOdd) {
    if (num % 2 === 0) num++;
  } else {
    if (num % 2 !== 0) num++;
  }
  return num;
}

function generateBracketPair(arr) {
  const lastItem = arr.length - 2;
  const openIndex = randomNumber(false, 0, arr.length - 4);
  const closeIndex = randomNumber(false, openIndex + 1, lastItem);
  arr[openIndex] = openBracket.concat(arr[openIndex]);
  arr[closeIndex] = (arr[closeIndex]).concat(closeBracket);
  return arr;
}

function generateExp() {
  var arraySubEx = [];
  // const arrayLength = randomNumber(true, 1, 11);
  const arrayLength = randomNumber(true, 2, 9);
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
  $problem.html(arraySubEx.join(' '));
  return arraySubEx.join(' ');
}

function correctAnswer() {
  return eval(generateExp().toString());
}

function checkAnswer() {
  const userAnswer = $input.val();
  console.log(userAnswer);
  if (userAnswer === correctAnswer) {
    stats++;
    updateScore();
  } else {
    stats--;
    updateScore();
  }
}

function updateScore() {
  if (stats >= 0) $stats.html(stats);
  $input.val('');
}
