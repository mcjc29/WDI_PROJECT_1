// DONT WORK
// const expression = 'false ||  false || ( true &&  false || ( true ||  true || ( false || ! true && ! true &&  false)))'
// const expression = '! true &&  false && ((! true && ! false &&  false &&  true || ((! true &&  true) && ( false &&  false) ||  true &&  false)))'
// const expression = '! false &&  false && ( true && ! true || (( false || ! false) && ((! true && ! true)) &&  false &&  false))'
// const expression = '! true && ! false || (( true ||  true && ( true &&  false &&  true &&  false &&  false || ! true) || ! false && ! false))'
// const expression = ' false ||  true && (! false ||  true && (( true && ! false && ! true || ! false)) || (( true || ! false) || ! false ||  false))'
// const expression ='false && ! false && (( true ||  false || (( true ||  false) && ((! true &&  false && ! false && ! true)) ||  true && ! true)))'

//parsing - lexical analysis
// const expression = 'false ||  false || ( true &&  false || ( true ||  true || ( false || ! true && ! true &&  false)))';

// precedence of logical operators !...&&...||
const expression = 'true (! false || ! true && ! true)';
// 
// console.log(tokenizer(expression));

function tokenizer(input) {
  // tracking position
  let current = 0;

  //array for pushing tokens
  let tokens = [];

  while (current < input.length) {
    //store the `current` character in the `input`

    let char = input[current];

    //  check for open parenthesis:
    if (char === '(') {
      //push new token with the type `paren` and set value
      tokens.push({
        type: 'paren',
        value: '('
      });
      // increment `current`
      current++;

      // `continue` onto the next cycle of the loop.
      continue;
    }
    if (char === ')') {
      tokens.push({
        type: 'paren',
        value: ')'
      });
      current++;
      continue;
    }
    //
    // //  check for logical operators:
    if (char === '&') {
      //push new token with the type `operator` and set value
      tokens.push({
        type: 'operator',
        value: '&'
      });
      // increment `current`
      current++;

      // `continue` onto the next cycle of the loop.
      continue;
    }

    if (char === '!') {
      tokens.push({
        type: 'operator',
        value: '!'
      });
      current++;
      continue;
    }

    if (char === '|') {
      tokens.push({
        type: 'operator',
        value: '|'
      });
      current++;
      continue;
    }
    // Hey! Cant seem to push a new token for the logical operators.

    //check for whitespace
    let WHITESPACE = /\s/;
    if (WHITESPACE.test(char)) {
      current++;
      continue;
    }

    //
    // let OPERATOR = '&&'; '||'; '!';
    //
    // if (OPERATOR.test(char)) {
    //   let value = '';
    //
    //   while (OPERATOR.test(char)) {
    //     value += char;
    //     char = input[++current];
    //   }
    //   tokens.push({ type: 'operator', value });
    //   continue;
    // }

    // names of operators and truth vales

    let LETTERS = /[a-z]/i;

    if (LETTERS.test(char)) {
      let value = '';
      while (LETTERS.test(char)) {
        value += char;
        char = input[++current];
      }
      tokens.push({ type: 'name', value });

      continue;
    }
    throw new TypeError('I dont know what this character is: ' + char);
  }
  return tokens;
}

//PARSER - syntactic analysis

function parser(tokens) {
  let current = 0;
  //recursion not while loop
  function walk() {
    //grab current
    let token = tokens[current];
    //split each type of token off
    // look for CallExpressions
    if (
      token.type === 'paren' &&
      token.value === '('
    ) {
      // increment `current` to skip the parenthesis
      token = tokens[++current];
      //create a base node with the type `CallExpression`

      // set name as the current token's value - the next token after the open parenthesis is the name of the function
      let node = {
        type: 'CallExpression',
        name: token.value,
        params: []
      };
      token = tokens[++current];
      //increment `current` *again* to skip the name token.
      // /loop through each token = the `params` of `CallExpression` until a closing parenthesis.

      //now use recusion to access nested = `walk` function increments`current` variable past any nested `CallExpression`.

      //`while` loop that will continue until it encounters a token with a `type` of `'paren'` and a `value` of a closing parenthesis.
      while (
        (token.type !== 'paren') ||
        (token.type === 'paren' && token.value !== ')')
      ) {
        //call `walk` function to return a `node` and push it to `node.params`
        node.params.push(walk());
        token = tokens[current];
      }
      //increment `current` one last time to skip the closing
      current++;

      return node;
    }
    //if token not recognised
    throw new TypeError(token.type);
  }
  //create ast - abstract syntax tree. root is program node

  let ast = {
    type: 'Program',
    body: []
  };

  // invoke `walk` function to push nodes to `ast.body` array.
  while (current < tokens.length) {
    ast.body.push(walk());
  }

  return ast;
}

//TRAVERSER

// // define traverser function which accepts an AST and a visitor.
function traverser(ast, visitor) {
  //   //iterate over array and call next function
  function traverseArray(array, parent) {
    array.forEach(child => {
      traverseNode(child, parent);
    });
  }
  //
  //   //accept a `node` and its `parent` node to pass both
  function traverseNode(node, parent) {
    //test for  existence of a method on the visitor with a matching `type`.
    let methods = visitor[node.type];
    // If there is an `enter` method for this node type we'll call it with the
    //     // `node` and its `parent`.
    if (methods && methods.enter) {
      methods.enter(node, parent);
    }

    // split things up by the current node type.
    switch (node.type) {
      //start with top level `Program`
      //Program nodes have a property named body that has an array of nodes = traverse array and thus traverse nodes = traverse recusively
      case 'Program':
        traverseArray(node.body, node);
        break;
      // and call expression
      case 'CallExpression':
        traverseArray(node.params, node);
        break;
      //striung no child so break
      case 'StringLiteral':
        break;
      //error if unrecognised
      default:
        throw new TypeError(node.type);
    }
    //if exit method then do to both node and parent
    if (methods && methods.exit) {
      methods.exit(node, parent);
    }
  }
  //call traverser with ast - obv no parent
  traverseNode(ast, null);
}
