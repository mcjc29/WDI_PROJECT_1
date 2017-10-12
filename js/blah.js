// const expression = '(!true&&(true&&true)||(false&&false))';
const expression = '(!true && (true && (true && true)) || (false && false))';
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

// function resolve(str, arr) {
//   let offset = 0;
//   let memo = str;
//   let newEnd;
//   arr.forEach(pair => {
//     const start = pair[0];
//     newEnd = pair[1] + 1;
//     const subexpression = memo.slice(start, newEnd);
// console.log('subexpression', subexpression)
//     const subResult = eval(subexpression);
// console.log(subResult)
//     offset = subResult.toString().length;
// console.log(memo, start, offset, subResult)
//     memo = replaceBetween(memo, start, newEnd, subResult);
//     // Update dom
//     console.log('memo', memo);
//   });
// }

function resolve(str, arr) {
  let offset;
  let memo = str;
  let subResult;
  arr.forEach((pair, i, arr) => {
    const start = pair[0];
    let newEnd;
    if (i && arr[i-1][1] < pair[1]) {
      newEnd = (pair[1] - offset) + 1;
    } else {
      newEnd = pair[1] + 1;
    }
    const subexpression = memo.slice(start, newEnd);
console.log('subexpression', subexpression)
    subResult = eval(subexpression);
    offset = subResult.toString().length;
    memo = replaceBetween(memo, start, newEnd, subResult);
    // Update dom
    console.log('memo', memo);
  });
}
