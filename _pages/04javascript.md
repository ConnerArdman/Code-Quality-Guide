---
layout: page
title: JavaScript
permalink: /javascript/
---

# CSE 154 Code Quality Guide(JavaScript) {

*A mostly reasonable approach to JavaScript adapted from [Airbnb's JavaScript Style Guide](https://github.com/airbnb/javascript) for [CSE 154](https://cs.washington.edu/154) at the University of Washington.*

> Questions about the changes? Most of them were to meet the learning objectives of the course and simplify the guide for our needs rather than opinions on code style, but feel free to ask [Conner](mailto:ardmanc@uw.edu) any questions.

**NOTE**: All JavaScript Code should be [validated](https://oxford.cs.washington.edu/cse154/jslint/).

## Table of Contents

  1. [Variables](#variables)
  1. [Strings](#strings)
  1. [Functions](#functions)
  1. [Naming Conventions](#naming-conventions)
  1. [Comparison Operators & Equality](#comparison-operators--equality)
  1. [Loops](#loops)
  1. [If/Else Statements](#ifelse-statements)
  1. [Boolean Zen](#boolean-zen)
  1. [Curly Braces](#curly-braces)
  1. [Semicolons](#semicolons)
  1. [Comments](#comments)
  1. [Whitespace & Indentation](#whitespace--indentation)
  1. [Module Pattern & Strict Mode](#module-pattern--strict-mode)
  1. [Good JavaScript Design](#good-javascript-design)

## Variables

  <a name="variables-prefer-let"></a><a name="1.1"></a>
  - [1.1](#variables-prefer-let) Use `let` for all of your variables. Never use `var`.

    > Why? `let` is block-scoped rather than function-scoped like `var`.

    ```javascript
    // bad
    var a = 1;
    var b = 2;

    // good
    let a = 1;
    let b = 2;
    ```

   <a name="variables-const"></a><a name="1.2"></a>
  - [1.2](#variables-const) Use `const` for all of your constants with [`UPPERCASE_NAMING`](#naming-camelCase). Use this for any "magic" values appearing in your code and declare them at the top of the module pattern. In general, you should avoid having "random" numbers and strings appear in your code, especially when there is a clear name you could give them.

    > Why? Not only does `const` prevent a variable from being reassigned, but constants can also make your code much easier to read. As a note here, it is very common in industry to always prefer const over let when possible. There are benefits to this approach, but we are going to stick to only using const at the module-global level in this class.

    ```javascript
    // bad
    const alphabetLength = 26;
    let ALPHABET_LENGTH = 26;
    const FAVORITEWEBSITE = 'https://www.omfgdogs.com/';

    // good
    const ALPHABET_LENGTH = 26;
    const FAVORITE_WEBSITE = 'https://www.omfgdogs.com/';
    ```

    ```javascript
    // bad
    (function() {  
      function foo() {
        for (let i = 0; i < 12; i++) {
        // ...
        }
      }
	})();

    // good
    (function() {  
      const MONTHS = 12;

      function foo() {
        for (let i = 0; i < MONTHS; i++) {
        // ...
        }
      }
	})();
    ```

    **NOTE**: Both `let` and `const` are block-scoped, meaning that the variables only exist within the nearest curly braces.

    ```javascript
    // const and let only exist in the blocks they are defined in.
    function foo() {
      let a = 1;
      const B = 1;
      if (a == B) {
        let c = 1;
      }
      console.log(c); // ReferenceError
    }
    console.log(a); // ReferenceError
    console.log(B); // ReferenceError
    ```

  <a name="variables-one-let"></a><a name="1.3"></a>
  - [1.3](#variables-one-let) Use one `let` or `const` declaration per variable or assignment.

    > Why? It’s easier to add new variable declarations this way, and you never have to worry about swapping out a `;` for a `,`. You can also step through each declaration with the debugger, instead of jumping through all of them at once.

    ```javascript
    // bad
    let items = getItems(),
        goSportsTeam = true,
        dragonball = 'z';

    // good
    let items = getItems();
    let goSportsTeam = true;
    let dragonball = 'z';
    ```

  <a name="variables-define-where-used"></a><a name="1.4"></a>
  - [1.4](#variables-define-where-used) Save expensive function calls into variables, but only once they are needed.

    ```javascript
    // bad
    if (list.indexOf('abc') >= 0) {
      list.remove(list.indexOf('abc'));
    }

    // good
    let index = list.indexOf('abc');
    if (index >= 0) {
      list.remove(index);
    }
	```  

	```javascript
    // bad - unnecessary function call
    function checkName(hasName) {
      let name = getName();

      if (hasName) {
        // Never used the name variable here!
        return false;
      }

      if (name === 'test') {
        setName('');
        return false;
      }

      return name;
    }

    // good
    function checkName(hasName) {
      if (hasName) {
        return false;
      }

      let name = getName();

      if (name === 'test') {
        setName('');
        return false;
      }

      return name;
    }
    ```
  <a name="variables-no-dom-global"></a><a name="1.5"></a>
  - [1.5](#variables-no-dom-global) In general, do not store DOM elements as module-global variables. Instead prefer accessing the DOM.
    
    > Why? As a general good coding practice, we want to minimize the number of module-global variables that we use. Since we always have access to the DOM (and DOM lookups are fairly fast), there is usually no need to store these elements or their contents as persisting variables. That said, there are occasional exceptions to this rule, such as when the element is needed by multiple functions extremely frequently. 


**[⬆ back to top](#table-of-contents)**

## Strings

  <a name="strings-quotes"></a><a name="2.1"></a>
  - [2.1](#strings-quotes) You can use either single or double quotes for strings, just be consistent across all of your code. Don't use backticks unless for proper use of [template literals](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Template_literals).

    ```javascript
    // bad
    let name = "human";
    let friend = 'dog';

    // bad - don't use template literals unless for interpolation
    let name = `human`;

    // good
    let name = 'human';
    let friend = 'dog';

    // good
    let name = "human";
    let friend = "dog";
    ```

**[⬆ back to top](#table-of-contents)**

## Functions

  <a name="long-functions"></a><a name="3.1"></a>
  - [3.1](#long-functions) If you have a single function that is very long, break it apart into smaller sub-functions. The definition of "very long" is vague, but often a function longer than 20-30 lines is pushing it.

    **TIP**: If you try to describe the function's purpose and find yourself using the word "and" a lot, that probably means the function does too many things and should be split into sub-functions.

  <a name="functions-anonymous"></a><a name="3.2"></a>
  - [3.2](#functions-anonymous) Always prefer named functions over anonymous functions. A good rule of thumb is that if you can think of a reasonable name, it should be named. Most anonymous functions should be 3 or less lines of code.

    ```javascript
    // really bad - long anonymous function
    fetch(url)
      .then(checkStatus)
      .then(JSON.parse)
      .then(function(json) {
        names = json.names;
        for (let i = 0; i < names.length; i++) {
          sayHello(names[i]);
        }
      })
      .catch(console.log);
    ```

    ```javascript
    // also really bad - nested anonymous functions
    myButton.addEventListener('click', function() {
      setTimeout(function() {
        alert('hi!');
      }, 1000);
    });

    // good
    myButton.addEventListener('click', myButtonClick);

    function myButtonClick() {
      setTimeout(sayHi, 1000);
    }

    function sayHi() {
      alert('hi!');
    }

    ```

    **NOTE**: This does not mean that there is no place for anonymous functions and arrow functions. For example, when passing simple callback functions as parameters, it can often be clear and concise to use these. Generally arrow functions are preferred, but either is fine in this course.

    ```javascript
    // good
    let arr = [1, 2, 3, 4, 5];
    arr = arr.filter(num => num % 2 !== 0); // [1, 3, 5]
    ```


  <a name="functions-defaults-last"></a><a name="3.3"></a>
  - [3.3](#functions-defaults-last) Always put default parameters last.

    ```javascript
    // bad
    function handleThings(opts = {}, name) {
      // ...
    }

    // good
    function handleThings(name, opts = {}) {
      // ...
    }
    ```

**[⬆ back to top](#table-of-contents)**


## Naming Conventions

  <a name="naming-descriptive"></a><a name="4.1"></a>
  - [4.1](#naming-descriptive) Avoid single letter names unless it is for an index in a loop. Be descriptive with your naming. Optimally, a reader should understand what your functions and variables do without even reading your comments or the details of your code!

    ```javascript
    // bad
    function p() {
      // ...
    }

    // good
    function getPowerLevel() {
      // ...
    }
    ```

  <a name="naming-camelCase"></a><a name="4.2"></a>
  - [4.2](#naming-camelCase) Use `camelCase` when naming variables, objects and functions. As stated [above](#variables-const), use `UPPERCASE_NAMING` for constants.

    ```javascript
    // bad
    let this_is_my_object = {};
    function MyFunction() {
      // ...
    }

    // good
    let thisIsMyObject = {};
    function myFunction() {
      // ...
    }
    ```

**[⬆ back to top](#table-of-contents)**


## Comparison Operators & Equality

  <a name="comparison-eqeqeq"></a><a name="5.1"></a>
  - [5.1](#comparison-eqeqeq) Use `===` and `!==` over `==` and `!=`.

    > What's the difference? `===` performs a "strict" equality check, meaning that it checks value and type. `==` only checks for value. For example, the string `"0" == 0` is `true`, but `"0" === 0` is `false`. Only using `===` is generally good, because it can prevent unwanted bugs, such as any false values being evaluated as equal to null. For reference, [here](https://dorey.github.io/JavaScript-Equality-Table/) is a great table explaining the difference.

    ```javascript
    // bad
    if (a == b) {
      // ...
    }

    // good
    if (a === b) {
      // ...
    }
    ```

  <a name="comparison-shortcuts"></a><a name="5.2"></a>
  - [5.2](#comparison-shortcuts) Use shortcuts for booleans and null checks, but explicit comparisons for strings and numbers.

    **NOTE**: You will often hear instructors refer to this as boolean zen along with [this section](#boolean-zen)

    ```javascript
    // bad
    if (isValid === true) {
      // ...
    }

    // bad
    if (isValid !== null) {
      // ...
    }

    // bad
    if (isValid !== undefined) {
      // ...
    }

    // good
    if (isValid) {
      // ...
    }
    ```

    ```javascript
    // bad
    if (name) {
      // ...
    }

    // good
    if (name !== '') {
      // ...
    }
    ```

    ```javascript
    // bad
    if (collection.length) {
      // ...
    }

    // good
    if (collection.length > 0) {
      // ...
    }
    ```

    **NOTE**: Conditional statements such as the `if` statement evaluate their expression using coercion with the `ToBoolean` abstract method and always follow these simple rules. However, you should avoid using these "tricks" as they can make your code very hard to read:

    - **Objects** evaluate to **true**
    - **Undefined** evaluates to **false**
    - **Null** evaluates to **false**
    - **Booleans** evaluate to **the value of the boolean**
    - **Numbers** evaluate to **false** if **+0, -0, or NaN**, otherwise **true**
    - **Strings** evaluate to **false** if an empty string `''`, otherwise **true**

    More on this [here](https://dorey.github.io/JavaScript-Equality-Table/).

    ```javascript
    if ([0] && []) {
      // true
      // an array (even an empty one) is an object, objects will evaluate to true
    }
    ```

  <a name="comparison-ternaries"></a><a name="5.3"></a>
  - [5.3](#comparison-ternaries) Ternaries can be used, but they should not be nested and should be single line expressions. Additionally, you should not use them in cases where they are completely unnecessary.

    > What's this? The ternary operator is a common shorthand notation in programming languages in the form of "let variable = expression ? value1 : value2". If expression is true, the variable gets set to value1 after the "?". Otherwise, it is set to value2 after the ":".

    ```javascript
    // bad
    let foo = maybe1 > maybe2
      ? 'bar'
      : value1 > value2 ? 'baz' : null;

    // good - split into 2 separated ternary expressions
    let maybeNull = value1 > value2 ? 'baz' : null;

    let foo = maybe1 > maybe2 ? 'bar' : maybeNull;
    ```

    ```javascript
    // bad
    let foo = a ? a : b;
    let baz = c ? false : true;

    // good
    let foo = a || b;
    let baz = !c;
    ```

  <a name="comparison-no-mixed-operators"></a><a name="5.4"></a>
  - [5.4](#comparison-no-mixed-operators) When mixing operators, enclose them in parentheses. The only exception is the standard arithmetic operators (`+`, `-`, `*`, & `/`) since their precedence is broadly understood.

    > Why? This improves readability and clarifies the developer’s intention.

    ```javascript
    // bad
    let foo = a && b < 0 || c > 0 || d + 1 === 0;

    // bad
    let bar = a ** b - 5 % d;

    // bad
    // one may be confused into thinking (a || b) && c
    if (a || b && c) {
      return d;
    }

    // good
    let foo = (a && b < 0) || c > 0 || (d + 1 === 0);

    // good
    let bar = (a ** b) - (5 % d);

    // good
    if (a || (b && c)) {
      return d;
    }

    // good
    let bar = a + b / c * d;
    ```

**[⬆ back to top](#table-of-contents)**

## Loops

  <a name="for-while"></a><a name="6.1"></a>
  - [6.1](#for-while) Use a `for` loop when the number of repetitions is known (definite). Use a `while` loop when the number of repetitions is unknown (indefinite).

    ```javascript
    // bad
    let i = 0;
    while (i < arr.length) {
      console.log(arr[i]);
      i++;
    }

    // good
    for (let i = 0; i < arr.length; i++) {
      console.log(arr[i]);
    }
    ```

    ```javascript
    // bad - notice the middle condition does not use i at all, and it is not used in the loop!
    let sum = 0;
    for (let i = 0; sum < 1000; i++) {
      sum += Math.random();
    }

    // good
    let sum = 0;
    while (sum < 1000) {
      sum += Math.random();
    }
    ```

  <a name="break-continue"></a><a name="6.2"></a>
  - [6.2](#break-continue) Never use break, continue or empty return statements in this class.

    > Why? For the length and complexity of the programs we ask you to write, these statements deviate from clear logical flow and you should instead consider ways to refactor your conditional statements and loops to handle different cases without forced "shortcuts".

    ```javascript
    // bad - contrived example, but the idea is you can usually replace the break with conditions.
    while (i < arr.length) {
      if (i > 5) {
        break;
      }
      console.log(arr[i]);
      i++;
    }

    // good
    while (i < arr.length && i <= 5) {
      console.log(arr[i]);
      i++;
    }
    ```

    ```javascript
    // bad
    function foo(num) {
      if (num === 1) {
        return;
      }
      console.log(num + 5);
    }

    // good
    function foo(num) {
      if (num !== 1) {
        console.log(num + 5);
      }
    }
    ```

**[⬆ back to top](#table-of-contents)**

## If/Else Statements

  <a name="if-branching"></a><a name="7.1"></a>
  - [7.1](#if-branching) When using `if/else` statements, properly choose between various `if` and `else` patterns depending on whether the conditions relate to one another. Avoid redundant or unnecessary `if` tests.

    ```javascript
    // bad
    if (grade >= 90) {
      alert('You got an A!');
    }
    if (grade >= 80 && grade < 90) {
      alert('You got a B!');
    }
    if (grade >= 70 && grade < 80) {
      alert('You got a C!');
    }

    // good
    if (grade >= 90) {
      alert('You got an A!');
    } else if (grade >= 80) {
      alert('You got a B!');
    } else if (grade >= 70) {
      alert('You got a C!');
    }
    ```

  <a name="if-factoring"></a><a name="7.2"></a>
  - [7.2](#if-factoring) Move common code out of `if/else` statements to avoid redundancy.

    ```javascript
    // bad
    if (x < y) {
      foo();
      x++;
      alert('hi');
    } else {
      foo();
      y++;
      alert('hi');
    }

    // good
    foo();
    if (x < y) {
      x++;
    } else {
      y++;
    }
    alert('hi');
    ```

    ```javascript
    // bad
    if (foo() || a) {
      // ...
    } else if (foo() || b) {
      // ...
    }

    // good
    let c = foo();
    if (c || a) {
      // ...
    } else if (c || b) {
      // ...
    }
    ```

  <a name="if-cuddled-elses"></a><a name="7.3"></a>
  - [7.3](#if-cuddled-elses) Put `else` on the same line as your `if` block’s closing brace.

    ```javascript
    // bad
    if (test) {
      thing1();
      thing2();
    }
    else {
      thing3();
    }

    // good
    if (test) {
      thing1();
      thing2();
    } else {
      thing3();
    }
    ```

  <a name="control-statements"></a><a name="7.4"></a>
  - [7.4](#control-statements) In case your `if` gets too long or exceeds the maximum line length, each (grouped) condition could be put into a new line. The logical operator should begin the line. The same is true for `else if` and `while`.

    > Why? Requiring operators at the beginning of the line keeps the operators aligned, improving readability by making it easier to visually follow complex logic.

    ```javascript
    // bad
    if ((foo === 123 || bar === 'abc') && doesItLookGoodWhenItBecomesThatLong() && isThisReallyHappening()) {
      // ...
    }

    // bad
    if (foo === 123 &&
      bar === 'abc') {
      // ...
    }

    // bad
    if (foo === 123
      && bar === 'abc') {
      // ...
    }

    // bad
    if (
      foo === 123 &&
      bar === 'abc'
    ) {
      // ...
    }

    // bad
    if (
      foo === 123
      && bar === 'abc'
    ) {
      // ...
    }

    // good
    if ((foo === 123 || bar === 'abc')
      && doesItLookGoodWhenItBecomesThatLong()
      && isThisReallyHappening()
    ) {
      // ...
    }

    // good
    if (foo === 123 && bar === 'abc') {
      // ...
    }
    ```

**[⬆ back to top](#table-of-contents)**

## Boolean Zen

  <a name="boolean-zen"></a><a name="8.1"></a>
  - [8.1](#boolean-zen) Never test if a `boolean` value is `true` or `false` explicitly.

    ```javascript
    // bad
    if (myBool === true) {
      // ...
    }

    // good
    if (myBool) {
      // ...
    }
    ```

    ```javascript
    // bad
    if (myBool === false) {
      // ...
    }

    // good
    if (!myBool) {
      // ...
    }
    ```

  <a name="boolean-zen-return"></a><a name="8.2"></a>
  - [8.2](#boolean-zen-return) If you have an `if/else` statement that returns a boolean value based on a test, just directly return the test's result instead.

    ```javascript
    // bad
    if (score1 === score2) {
      return true;
    } else {
      return false;
    }

    // good
    return score1 === score2;
    ```

**[⬆ back to top](#table-of-contents)**

## Curly Braces

  <a name="blocks-braces"></a><a name="9.1"></a>
  - [9.1](#blocks-braces) Use braces for the start of any block, regardless of the number of lines. Always go to a new line after the curly braces.

    ```javascript
    // bad
    if (test)
      return false;

    // bad
    if (test) return false;

    // good
    if (test) {
      return false;
    }
    ```

    ```javascript
    // bad
    function foo() { return false; }

    // good
    function foo() {
      return false;
    }
    ```

**[⬆ back to top](#table-of-contents)**

## Semicolons

  <a name="semicolons-required"></a><a name="10.1"></a>
  - [10.1](#semicolons-required) **Use them.**

    > Why? When JavaScript encounters a line break without a semicolon, it uses a set of rules called [Automatic Semicolon Insertion](https://tc39.github.io/ecma262/#sec-automatic-semicolon-insertion) to determine whether or not it should regard that line break as the end of a statement, and (as the name implies) place a semicolon into your code before the line break if it thinks so. ASI contains a few eccentric behaviors, though, and your code will break if JavaScript misinterprets your line break. These rules will become more complicated as new features become a part of JavaScript. Explicitly terminating your statements and configuring your linter to catch missing semicolons will help prevent you from encountering issues.

    ```javascript
    // bad - raises exception
    let luke = {}
    let yoda = {}
    [luke, yoda].forEach(jedi => jedi.force = 'strong')

    // good
    const luke = {};
    const yoda = {};
    [luke, yoda].forEach(jedi => jedi.force = 'strong');
    ```

    ```javascript
    // bad - returns `undefined` instead of the value on the next line
    //       although you shouldn't return on a new line anyways
    function foo() {
      return
        'search your feelings, you know it to be foo'
    }

    // good
    function foo() {
      return 'search your feelings, you know it to be foo';
    }
    ```

**[⬆ back to top](#table-of-contents)**

## Comments

  <a name="comments-function-header"></a><a name="11.1"></a>
  - [11.1](#comments-function-header) For JavaScript functions, we ask that you use [JSDoc](http://usejsdoc.org/) commenting syntax. This syntax provides a clear template for declaring parameters, return types, and special cases. If you have used JavaDoc before, this is a similar commenting style, only for JavaScript. In this class, we expect you to use the `@param` and `@return` annotation tags in JSDoc when appropriate for the function. The `@param` annotation specifies the name and type of each parameter, as well as what the purpose of that parameter is in the function. The `@return` annotation specifies the type and expected value of what is returned given the parameters and any other conditions of the function. You do not need to use any other JSDoc annotations in CSE 154. Here is an example of a function comment skeleton as reference:

    **NOTE**: Notice that JSDoc comments start with `/**` not `/*`

    **NOTE**: The description of your function should describe what the function does, not how it does it. The most important thing is that your comments should describe how the state of the page (and potentially module-global variables) will change by calling the function. Think about how to explain the purpose of the function without implementation details. A good rule of thumb is to never mention processes such as "looping over" things.

    **NOTE**: If there are no parameters or no return value, there should still be a descriptive comment, but you can omit `@param` and `@return` annotations.

      ```javascript
      // Single-line JSDoc comment:
      /** Your comment here - description of function */
      function simpleFunction() {

      }

      // Multi-line JSDoc comment:
      /**
       * brief description of the function
       * @param {datatype} parameterName1 - parameter description
       * @param {datatype} parameterName2 - parameter description
       * @return {datatype} Description of the return value
       */
       function functionName() {

       }
      ```

  <a name="comments-multiline"></a><a name="11.2"></a>
  - [11.2](#comments-multiline) Use `/* ... */` for multi-line comments.

    ```javascript
    // bad
    // this comment is getting really really really long
    // so I am going to break it into multiple lines, but now
    // there are lots of those ugly start of comment // characters

    // good
    /*
      This multiline comment is also getting really really long
      but I chose to use the correct operator and it is a bit
      nicer to look at
     */
    ```

  <a name="comments-singleline"></a><a name="11.3"></a>
  - [11.3](#comments-singleline) Use `//` for single line comments. When inside of a function, place single line comments on a newline above the subject of the comment, and put an empty line before the comment unless it’s on the first line of a block.

    **NOTE**: While not required, many programmers like to comment each module-global variable with a single line comment. These comments can go on the same line as the variable declaration.

    ```javascript
    // good
    (function {
      let active = true;  // is current tab
    })();

    // also good
    (function {
      // is current tab
      let active = true;
    })();
    ```

    ```javascript
    // bad
    console.log('fetching type...');
    // set the default type to 'no type'
    let type = this.type || 'no type';

    // bad
    function getType() {

      // set the default type to 'no type'
      return this.type || 'no type';
    }    

    // good
    function getType() {
      console.log('fetching type...');

      // set the default type to 'no type'
      return this.type || 'no type';
    }

    // also good
    function getType() {
      // set the default type to 'no type'
      return this.type || 'no type';
    }
    ```

  <a name="comments-spaces"></a><a name="11.4"></a>
  - [11.4](#comments-spaces) Start all comments with a space to make it easier to read.

    ```javascript
    // bad
    //is current tab
    let active = true;

    // good
    // is current tab
    let active = true;
    ```

**[⬆ back to top](#table-of-contents)**

## Whitespace & Indentation

  <a name="whitespace-before-blocks"></a><a name="12.1"></a>
  - [12.1](#whitespace-before-blocks) Place 1 space before the leading brace.

    ```javascript
    // bad
    function test(){
      console.log('test');
    }

    // good
    function test() {
      console.log('test');
    }

    // bad
    if (myBoolean){

    }

    // good
    if (myBoolean) {

    }
    ```

  <a name="whitespace-around-keywords"></a><a name="12.2"></a>
  - [12.2](#whitespace-around-keywords) Place 1 space before the opening parenthesis in control statements (`if`, `while` etc.). Place no space between the argument list and the function name in function calls and declarations.

    ```javascript
    // bad
    if(isJedi) {
      fight ();
    }

    // good
    if (isJedi) {
      fight();
    }

    // bad
    function fight () {
      console.log ('Swooosh!');
    }

    // good
    function fight() {
      console.log('Swooosh!');
    }
    ```

  <a name="whitespace-infix-ops"></a><a name="12.3"></a>
  - [12.3](#whitespace-infix-ops) Set off operators with spaces.

    ```javascript
    // bad
    let x=y+5;

    // bad
    for (let i=0;i<arr.length;i++) {
      // ...
    }

    // good
    let x = y + 5;

    // good
    for (let i = 0; i < arr.length; i++) {
      // ...
    }
    ```

  <a name="whitespace-padded-blocks"></a><a name="12.4"></a>
  - [12.4](#whitespace-padded-blocks) Do not pad your blocks with blank lines. Too much spacing can be just as bad as not enough.

    ```javascript
    // bad
    function bar() {

      console.log(foo);

    }

    // bad
    if (baz) {

      console.log(qux);
    } else {
      console.log(foo);

    }

    // good
    function bar() {
      console.log(foo);
    }

    // good
    if (baz) {
      console.log(qux);
    } else {
      console.log(foo);
    }
    ```

  <a name="whitespace-comma-spacing"></a><a name="12.5"></a>
  - [12.5](#whitespace-comma-spacing) Avoid spaces before commas and require a space after commas.

    ```javascript
    // bad
    let arr = [1 , 2];

    // bad
    let arr = [1,2];

    // good
    let arr = [1, 2];
    ```

  <a name="whitespace-indenting"></a><a name="12.6"></a>
  - [12.6](#whitespace-indenting) Always indent one time for each nested block.

    ```javascript
    // bad
    if (myBool) {
    return true;
    }

    // good
    if (myBool) {
      return true;
    }
    ```

    ```javascript
    // bad
    if (myBool) {
      for (let i = 0; i <arr.length; i++) {
        doSomething(arr[i]);
      }
        doSomethingElse();
        return true;
    }

    // good
    if (myBool) {
      for (let i = 0; i <arr.length; i++) {
        doSomething(arr[i]);
      }
      doSomethingElse();
      return true;
    }
    ```

**[⬆ back to top](#table-of-contents)**

## Module Pattern & Strict Mode

  <a name="module-pattern"></a><a name="14.1"></a>
  - [13.1](#module-pattern) Always use the module pattern to contain your code. No code should exist outside of this pattern.

    > Why? Any code outside of the module pattern becomes global to your entire site. This means that any code you define will be able to interact with other global code and vice versa. The problem here, is that this can create unexpected behavior. For example, if two files both define functions with the same name, the second file's function would override the first one's (since HTML is loaded from top to bottom).

    See example in [14.2](#use-strict)

  <a name="use-strict"></a><a name="13.2"></a>
  - [13.2](#use-strict) Always write a `"use strict";` declaration at the top of your module pattern to tell the browser to enable strict syntax checking of your JavaScript code.

    ```javascript
    // good
    (function() {
      "use strict";
      // ...
    })();
    ```

**[⬆ back to top](#table-of-contents)**

## Good JavaScript Design

  <a name="unobtrusive-js"></a><a name="15.1"></a>
  - [14.1](#unobtrusive-js) Never use element.innerHTML for anything other than clearing containers. Prefer createElement().

    ```javascript
    // bad
    div.innerHTML = '<img src="dog.jpg" alt="boundless pupper" />';

    // good
    let img = document.createElement('img');
    img.src = 'dog.jpg';
    img.alt = 'boundless pupper';
    div.appendChild(img);

    // also good - clearing container
    div.innerHTML = '';
    ```  

  <a name="minimize-redundancy"></a><a name="15.2"></a>
  - [14.2](#minimize-redundancy) Minimize redundant code as much as possible.

    **TIP**: If the same or extremely similar chunks of code (2+ lines) are repeated, you should probably factor it out. If code is slightly different, try representing the differences as parameters to functions!

    ```javascript
    // bad
    foo();
    x = 10;
    y++;

    // somewhere later in the code...
    foo();
    x = 15;
    y++;
    ```

    ```javascript
    // good
    function helper(newX) {
      foo();
      x = newX;
      y++;
    }

    helper(10);

    // somewhere later in the code...
    helper(15);
    ```

    <a name="no-css"></a><a name="15.3"></a>
  - [14.3](#no-css) Do not include any CSS styles in JavaScript unless absolutely necessary. Prefer adding and removing classes.

    **NOTE**: There are two primary ways to add a class with JavaScript, using
    `element.classList.add("class-name")` and `element.className = "class-name"`.
    However there is a key difference, setting `className` directly results in deleting
    all other classes, while `classList.add()` simply adds a new class. For this reason,
    we usually prefer utilizing the `add()` and `remove()` functions of the classList.

    **TIP**: A good rule of thumb is that if you can make a CSS class to easily achieve your desired output, you should do that instead. Styling in JavaScript should only occur when adding dynamic styles (such as a random color) that cannot be predetermined with CSS classes.

    ```javascript
    // bad
    div.style.color = 'red';

    // better - this isn't great, because it would remove all other classes from div.
    div.className = 'red';

    // good
    div.classList.add('red');
    ```

    ```javascript
    // good - there is no way to do this in CSS!
    div.style.color = genRandomColor();

    /**
     * Don't worry about what this function does. It is mostly black magic.
     * From here: https://www.paulirish.com/2009/random-hex-color-code-snippets/
     * @return {String} Random hex code starting with a '#'
     */
    function genRandomColor() {
      return '#'+Math.floor(Math.random()*16777215).toString(16);
    }
    ```

  <a name="no-log"></a><a name="15.4"></a>
  - [14.4](#no-log) Never turn in code with `console.log()`, `alert()`, `debugger`, commented out code or other debugging code left in. The one exception here is you can use `.catch(console.log)` when we do not specify anything else to do with the error.

**[⬆ back to top](#table-of-contents)**

# };
