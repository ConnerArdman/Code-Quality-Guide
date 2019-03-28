# CSE 154 Code Quality Guide(PHP) {

*A largely logical PHP code quality guide for [CSE 154](https:#cs.washington.edu/154) at the University of Washington.*

**NOTE**: Many of these rules are the same or similar to those in the [JavaScript guide](javascript.md). The two languages share a similar "C-like" syntax, and thus we have similar code quality guidelines.

## Table of Contents

  1. [Variables](#variables)
  1. [Strings](#strings)
  1. [Naming Conventions](#naming-conventions)
  1. [Comparison Operators & Equality](#comparison-operators--equality)
  1. [Loops](#loops)
  1. [If/Else Statements](#ifelse-statements)
  1. [Boolean Zen](#boolean-zen)
  1. [Curly Braces](#curly-braces)
  1. [Comments](#comments)
  1. [Whitespace & Indentation](#whitespace--indentation)
  1. [Good PHP Design](#good-php-design)

## Other Guides
  1. [General Guidelines](README.md)
  1. [HTML](HTML.md)
  1. [CSS](CSS.md)
  1. [JavaScript](javascript.md)

## Variables

  <a name="no-global"></a><a name="1.1"></a>
  - [1.1](#no-global) Never use the `global` keyword. Instead, pass variables as parameters.

    > Why? It is important to keep our functions modular, meaning they are not dependant on other code. By passing parameters, our functions work regardless of the names of variables. Think of the global scope as being equivilent to a "main" function in another language, where we would call functions with parameters created in main.

    ```php
    # bad
    $count = 10;
    print_count();

    function print_count() {
      global $count;
      echo $count;
    }
    ```

    ```php
    # good
    $count = 10;
    print_count($count);

    function print_count($count) {
      echo $count;
    }
    ```

  <a name="variables-define-where-used"></a><a name="1.2"></a>
  - [1.2](#variables-define-where-used) Save expensive function calls into variables, but only once they are needed.

    ```php
    # bad
    if (strlen(file_get_contents("foo.txt")) >= 0) {
      $text = strtolower(file_get_contents("foo.txt"));
    }

    # good
    $text = file_get_contents("foo.txt");
    if (strlen($text) >= 0) {
      $text = strtolower($text);
    }
    ```  

    ```php
    # bad - unnecessary function call
    function check_name($has_name) {
      $name = getName();

      if ($has_name) {
        # Never used the $name variable here!
        return false;
      }

      if ($name === "test") {
        set_name("");
        return false;
      }

      return $name;
    }

    # good
    function checkName($has_name) {
      if ($has_name) {
        return false;
      }

      $name = get_name();

      if ($name === "test") {
        set_name("");
        return false;
      }

      return $name;
    }
    ```

**[⬆ back to top](#table-of-contents)**

## Strings

  <a name="strings-quotes"></a><a name="2.1"></a>
  - [2.1](#strings-quotes) Using double quotes is necessary in PHP for strings containing variables. For consistency, we prefer that you use double quotes for all strings, however you may use single quotes for strings not containing variables.

    > Why? There is actually a really good argument here for single quotes. In double quoted strings, PHP has to search the string for variables, which slows down the runtime. Single quoted strings don't require the same level of processing.

    ```php
    # bad
    $name = "human";
    $friend = 'dog';

    # good
    $name = "human";
    $friend = "dog";

    # good
    $name = 'human';
    $friend = 'dog';
    ```

**[⬆ back to top](#table-of-contents)**

## Naming Conventions

  <a name="naming-descriptive"></a><a name="3.1"></a>
  - [3.1](#naming-descriptive) Avoid single letter names unless it is for an index in a loop. Be descriptive with your naming. Optimally, a reader should understand what your functions and variables do without even reading your comments or the details of your code!

    ```php
    # bad
    function p() {
      # ...
    }

    # good
    function getPowerLevel() {
      # ...
    }
    ```

  <a name="naming-underscore"></a><a name="3.2"></a>
  - [3.2](#naming-underscore) Use `$underscore_naming` when naming variables, objects and functions. Constants may use `$UPPERCASE_NAMING`.

    ```php
    # bad
    $myString = "Go Dawgs!";
    function MyFunction() {
      # ...
    }

    # good
    $my_string = "Go Dawgs!";
    function my_function() {
      # ...
    }
    ```

  <a name="lowercase-functions"></a><a name="3.3"></a>
  - [3.3](#lowercase-functions) While PHP is mostly case-insensative, always use lowercase to reference built in functions.


**[⬆ back to top](#table-of-contents)**


## Comparison Operators & Equality

  <a name="comparison-eqeqeq"></a><a name="4.1"></a>
  - [4.1](#comparison-eqeqeq) Use `===` and `!==` over `==` and `!=`.

    > What's the difference? Similar to JavaScript, `===` performs a "strict" equality check, meaning that it checks value and type. `==` only checks for value. For example, the string `"0" == 0` is `true`, but `"0" === 0` is `false`. Only using `===` is generally good, because it can prevent unwanted bugs, such as any false values being evaluated as equal to null.

    ```php
    # bad
    if ($a == $b) {
      # ...
    }

    # good
    if ($a === $b) {
      # ...
    }
    ```

  <a name="comparison-shortcuts"></a><a name="4.2"></a>
  - [4.2](#comparison-shortcuts) Use shortcuts for booleans and null checks, but explicit comparisons for strings and numbers.

    **NOTE**: You will often hear instructors refer to this as boolean zen along with [this section](#boolean-zen)

    ```php
    # bad
    if ($is_valid === true) {
      # ...
    }

    # bad
    if ($is_valid !== null) {
      # ...
    }

    # good
    if ($is_valid) {
      # ...
    }
    ```

  <a name="comparison-ternaries"></a><a name="4.3"></a>
  - [4.3](#comparison-ternaries) Ternaries can be used, but they should not be nested and should be single line expressions. Additionally, you should not use them in cases where they are completely unnecessary.

    > What's this? The ternary operator is a common shorthand notation in programming languages in the form of "$variable = expression ? value1 : value2". If expression is true, the $variable gets set to value1 after the "?". Otherwise, it is set to value2 after the ":".

    ```php
    # bad
    $foo = $maybe1 > $maybe2
      ? "bar"
      : $value1 > $value2 ? "baz" : null;

    # good - split into 2 separated ternary expressions
    $maybe_null = $value1 > $value2 ? "baz" : null;

    $foo = $maybe1 > $maybe2 ? "bar" : $maybe_null;
    ```

    ```php
    # bad
    $foo = $a ? $a : $b;
    $baz = $c ? false : true;

    # good
    $foo = $a || $b;
    $baz = !$c;
    ```

  <a name="comparison-no-mixed-operators"></a><a name="4.4"></a>
  - [4.4](#comparison-no-mixed-operators) When mixing operators, enclose them in parentheses. The only exception is the standard arithmetic operators (`+`, `-`, `*`, & `/`) since their precedence is broadly understood.

    > Why? This improves readability and clarifies the developer’s intention.

    ```php
    # bad
    $foo = $a && $b < 0 || $c > 0 || $d + 1 === 0;

    # bad
    $bar = $a ** $b - 5 % $d;

    # bad
    # one may be confused into thinking ($a || $b) && $c
    if ($a || $b && $c) {
      return $d;
    }

    # good
    $foo = ($a && $b < 0) || $c > 0 || ($d + 1 === 0);

    # good
    $bar = ($a ** $b) - (5 % $d);

    # good
    if ($a || ($b && $c)) {
      return $d;
    }

    # good
    $bar = $a + $b / $c * $d;
    ```

**[⬆ back to top](#table-of-contents)**

## Loops

  <a name="for-while"></a><a name="5.1"></a>
  - [5.1](#for-while) Use a `for` loop when the number of repetitions is known (definite). Use a `while` loop when the number of repetitions is unknown (indefinite).

    ```php
    # bad
    $i = 0;
    while ($i < count($arr)) {
      echo arr[$i];
      $i++;
    }

    # good
    for ($i = 0; $i < count($arr); $i++) {
      echo arr[$i];
    }
    ```

    ```php
    # bad - notice the middle condition does not use $i at all, and it is not used in the loop!
    $sum = 0;
    for ($i = 0; $sum < 1000; $i++) {
      $sum += rand();
    }

    # good
    $sum = 0;
    while ($sum < 1000) {
      $sum += rand();
    }
    ```

  <a name="break-continue"></a><a name="5.2"></a>
  - [5.2](#break-continue) Never use break, continue or empty return statements in this class.

    > Why? For the length and complexity of the programs we ask you to write, these statements deviate from clear logical flow and you should instead consider ways to refactor your conditional statements and loops to handle different cases without forced "shortcuts".

    ```php
    # bad - contrived example, but the idea is you can usually replace the break with conditions.
    while ($i < count($arr)) {
      if ($i > 5) {
        break;
      }
      echo arr[i];
      $i++;
    }

    # good
    while ($i < count($arr) && $i <= 5) {
      echo arr[i];
      $i++;
    }
    ```

    ```php
    # bad
    function foo($num) {
      if ($num === 1) {
        return;
      } 
      echo $num + 5;
    }

    # good
    function foo(num) {
      if ($num !== 1) {
        echo $num + 5;
      }
    }
    ```

**[⬆ back to top](#table-of-contents)**

## If/Else Statements

  <a name="if-branching"></a><a name="6.1"></a>
  - [6.1](#if-branching) When using `if/else` statements, properly choose between various `if` and `else` patterns depending on whether the conditions relate to one another. Avoid redundant or unnecessary `if` tests.

    ```php
    # bad
    if ($grade >= 90) {
      echo "You got an A!";
    }
    if ($grade >= 80 && $grade < 90) {
      echo "You got a B!";
    }
    if ($grade >= 70 && $grade < 80) {
      echo "You got a C!";
    }

    # good
    if ($grade >= 90) {
      echo "You got an A!";
    } else if ($grade >= 80) {
      echo "You got a B!";
    } else if ($grade >= 70) {
      echo "You got a C!";
    }
    ```

  <a name="if-factoring"></a><a name="6.2"></a>
  - [6.2](#if-factoring) Move common code out of `if/else` statements to avoid redundancy.

    ```php
    # bad
    if ($x < $y) {
      foo();
      $x++;
      echo "hi";
    } else {
      foo();
      $y++;
      echo "hi";
    }

    # good
    foo();
    if ($x < $y) {
      $x++;
    } else {
      $y++;
    }
    echo "hi";
    ```

    ```php
    # bad
    if (foo() || $a) {
      # ...
    } else if (foo() || $b) {
      # ...
    }

    # good
    let $c = foo();
    if ($c || $a) {
      # ...
    } else if ($c || $b) {
      # ...
    }
    ```

  <a name="if-cuddled-elses"></a><a name="6.3"></a>
  - [6.3](#if-cuddled-elses) Put `else` on the same line as your `if` block’s closing brace.

    ```php
    # bad
    if (test) {
      thing1();
      thing2();
    }
    else {
      thing3();
    }

    # good
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

    ```php
    # bad
    if (($foo === 123 || $bar === "abc") && doesItLookGoodWhenItBecomesThatLong() && isThisReallyHappening()) {
      # ...
    }

    # bad
    if ($foo === 123 &&
      $bar === "abc") {
      # ...
    }

    # bad
    if ($foo === 123
      && $bar === "abc") {
      # ...
    }

    # bad
    if (
      $foo === 123 &&
      $bar === "abc"
    ) {
      # ...
    }

    # bad
    if (
      $foo === 123
      && $bar === "abc"
    ) {
      # ...
    }

    # good
    if (($foo === 123 || $bar === "abc")
      && doesItLookGoodWhenItBecomesThatLong()
      && isThisReallyHappening()
    ) {
      # ...
    }

    # good
    if ($foo === 123 && $bar === "abc") {
      # ...
    }
    ```

**[⬆ back to top](#table-of-contents)**

## Boolean Zen

  <a name="boolean-zen"></a><a name="7.1"></a>
  - [7.1](#boolean-zen) Never test if a `boolean` value is `true` or `false` explicitly.

    ```php
    # bad
    if ($my_bool === true) {
      # ...
    }

    # good
    if (my_bool) {
      # ...
    }
    ```

    ```php
    # bad
    if (my_bool === false) {
      # ...
    }

    # good
    if (!my_bool) {
      # ...
    }
    ```

  <a name="boolean-zen-return"></a><a name="7.2"></a>
  - [7.2](#boolean-zen-return) If you have an `if/else` statement that returns a boolean value based on a test, just directly return the test's result instead.

    ```php
    # bad
    if ($score1 === $score2) {
      return true;
    } else {
      return false;
    }

    # good
    return $score1 === $score2;
    ```

**[⬆ back to top](#table-of-contents)**

## Curly Braces

  <a name="blocks-braces"></a><a name="8.1"></a>
  - [8.1](#blocks-braces) Use braces for the start of any block, regardless of the number of lines. Always go to a new line after the curly braces.

    ```php
    # bad
    if ($test)
      return false;

    # bad
    if ($test) return false;

    # good
    if ($test) {
      return false;
    }
    ```

    ```php
    # bad
    function foo() { return false; }

    # good
    function foo() {
      return false;
    }
    ```

**[⬆ back to top](#table-of-contents)**

## Comments

  <a name="comments-function-header"></a><a name="9.1"></a>
  - [9.1](#comments-function-header) We prefer that you follow the same conventions of function header comments as in [JavaScript](javascript.md/#comments-function-header) for consistency across our code.

  <a name="comments-multiline"></a><a name="9.2"></a>
  - [9.2](#comments-multiline) Use `/* ... */` for multi-line comments.

    ```php
    # bad
    # this comment is getting really really really long
    # so I am going to break it into multiple lines, but now
    # there are lots of those ugly start of comment # characters

    # good
    /*
      This multiline comment is also getting really really long
      but I chose to use the correct operator and it is a bit
      nicer to look at
     */
    ```

  <a name="comments-singleline"></a><a name="9.3"></a>
  - [9.3](#comments-singleline) Use `#` or `//` for single line comments, but be consistent throughout your code. Place single line comments on a newline above the subject of the comment. Put an empty line before the comment unless it’s on the first line of a block.

    ```php
    # bad
    echo "hello!";
    # set the default type to 'no type'
    if ($has_type === false) {
      $type = "none";
    }

    # good
    echo "hello!";

    # set the default type to 'no type'
    if ($has_type === false) {
      $type = "none";
    }
    ```

    ```php
    # bad
    function get_type($has_type) {

      # set the default type to 'no type'
      if ($has_type === false) {
        return "none";
      }
      return calculate_type();
    }    

    # good
    function get_type() {
      # set the default type to 'no type'
      if ($has_type === false) {
        return "none";
      }
      return calculate_type();
    }
    ```

  <a name="comments-spaces"></a><a name="9.4"></a>
  - [9.4](#comments-spaces) Start all comments with a space to make it easier to read.

    ```php
    # bad
    #is current tab
    $active = true;

    # good
    # is current tab
    $active = true;
    ```

**[⬆ back to top](#table-of-contents)**

## Whitespace & Indentation

  <a name="whitespace-before-blocks"></a><a name="10.1"></a>
  - [10.1](#whitespace-before-blocks) Place 1 space before the leading brace.

    ```php
    # bad
    function test(){
      echo "test";
    }

    # good
    function test() {
      echo "test";
    }

    # bad
    if (my_boolean){
      echo "wahoo!";
    }

    # good
    if (my_boolean) {
      echo "wahoo!";
    }
    ```

  <a name="whitespace-around-keywords"></a><a name="10.2"></a>
  - [10.2](#whitespace-around-keywords) Place 1 space before the opening parenthesis in control statements (`if`, `while` etc.). Place no space between the argument list and the function name in function calls and declarations. 

    ```php
    # bad
    if(is_jedi) {
      fight ();
    }

    # good
    if (is_jedi) {
      fight();
    }

    # bad
    function fight () {
      echo "Swooosh!";
    }

    # good
    function fight() {
      echo "Swooosh!";
    }
    ```

  <a name="whitespace-infix-ops"></a><a name="10.3"></a>
  - [10.3](#whitespace-infix-ops) Set off operators with spaces.

    ```php
    # bad
    $x=$y+5;

    # bad
    for ($i=0;i<count($arr);$i++) {
      # ...
    }

    # good
    $x = $y + 5;

    # good
    for ($i = 0; i < count($arr); $i++) {
      # ...
    }
    ```

  <a name="whitespace-padded-blocks"></a><a name="10.4"></a>
  - [10.4](#whitespace-padded-blocks) Do not pad your blocks with blank lines. Too much spacing can be just as bad as not enough.

    ```php
    # bad
    function bar() {

      echo "foo";
    }

    # bad
    if ($baz) {

      echo "bar";
    } else {
      echo "foo";

    }

    # good
    function bar() {
      echo "foo";
    }

    # good
    if ($baz) {
      echo "bar";
    } else {
      echo "foo";
    }
    ```

  <a name="whitespace-comma-spacing"></a><a name="10.5"></a>
  - [10.5](#whitespace-comma-spacing) Avoid spaces before commas and require a space after commas.

    ```php
    # bad
    $arr = [1 , 2];

    # bad
    $arr = [1,2];

    # good
    $arr = [1, 2];
    ```

  <a name="whitespace-indenting"></a><a name="10.6"></a>
  - [10.6](#whitespace-indenting) Always indent one time for each nested block.

    ```php
    # bad
    if ($my_bool) {
    return true;
    }

    # good
    if ($my_bool) {
      return true;
    }
    ```

    ```php
    # bad
    if ($my_bool) {
      for ($i = 0; i < count($arr); $i++) {
        doSomething($arr[i]);
      }
        do_something_else();
        return true;
    }

    # good
    if ($my_bool) {
      for ($i = 0; i < count($arr); $i++) {
        doSomething($arr[i]);
      }
      do_something_else();
      return true;
    }
    ```

**[⬆ back to top](#table-of-contents)**

## Good PHP Design

  <a name="minimize-redundancy"></a><a name="11.1"></a>
  - [11.1](#minimize-redundancy) Minimize redundant code as much as possible. 

    **TIP**: If the same or extremly similar chunks of code (2+ lines) are repeated, you should probably factor it out. If code is slightly different, try representing the differences as parameters to functions!

    **NOTE**: It will be common practice to create a `common.php` file containing code needed in multiple files.

    ```php
    # bad
    foo();
    $x = 10;
    $y++;

    # somewhere later in the code...
    foo();
    $x = 15;
    $y++;
    ```

    ```php
    # good
    function helper($new_x) {
      foo();
      $x = $new_x;
      $y++;
    }

    helper(10);

    # somewhere later in the code...
    helper(15);
    ```

  <a name="no-log"></a><a name="10.2"></a>
  - [10.2](#no-log) Never turn in code with any debugging code left in.

  <a name="override-header"></a><a name="10.2"></a>
  - [10.2](#override-header) Never override a `content-type` header.

    ```php
    # bad
    header("Content-type: text/plain");

    if ($has_json) {
        header("Content-type: application/json");
        echo json_encode($json);
    } else {
      echo "There was no JSON";
    }
    ```

    ```php
    # good
    if ($has_json) {
        header("Content-type: application/json");
        echo json_encode($json);
    } else {
      header("Content-type: text/plain");
      echo "There was no JSON";
    }
    ```

  <a name="use-die"></a><a name="10.3"></a>
  - [10.3](#use-die) Use `die()` instead of `print` or `echo` when outputting errors.
    
    > Why? `die()` kills the program, which is important after an error has occured. There is no need to continue running a webservice if something has gone wrong, such as a missing GET parameter.


**[⬆ back to top](#table-of-contents)**

# };
