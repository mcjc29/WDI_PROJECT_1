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
// move through the characters with a second interval

let $problem = null;
let $stats = null;
let $submit = null;
let $input = null;
let stats = 0;
let timeouts = [];

const currentExpression = null;

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
  reset();
  generateExpression();
  // $submit.on('click', checkAnswer);
  $input.keyup(function(event) {
    if (event.keycode === 13) {
      checkAnswer;
    }
  });
}

function reset() {
  stats = 0;
  $stats.html(stats);
}

function generateExpression() {
  var arraySubEx = [];
  const arrayLength = randomNumber(true, 2, 9);
  for (var i = 0; i < arrayLength; i++) {
    arraySubEx.push(i % 2 === 0 ? subExpression() : operator());
  }

  const numberOfPairs = Math.random() * (arrayLength / 2);
  for(let j = 0; j < numberOfPairs; j++){
    arraySubEx = generateBracketPair(arraySubEx);
  }

  const currentExpression = arraySubEx.join(' ').split('');
  $problem.empty();

  timeouts = timeouts.map(timeout => clearTimeout(timeout)).filter(Boolean);

  timeouts = currentExpression.map((letter, i) => setTimeout(() => {
    $problem.append(letter);
  }, (i * 150) + Math.floor(Math.random() * 60)));

  return currentExpression.join('');
}

function randomNumber(isOdd, min, max) {
  let num = Math.ceil(Math.random() * (max - min) + min);
  if (isOdd) {
    if (num % 2 === 0) num++;
  } else {
    if (num % 2 !== 0) num++;
  }
  return num;
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

function generateBracketPair(arr) {
  const lastItem = arr.length - 2;
  const openIndex = randomNumber(false, 0, arr.length - 4);
  const closeIndex = randomNumber(false, openIndex + 1, lastItem);
  arr[openIndex] = openBracket.concat(arr[openIndex]);
  arr[closeIndex] = (arr[closeIndex]).concat(closeBracket);
  return arr;
}

function checkAnswer() {
  const userAnswer = $input.val();
  const expression = generateExpression();
  const correctAnswer = eval(expression).toString();
  // const correctAnswer = eval(currentExpression).toString();
  // console.log(currentExpression);
  if (userAnswer === correctAnswer) {
    stats++;
    updateScore();
  } else {
    stats--;
    updateScore();
  }
}

function updateScore() {
  if (stats >= 0) $stats.html(stats) ;
  $input.val('');
  generateExpression();
}

//
// function levelOne() {
//   if (stats < 3)
//   else levelTwo
// }
