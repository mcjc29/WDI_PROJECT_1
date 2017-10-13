// const expression = '(!true && (true && true) || (false && false))';
// const expression = '(true && (true && (true && true)) && (true && true)) || (true || false)';
// const expression = '(true && (true && (true && true)) && (true && true)) || (true || false && true || true)';
// const expression = '(true && true) && (true && true) || (true || false && true || true)';


// const expression = '(!true && (true && (true && true)) || (false && false))';

DONT WORK
const expression = 'false ||  false || ( true &&  false || ( true ||  true || ( false || ! true && ! true &&  false)))'
const expression = '! true &&  false && ((! true && ! false &&  false &&  true || ((! true &&  true) && ( false &&  false) ||  true &&  false)))'
const expression = '! false &&  false && ( true && ! true || (( false || ! false) && ((! true && ! true)) &&  false &&  false))'
const expression = '! true && ! false || (( true ||  true && ( true &&  false &&  true &&  false &&  false || ! true) || ! false && ! false))'
const expression = ' false ||  true && (! false ||  true && (( true && ! false && ! true || ! false)) || (( true || ! false) || ! false ||  false))'
const expression ='false && ! false && (( true ||  false || (( true ||  false) && ((! true &&  false && ! false && ! true)) ||  true && ! true)))'

const leftBracketsIndices = charPos(expression, '(');
const rightBracketsIndices = charPos(expression, ')');
const bracketPairs = zipArrays(leftBracketsIndices, rightBracketsIndices);
resolve(expression, bracketPairs);

function charPos(str, char) {
  return str.split('').map((c, i) => {
    if (c === char) return i;
  }).filter(v => {
    return v !== undefined;
  });
}

function zipArrays(lb, rb) {
  const lbr = [...leftBracketsIndices].reverse();
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


function resolve(str, arr) {
  let memo = str;
  const versions = [];
  let subResult, subexpression, newStart, newEnd, prevStart, prevEnd, offset, lengthRemoved, lengthAdded;

  arr.forEach((pair, i, arr) => {
    newStart = pair[0];
  console.log(newStart);
    newEnd = pair[1] + 1;
  console.log(newEnd);

    // If it's not the first array...
    if (i) {
    console.log(i);
      // Get the values of the previous start and end
      prevStart = arr[i-1][0];
    console.log(prevStart);
      prevEnd = arr[i-1][1];
    console.log(prevEnd);
      // Find out the new start index after a potential change
      if (newStart < prevStart) newStart = pair[0] - offset;
      // Find out the new end index after a potential change
      if (newEnd > prevEnd) newEnd = (pair[1] - offset) + 1;
    }
    console.log(newEnd);
    subexpression = memo.slice(newStart, newEnd);
    subResult = eval(subexpression);
    lengthRemoved = subexpression.length;
    lengthAdded = subResult.toString().length;
    offset = lengthRemoved - lengthAdded;
    memo = replaceBetween(memo, newStart, newEnd, subResult);
    // Update dom
    versions.push(memo);
  });
  console.log(versions);
}
