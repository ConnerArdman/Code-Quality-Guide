# CSE 154 Code Quality Guide(CSS) {

*A possibly pragmatic CSS code quality guide for [CSE 154](https://cs.washington.edu/154) at the University of Washington.*

**NOTE**: All CSS Code should be [validated](https://jigsaw.w3.org/css-validator/#validate_by_input).

## Table of Contents

  1. [Ordering](#ordering)
  1. [Redundancy](#redundancy)
  1. [Vendor-Prefix CSS](#vendor-prefix-css)
  1. [Comments](#comments)
  1. [Whitespace & Indentation](#whitespace--indentation)

## Other Guides
  1. [General Guidelines](README.md)
  1. [HTML](HTML.md)
  1. [JavaScript](javascript.md)

## Ordering

  <a name="selector-ordering"></a><a name="1.1"></a>
  - [1.1](#selector-ordering) Always order CSS in a logical way that makes it easy to read. The recommended strategy would be to put "generic" selectors at the top, such as the `body`, followed by context selectors, classes then IDs.

    > Why? It is important to make our CSS files easy to read and update in the future. Creating a simple convention such as this makes the file a bit easier to process. Another common convention would be to organize CSS in order of when items appear on the HTML page. However, this convention is not as scalable, since it begins to associate a particular stylesheet with a single HTML page rather than a larger website.

    ```css
    /* bad */
    .dog-images {
      /* ... */
    }

    body {
      /* ... */
    }

    #jumping-dog {
      /* ... */
    }

    header h1 {
      /* ... */
    }

    h1 {
      /* ... */
    }
    ```

    ```CSS
    /* good */
    body {
      /* ... */
    }

    h1 {
      /* ... */
    }

    header h1 {
      /* ... */
    }

    .dog-images {
      /* ... */
    }

    #jumping-dog {
      /* ... */
    }
    ```

  <a name="font-first"></a><a name="1.1"></a>
  - [1.2](#font-first) Always place `@import` statements before any rule sets.

    > Why? Keeping `@import` statements together at the top of the file is similar to putting constants at the top of a JavaScript file. It makes your CSS easy to read, from top to bottom (you don't want to get to a `font-family` line before having read about the required import).

**[⬆ back to top](#table-of-contents)**

# };
