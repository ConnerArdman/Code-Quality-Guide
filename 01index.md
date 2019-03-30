---
layout: page
title: General Guidelines
permalink: /
---

# CSE 154 Code Quality Guide() {

*A relatively rational approach to web development for [CSE 154](https://cs.washington.edu/154) at the University of Washington. Portions of this guide were adapted from [Airbnb's JavaScript Style Guide](https://github.com/airbnb/javascript).*

> Questions about the guide? We are always looking to improve our resources, feel free to reach out to [Conner](mailto:ardmanc@uw.edu) with any questions or concerns!

## General Guidelines

  1. [Comments](#comments)
  1. [Whitespace & Indentation](#whitespace--indentation)
  1. [Long Lines](#long-lines)

## Comments

  <a name="comments-header"></a><a name="1.1"></a>
  - [1.1](#comments-header) Always include a file header comment at the top of each file with your name, the date, your section and a brief description of what the file does. See HTML example below:

    **NOTE**: In HTML, this comment must go after the `<DOCTYPE html>`. In PHP it must go after the `<?php`.

    **NOTE**: In PHP, make sure to mention all of the GET/POST parameters that your webservice takes in as well as its output! See example in the [PHP guide](php/#comments-header)

    ```html
    <!DOCTYPE html>
    <!--
      Name: Mowgli Hovik
      Date: 01.01.2019
      Section: CSE 154 AX

      This is the index.html page for my portfolio of web development work. It includes links to
      side projects I have done during CSE 154, including an AboutMe page, a blog template, and
      a crytogram generator.
    -->
    ```

  <a name="comments-sources"></a><a name="1.2"></a>
  - [1.2](#comments-sources) Always cite sources in your comments if you use anything found online.

    **NOTE**: It is preferred to cite sources in the text content of the HTML so that your users actually see it!

    **BIG NOTE**: You should not be citing any sources on homework assignments as everything should be
    your own work. Feel free to use outside artwork, quotes, etc. in your creative projects with proper citations.
    If you want to use code found online, ask your TA or instructor first then cite it with permission. Additionally, if you copy
    any lecture code for your creative projects, please cite that as well.

**[⬆ back to top](#general-guidelines)**

## Whitespace & Indentation

  <a name="whitespace-spaces"></a><a name="2.1"></a>
  - [2.1](#whitespace-spaces) Use soft tabs (space character) set to 2, 3 or 4 spaces. You should use the same tab length across all of your files.

    **NOTE**: Please ask a TA for assistance if you are unsure of how to correct this. The settings are a bit hard to find in Atom, and this can mess up your indentation when turning in files on GitGrade.

  <a name="whitespace-newline-at-end"></a><a name="2.2"></a>
  - [2.2](#whitespace-newline-at-end) Never have consecutive newline characters in your code, even at the end of a file.

    ```javascript
    // bad
    function myFunc(foo) {
      if (foo === 'baz') {
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
    function myFunc(foo) {
      if (foo === 'baz') {
        return true;
      }

      // ...
    }

    function myOtherFunc() {
      // ..
    }
    ```

    ```html
    <!-- bad -->
    <p>super cool paragraph</p>


    <p>other cool paragraph</p>
    ```

    ```html
    <!-- good -->
    <p>super cool paragraph</p>

    <p>other cool paragraph</p>
    ```

**[⬆ back to top](#general-guidelines)**

## Long Lines

  <a name="short-lines"></a><a name="3.1"></a>
  - [3.1](#short-lines) Always keep lines under 100 characters. It makes your code much easier to read. The one exception here is links. Any string containing a link can go over 100 characters.

    **TIP**: Most IDE's let you set a line on the screen at a certain character limit. Set it to 80 characters and avoid going over that to be extra careful.

**[⬆ back to top](#general-guidelines)**

## Contributors
  - [Conner Ardman](mailto:ardmanc@uw.edu)
  - [CSE 154 Spring 2019 Staff](https://courses.cs.washington.edu/courses/cse154/19sp/)
  - [Original Airbnb Contributors](https://github.com/airbnb/javascript/graphs/contributors)

**[⬆ back to top](#general-guidelines)**

# };
