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
let $input = null;
let stats = 0;
let timeouts = [];
let $getNames = null;
let $submit = null;
let $name =  null;

const operators = ['||', '&&'];
const emptyOrNor = ['', '!'];
const tValue = [true, false];
const openBracket = '(';
const closeBracket = ')';

let locations = [];


$(init);

function init() {
  $problem = $('.problem');
  $stats = $('.stats');
  $input = $('input[type="text"]');
  $getNames = $('#getNames');
  $submit = $('input[type="submit"]');
  $name = $('.name');

  // $('button').on('click', startGame);
  $submit.on('click', getRandomName);
  transitions();
}

function transitions() {
  $('.second_screen').hide();
  $('.first_screen').hide(0).fadeIn(4000);
  $('.submit').one('click', function(){
    $('.first_screen').hide();
    $('.second_screen').hide(0).fadeIn(4000);
    startGame();
  });
}

function startGame() {
  // reset();
  generateExpression();
  $input.on('keypress', function(e) {
    if (e.which === 13) {
      const userAnswer = $input.val();
      checkAnswer(userAnswer);
    }
  });
}
// function focus() {
//   $('.input').focus();
// }

function getRandomName() {
  const arrayNames = $getNames.val().split(' ');
  var randomName = arrayNames[(Math.floor(Math.random() * arrayNames.length))];
  return  $name.html(`${randomName}!`);
}

// function reset() {
//   stats = 0;
//   $stats.html(stats);
// }

function generateExpression() {
  let arraySubEx = [];
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

  locations[openIndex] = openBracket;
  locations[closeIndex] = closeBracket;
  console.log(locations);
  return arr;
}

function findDeepestLocation() {
  let currentDepth = 0;
  let start = 0;
  let end = 0;
  if (locations.length > 0) {
    let nextOpen = locations.indexOf(openBracket);
    let nextClose = locations.indexOf(closeBracket);
    let subEx;
    while(nextOpen !== -1 && nextClose !== -1) {
      nextOpen = subEx.indexOf(openBracket);
      nextClose = subEx.indexOf(closeBracket);
      subEx = locations.slice(nextOpen, nextClose);
    }
    return {
      start: subEx[0],
      end: subEx[subEx.length -1]
    };
  }else return null;
}

function simplify(expression){
  let subEx = '';

  const deepest = findDeepestLocation();
  if(deepest === null) return expression;
  console.log(deepest);
  subEx = expression.slice(deepest.start, deepest.end);
  console.log(subEx);
  const result = eval(subEx).toString();

  locations.splice(deepest.start, subEx.length);

  const simpler = expression.splice(deepest.start, subEx.length, result);
  console.log(simpler);
  return simpler;
}

function checkAnswer(userAnswer) {
  // const expression = generateExpression();
  let correctAnswer = expression;
  while (locations.length > 0) {
    partialAnswer = simplify(expression).toString();
    console.log(partialAnswer.toString());
  }

  eval(expression).toString();
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
  // generateExpression();
}

//
// function levelOne() {
//   if (stats < 3)
//   else levelTwo
// }
