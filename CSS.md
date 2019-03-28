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

## Redundancy

  <a name="redundant-rules"></a><a name="2.1"></a>
  - [2.1](#redundant-rules) Avoid writing redundant rules if they appear for the same reason. For example, if you want to make all headings red, use a single rule. However, if two unrelated elements are set to have `5px` margin, there is no need to factor that out. The general rule here is only group them together if changing one would always mean wanting to change both.

    > Why? The goal here is to create readable and scalable CSS. In the example given, if we had a seperate rule for each heading it would be confusing to read. This way, it is very clear that all headings have this same color. Additionally, if we ever decide to change the color in the future, we only need to change it in one place. However, in the case of unrelated styles, it could actually make our code harder to update in the future!

    ```css
    /* bad */
    h1 {
      color: red;
    }

    h2 {
      color: red;
    }

    h3 {
      color: red;
    }

    #dog-image, nav {
      margin-bottom: 5px;
    }
    ```

    ```css
    /* good */
    h1, h2, h3 {
      color: red;
    }

    #dog-image {
      margin-bottom: 5px;
    }

    nav {
      margin-bottom: 5px;
    }

    ```

**[⬆ back to top](#table-of-contents)**

## Vendor-Prefix CSS

 <a name="no-vendor"></a><a name="3.1"></a>
  - [3.1](#no-vendor) Never use vendor-prefix CSS rules for homework assignments in this class unless explicitly told otherwise. You may however use them in your creative project if necessary.

    > What's this? Some major browsers have created nonstandard CSS properties that can be used with browser-specific prefixes. These are generally experimental and we will avoid them in this course (although they can be very powerful and could be worth learning about after 154). More on these [here](https://developer.mozilla.org/en-US/docs/Glossary/Vendor_Prefix).

    ```css
    /* bad */
    div {
      -webkit-border-radius: 10px;
    }

    /* good */
    div {
      border-radius: 10px;
    }
    ```

**[⬆ back to top](#table-of-contents)**

## Comments

  <a name="no-comment"></a><a name="4.1"></a>
  - [4.1](#no-comment) Similar to HTML, there isn't really any need to make inline comments in CSS, and they can actually make your code less readable. However, you could make some simple comments related to your [ordering](#ordering) or if you have some complex CSS animations (we won't get to these in lecture, but there might be an exploration session on them).

**[⬆ back to top](#table-of-contents)**

## Whitespace & Indentation

  <a name="whitespace-before-curly"></a><a name="5.1"></a>
  - [5.1](#whitespace-before-curly) Place 1 space before the leading brace to begin a rule set.
    
    ```css
    /* bad */
    div{
      margin: auto;
    }

    /* good */
    div {
      margin: auto;
    }
    ```  

  <a name="newline"></a><a name="5.2"></a>
  - [5.2](#newline) Place each rule on its own line. Do not place any rules on the same line as a curly brace.
    
    ```css
    /* bad */
    div { border: 5px solid black;
      background-color: PapayaWhip; margin: auto;
    }

    /* good */
    div {
      border: 5px solid black;
      background-color: PapayaWhip;
      margin: auto;
    }
    ```  
  
  <a name="colon-space"></a><a name="5.3"></a>
  - [5.3](#colon-space) Place one space after each colon and none before them.
    
    ```css
    /* bad */
    h1 {
      color : Gainsboro;
      text-align :center;
      text-decoration:underline;
    }

    /* good */
    h1 {
      color: Gainsboro;
      text-align: center;
      text-decoration: underline;
    }
    ```

  <a name="blank-lines"></a><a name="5.4"></a>
  - [5.4](#blank-lines) Place exactly one blank line between rule sets. Place no blank lines between rules.
    
    ```css
    /* bad */
    h1 {
      color: LavenderBlush;
      text-decoration: underline;

      text-align: center;
    }
    h2 {
      color: Chartreuse;
    }
    ```

    ```css
    /* good */
    h1 {
      color: LavenderBlush;
      text-decoration: underline;
      text-align: center;
    }

    h2 {
      color: Chartreuse;
    }
    ``` 

  <a name="indent"></a><a name="5.5"></a>
  - [5.5](#indent) Indent exactly one time for rules. Do not indent anywhere else in CSS.
    
    ```css
    /* bad */ 
    div {
     font-size: 18pt;
      color: #222222;
    }

      img {
    width: 50%;
      }

    p {
    font-family: Helvetica, Arial, sans-serif;
    font-size: 14pt;
    }
    ```

    ```css
    /* good */ 
    div {
      font-size: 18pt;
      color: #222222;
    }

    img {
      width: 50%;
    }

    p {
      font-family: Helvetica, Arial, sans-serif;
      font-size: 14pt;
    }    
    ```

**[⬆ back to top](#table-of-contents)**

# };
