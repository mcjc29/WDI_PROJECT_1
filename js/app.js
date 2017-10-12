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
let $answer = null;
let $score = null;
let $input = null;
let score = 0;
let timeouts = [];
let $getNames = null;
let $submit = null;
let $name =  null;

const operators = ['||', '&&'];
const emptyOrNor = ['', '!'];
const tValue = [true, false];
const openBracket = '(';
const closeBracket = ')';

let expression;
let lastVersion;

$(init);

function init() {
  $problem = $('.problem');
  $answer = $('.answer');
  $score = $('.score');
  $input = $('#userInput');
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
  generateExpression();
  // setTimeout(() => {
  //   generateExpression();
  // }, 10000);

  $input.on('keypress', function(e) {
    if (e.which === 13) {
      const userAnswer = $input.val();
      checkAnswer(userAnswer);
    }
  });
}

function getRandomName() {
  const arrayNames = $getNames.val().split(' ');
  var randomName = arrayNames[(Math.floor(Math.random() * arrayNames.length))];
  return  $name.html(`${randomName}!`);
}

// function reset() {
//   score = 0;
//   $score.html(score);
// }

function generateExpression() {
  let arraySubEx = [];
  const arrayLength = randomNumber(true, 2, 11);
  for (var i = 0; i < arrayLength; i++) {
    arraySubEx.push(i % 2 === 0 ? subExp() : operator());
  }

  const numberOfPairs = Math.random() * (arrayLength / 2);
  for(let j = 0; j < numberOfPairs; j++){
    arraySubEx = generateBracketPair(arraySubEx);
  }

  expression = arraySubEx.join(' ').split('');
  $problem.empty();

  timeouts = timeouts.map(timeout => clearTimeout(timeout)).filter(Boolean);

  timeouts = expression.map((letter, i) => setTimeout(() => {
    $problem.append(letter);
  }, (i * 150) + Math.floor(Math.random() * 60)));

  expression = expression.join('');
  return expression;
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

function subExp() {
  return `${emptyOrNot()} ${tvVal()} ${operator()} ${emptyOrNot()} ${tvVal()}`;
}

function generateBracketPair(arr) {
  const lastItem = arr.length - 2;
  const openIndex = randomNumber(false, 0, arr.length - 4);
  const closeIndex = randomNumber(false, openIndex + 1, lastItem);
  arr[openIndex] = openBracket.concat(arr[openIndex]);
  arr[closeIndex] = (arr[closeIndex]).concat(closeBracket);
  return arr;
}

function charPos(str, char) {
  return str.split('').map((c, i) => {
    if (c === char) return i;
  }).filter(v => {
    return v !== undefined;
  });
}

function zipArrays(lb, rb) {
  const lbr = [...lb].reverse();
  const used = [];
  return lbr.map(e => {
    // Find all numbers higher than the ( i
    const higher = higherNumbers(e, rb);
    // Filter by all that have already been used
    const firstHigher = higher.filter(h => {
      return used.indexOf(h) === -1;
    })[0];
    // Store so that it is not used twice
    used.push(firstHigher);
    return [e, firstHigher];
  });
}

function higherNumbers(n, arr) {
  return arr.filter(e => e > n);
}

function replaceBetween(str, start, end, newStr) {
  return str.substring(0, start) + newStr + str.substring(end);
}

function resolve(str) {
  const leftBracketsIndices = charPos(expression, '(');
  const rightBracketsIndices = charPos(expression, ')');
  const arr = zipArrays(leftBracketsIndices, rightBracketsIndices);

  let memo = str;
  const versions = [];
  let subResult, subexpression, newStart, newEnd, prevStart, prevEnd, offset, lengthRemoved, lengthAdded;

  arr.forEach((pair, i, arr) => {
    newStart = pair[0];
    newEnd = pair[1] + 1;
    // If it's not the first array...
    if (i) {
      // Get the values of the previous start and end
      prevStart = arr[i-1][0];
      console.log('preStart', prevStart);
      prevEnd = arr[i-1][1];
      console.log('prevEnd', prevEnd);
      // Find out the new start index after a potential change
      if (newStart > prevStart) newStart = pair[0] - offset;
      console.log('newStart', newStart);
      // Find out the new end index after a potential change
      if (newEnd > prevEnd) newEnd = (pair[1] - offset) + 1;
      console.log('newEnd', newEnd);
    }
    subexpression = memo.slice(newStart, newEnd);
    subResult = eval(subexpression);
    lengthRemoved = subexpression.length;
    // console.log('lengthRemoved', lengthRemoved);
    lengthAdded = subResult.toString().length;
    // console.log('lengthAdded', lengthAdded);
    //always 4 true and 5false
    offset = lengthRemoved - lengthAdded;
    memo = replaceBetween(memo, newStart, newEnd, subResult);
    // Update dom
    versions.push(memo);
  console.log(versions);
  });
  lastVersion = versions[versions.length - 1];
  if (lastVersion !== true || lastVersion !== false) {
    versions.push(eval(lastVersion));
  }
  versions.forEach((version, i) => {
    setTimeout(() => {
      $answer.append(version);
      $answer.append('<br>');
    }, ((i+1) * 1000));
  });
}

function checkAnswer(userAnswer) {
  resolve(expression);
  const finalAnswer = eval(lastVersion).toString();
  if (userAnswer === finalAnswer) {
    score++;
    updateScore();
  } else {
    score--;
    updateScore();
  }
  // console.log(finalAnswer);
  // console.log(userAnswer);
  // $input.on('keypress', function(e) {
  //   if (e.which === 13) {
  //     generateExpression();
  //   }
  // });
}

function updateScore() {
  if (score >= 0) $score.html(score) ;
  $input.val('');
}
//
// function reset() {
//   $answer.html('');
// }
