# CSE 154 Code Quality Guide() {

*A mostly reasonable approach to JavaScript adapted from [Airbnb's JavaScript Style Guide](https://github.com/airbnb/javascript)*

> Questions about the changes? Most of them were to meet the learning objectives of the course and simplify the guide for our needs rather than opinions on code style, but feel free to ask [Conner](mailto:ardmanc@uw.edu) any questions.

**NOTE** All JavaScript Code should be [validated](https://oxford.cs.washington.edu/154lint).

## Table of Contents

  1. [Variables](#variables)
  1. [Strings](#strings)
  1. [Functions](#functions)
  1. [Comparison Operators & Equality](#comparison-operators--equality)
  1. [Blocks](#blocks)
  1. [If/Else Statements](#if/else-statements)
  1. [Boolean Zen](#boolean-zen)
  1. [Loops](#loops)
  1. [Comments](#comments)
  1. [Whitespace](#whitespace)
  1. [Semicolons](#semicolons)
  1. [Naming Conventions](#naming-conventions)
  1. [Accessors](#accessors)
  1. [Events](#events)
  1. [jQuery](#jquery)
  1. [ECMAScript 5 Compatibility](#ecmascript-5-compatibility)
  1. [ECMAScript 6+ (ES 2015+) Styles](#ecmascript-6-es-2015-styles)
  1. [Standard Library](#standard-library)
  1. [Contributors](#contributors)
  1. [Amendments](#amendments)

## Variables

  <a name="variables--prefer-let"></a><a name="1.1"></a>
  - [1.1](#variables--prefer-let) Use `let` for all of your variables; avoid using `var`.
    > Why? `let` is block-scoped rather than function-scoped like `var`.

    ```javascript
    // bad
    var a = 1;
    var b = 2;

    // good
    const a = 1;
    const b = 2;
    ```

   <a name="variables--const"></a><a name="1.2"></a>
  - [1.2](#variables--const) Use `const` for all of your constants with `UPPERCASE_NAMING`. Use this for any "magic" values appearing in your code and declare them at the top of the module pattern.
    > Why? Not only does `const` prevent a variable from being reassigned, but these can also make your code much easier to read. As a note here, it is very common in industry to always prefer const over let when possible. There are benefits to this approach, but we are going to stick to only using const at the module-global level in this class.

    ```javascript
    // bad
    const alphabetLength = 26;
    let ALPHABET_LENGTH = 26;

    // good
    const ALPHABET_LENGTH = 26;
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

  <a name="variables--one-let"></a><a name="1.3"></a>
  - [1.3](#variables--one-let) Use one `let` or `const` declaration per variable or assignment.

    > Why? It’s easier to add new variable declarations this way, and you never have to worry about swapping out a `;` for a `,` or introducing punctuation-only diffs. You can also step through each declaration with the debugger, instead of jumping through all of them at once.

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

  <a name="variables--define-where-used"></a><a name="1.4"></a>
  - [1.4](#variables--define-where-used) Save expensive function calls into variables, but only once they are needed.

    ```javascript
    // bad
    if (list.indexOf("abc") >= 0) {
      list.remove(list.indexOf("abc"));
    }

    // good
    let index = list.indexOf("abc");
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

**[⬆ back to top](#table-of-contents)**

## Strings

  <a name="strings--quotes"></a><a name="2.1"></a>
  - [2.1](#strings--quotes) You can use either single or double quotes for strings, just be consistent across all of your code. Don't use backticks unless for proper use of [template literals](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Template_literals).

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
  - [3.1](#long--functions-last) If you have a single function that is very long, break it apart into smaller sub-functions. The definition of "very long" is vague, but often a function longer than 20-30 lines is pushing it.

    **TIP**: If you try to describe the function's purpose and find yourself using the word "and" a lot, that probably means the function does too many things and should be split into sub-functions.

  <a name="functions--anonymous"></a><a name="3.2"></a>
  - [3.2](#functions--anonymous) Always prefer named functions over anonymous functions. A good rule of thumb is that if you can think of a reasonable name, it should be named. Most anonymous functions should be 3 or less lines of code.

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
    arr = arr.filter(num => num % 2 != 0); // [1, 3, 5]
    ```


  <a name="functions--defaults-last"></a><a name="3.3"></a>
  - [3.3](#functions--defaults-last) Always put default parameters last.

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

## Comparison Operators & Equality

  <a name="comparison--eqeqeq"></a><a name="4.1"></a>
  - [4.1](#comparison--eqeqeq) Use `===` and `!==` over `==` and `!=`.

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

  <a name="comparison--shortcuts"></a><a name="4.2"></a>
  - [4.2](#comparison--shortcuts) Use shortcuts for booleans and null checks, but explicit comparisons for strings and numbers.

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

    **NOTE**: Conditional statements such as the `if` statement evaluate their expression using coercion with the `ToBoolean` abstract method and always follow these simple rules:

    - **Objects** evaluate to **true**
    - **Undefined** evaluates to **false**
    - **Null** evaluates to **false**
    - **Booleans** evaluate to **the value of the boolean**
    - **Numbers** evaluate to **false** if **+0, -0, or NaN**, otherwise **true**
    - **Strings** evaluate to **false** if an empty string `''`, otherwise **true**

    ```javascript
    if ([0] && []) {
      // true
      // an array (even an empty one) is an object, objects will evaluate to true
    }
    ```

  <a name="comparison--ternaries"></a><a name="4.3"></a>
  - [4.3](#comparison--ternaries) Ternaries can be used, but they should not be nested and generally be single line expressions. Additionally, you should not use them in cases where they are completely unnecessary.

    > What's this? The ternary operator is a common shorthand notation in programming languages in the form of "let variable = expression ? value : value". If expression is true, the variable gets set to the first value after the "?". Otherwise, it is set to the value after the ":".

    ```javascript
    // bad
    let foo = maybe1 > maybe2
      ? "bar"
      : value1 > value2 ? "baz" : null;

    // good - split into 2 separated ternary expressions
    let maybeNull = value1 > value2 ? 'baz' : null;

    let foo = maybe1 > maybe2 ? 'bar' : maybeNull;
    ```

    ```javascript
    // bad
    let foo = a ? a : b;
    let bar = c ? true : false;
    let baz = c ? false : true;

    // good
    let foo = a || b;
    let bar = !!c;
    let baz = !c;
    ```

  <a name="comparison--no-mixed-operators"></a><a name="4.4"></a>
  - [4.4](#comparison--no-mixed-operators) When mixing operators, enclose them in parentheses. The only exception is the standard arithmetic operators (`+`, `-`, `*`, & `/`) since their precedence is broadly understood.

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

## Blocks

  <a name="blocks--braces"></a><a name="16.1"></a>
  - [5.1](#blocks--braces) Use braces for the start of any block, regardless of the number of lines. Always go to a new line after the curly braces.

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

## If/Else Statements

  <a name="if--branching"></a><a name="6.1"></a>
  - [6.1](#if--branching) When using `if/else` statements, properly choose between various `if` and `else` patterns depending on whether the conditions relate to one another. Avoid redundant or unnecessary `if` tests.

    ```javascript
    // bad
    if (grade >= 90) {
      alert("You got an A!");
    }
    if (grade >= 80 && grade < 90) {
      alert("You got a B!");
    }
    if (grade >= 70 && grade < 80) {
      alert("You got a C!");
    }

    // good
    if (grade >= 90) {
      alert("You got an A!");
    } else if (grade >= 80) {
      alert("You got a B!");
    } else if (grade >= 70) {
      alert("You got a C!");
    }
    ```

  <a name="if--factoring"></a><a name="6.2"></a>
  - [6.2](#if--factoring) Move common code out of `if/else` statements to avoid redundancy.

    ```javascript
    // bad
    if (x < y) {
      foo();
      x++;
      alert("hi");
    } else {
      foo();
      y++;
      alert("hi");
    }

    // good
    foo();
    if (x < y) {
      x++;
    } else {
      y++;
    }
    alert("hi");
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

  <a name="if--cuddled-elses"></a><a name="6.3"></a>
  - [6.3](#if--cuddled-elses) Put `else` on the same line as your `if` block’s closing brace.

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

  <a name="control-statements"></a><a name="6.4"></a>
  - [6.4](#control-statements) In case your `if` gets too long or exceeds the maximum line length, each (grouped) condition could be put into a new line. The logical operator should begin the line. The same is true for `else if` and `while`.

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

  <a name="boolean--zen"></a><a name="7.1"></a>
  - [7.1](#boolean--zen) Never test if a `boolean` value is `true` or `false` explicitly.

    ```javascript
    // bad
    if (myBool == true) {
      // ...
    }

    // good
    if (myBool) {
    // ...
    }
    ```

  <a name="boolean--zen-return"></a><a name="7.2"></a>
  - [7.2](#boolean--zen-return) If you have an `if/else` statement that returns a boolean value based on a test, just directly return the test's result instead.

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

## Loops

  <a name="for--while"></a><a name="8.1"></a>
  - [8.1](#for--while) Use a `for` loop when the number of repetitions is known (definite). Use a `while` loop when the number of repetitions is unknown (indefinite).

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

  <a name="break--continue"></a><a name="8.2"></a>
  - [8.2](#break--continue) Never use break, continue or empty return statements in this class.

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

## Comments

  <a name="comments--function-header"></a><a name="9.1"></a>
  - [9.1](#comments--function-header) For JavaScript code, we ask that you use [JSDoc](http://usejsdoc.org/) commenting syntax. This syntax provides a clear template for declaring parameters, return types, and special cases. If you have used JavaDoc before, this is a similar commenting style, only for JavaScript.

  In this class, we expect you to use the `@param` and `@return` annotation tags in JSDoc when appropriate for the function. The `@param` annotation specifies the name and type of each parameter, as well as what the purpose of that parameter is in the function. The `@return` annotation specifies the type and expected value of what is returned given the parameters and any other conditions of the function. You do not need to use any other JSDoc annotations in CSE 154. Here is an example of a function comment skeleton as reference:

  **NOTE**: Notice that JSDoc comments start with `/**` not `/*`

  **NOTE**: The description of your function should describe what the function does, not how it does it. The most important thing is that your comments should describe how the state of the page (and potentially module-global variables) will change by calling the function. Think about how to explain the purpose of the function without implementation details. A good rule of thumb is to never mention processes such as "looping over" things.

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

  <a name="comments--multiline"></a><a name="9.2"></a>
  - [9.2](#comments--multiline) Use `/* ... */` for multi-line comments.

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

  <a name="comments--singleline"></a><a name="9.3"></a>
  - [9.3](#comments--singleline) Use `//` for single line comments. Place single line comments on a newline above the subject of the comment. Put an empty line before the comment unless it’s on the first line of a block.

    **NOTE**: While not required, many programmers like to comment each module-global variable with a single line comment.

    ```javascript
    // bad
    let active = true;  // is current tab

    // good
    // is current tab
    let active = true;
    ```

    ```javascript
    // bad
      console.log('fetching type...');
      // set the default type to 'no type'
      const type = this.type || 'no type';

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

  <a name="comments--spaces"></a><a name="9.4"></a>
  - [9.4](#comments--spaces) Start all comments with a space to make it easier to read.

    ```javascript
    // bad
    //is current tab
    let active = true;

    // good
    // is current tab
    let active = true;
    ```

  <a name="comments--sources"></a><a name="9.5"></a>
  - [9.5](#comments--sources) Always cite sources in your comments if you use anything found online.

    **NOTE**: It is preferred to cite sources in the HTML so that your users actually see it!

    **BIG NOTE**: You should not be citing any sources on homework assignments as everything should be
    your own work or based on in class code (no need to cite our examples unless told otherwise). Feel free
    to use outside artwork, quotes, etc. in your creative projects with proper citations. If you want to use some
    code found online, ask your TA or instructor first then cite it with permission.

    ```javascript
    
    ```

**[⬆ back to top](#table-of-contents)**

## Whitespace

  <a name="whitespace--spaces"></a><a name="10.1"></a>
  - [10.1](#whitespace--spaces) Use soft tabs (space character) set to 2, 3 or 4 spaces. You should use the same tab length across all of your files.

    **NOTE**: Please ask a TA for assistance if you are unsure of how to correct this.

  <a name="whitespace--before-blocks"></a><a name="10.2"></a>
  - [10.2](#whitespace--before-blocks) Place 1 space before the leading brace.

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

  <a name="whitespace--around-keywords"></a><a name="10.3"></a>
  - [10.3](#whitespace--around-keywords) Place 1 space before the opening parenthesis in control statements (`if`, `while` etc.). Place no space between the argument list and the function name in function calls and declarations. 

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

  <a name="whitespace--infix-ops"></a><a name="10.4"></a>
  - [10.4](#whitespace--infix-ops) Set off operators with spaces.

    ```javascript
    // bad
    const x=y+5;

    // bad
    for (let i=0;i<arry.length;i++) {
      // ...
    }

    // good
    const x = y + 5;

    // good
    for (let i = 0; i <arr.length; i++) {
      // ...
    }
    ```

  <a name="whitespace--newline-at-end"></a><a name="10.5"></a>
  - [10.5](#whitespace--newline-at-end) Never have consecutive newline characters, even at the end of a file.

    ```javascript
    // bad
    funciton myFunc() {
      if (myBool) {
        return true;
      }


      // ...
    }


    function myOtherFunc() {
      // ..
    }
    ```

  ```javascript
    // good
    funciton myFunc() {
      if (myBool) {
        return true;
      }

      // ...
    }

    function myOtherFunc() {
      // ..
    }

  <a name="whitespace--padded-blocks"></a><a name="10.6"></a>
  - [10.6](#whitespace--padded-blocks) Do not pad your blocks with blank lines. Too much spacing can be just as bad as not enough.

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

  <a name="whitespace--comma-spacing"></a><a name="10.7"></a>
  - [10.7](#whitespace--comma-spacing) Avoid spaces before commas and require a space after commas.

    ```javascript
    // bad
    let arr = [1 , 2];

    // bad
    let arr = [1,2];

    // good
    let arr = [1, 2];
    ```

**[⬆ back to top](#table-of-contents)**

## Semicolons

  <a name="semicolons--required"></a><a name="11.1"></a>
  - [11.1](#semicolons--required) **Yup.**

    > Why? When JavaScript encounters a line break without a semicolon, it uses a set of rules called [Automatic Semicolon Insertion](https://tc39.github.io/ecma262/#sec-automatic-semicolon-insertion) to determine whether or not it should regard that line break as the end of a statement, and (as the name implies) place a semicolon into your code before the line break if it thinks so. ASI contains a few eccentric behaviors, though, and your code will break if JavaScript misinterprets your line break. These rules will become more complicated as new features become a part of JavaScript. Explicitly terminating your statements and configuring your linter to catch missing semicolons will help prevent you from encountering issues.

    ```javascript
    // bad - raises exception
    let luke = {}
    let leia = {}
    [luke, leia].forEach(jedi => jedi.father = 'vader')

    // bad - returns `undefined` instead of the value on the next line - although don't return on a new line anyways
    function foo() {
      return
        'search your feelings, you know it to be foo'
    }

    // good
    const luke = {};
    const leia = {};
    [luke, leia].forEach((jedi) => {
      jedi.father = 'vader';
    });

    // good
    function foo() {
      return 'search your feelings, you know it to be foo';
    }
    ```

**[⬆ back to top](#table-of-contents)**

## Naming Conventions

  <a name="naming--descriptive"></a><a name="12.1"></a>
  - [12.1](#naming--descriptive) Avoid single letter names unless an index in a loop. Be descriptive with your naming.

    ```javascript
    // bad
    function q() {
      // ...
    }

    // good
    function query() {
      // ...
    }
    ```

  <a name="naming--camelCase"></a><a name="12.2"></a>
  - [12.2](#naming--camelCase) Use `camelCase` when naming variables, objects and functions. As stated above, use `UPPERCASE_NAMING` for constants.

    ```javascript
    // bad
    let this_is_my_object = {};
    function MyFunction() {
      // ...
    }

    // good
    const thisIsMyObject = {};
    function myFunction() {
      // ...
    }
    ```

**[⬆ back to top](#table-of-contents)**

## Contributors
  - [Conner Ardman](mailto:ardmanc@uw.edu)
  - [Original Airbnb Contributors](https://github.com/airbnb/javascript/graphs/contributors)

**[⬆ back to top](#table-of-contents)**
# };
