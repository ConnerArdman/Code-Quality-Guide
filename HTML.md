# CSE 154 Code Quality Guide(HTML) {

* HTML code quality guidelines for [CSE 154](https://cs.washington.edu/154) at the University of Washington.

> Questions about the guide? We are always looking to improve our resources, feel free to reach out to [Conner](mailto:ardmanc@uw.edu) with any questions or concerns!

**NOTE** All HTML Code should be [validated](https://validator.w3.org/#validate_by_input).

## Table of Contents

  1. [Classes & IDs](#classes--ids)
  1. [Naming Conventions](#naming-conventions)
  1. [Semantic Tags](#semantic-tags)
  1. [Self Closing Tags](#self-closing-tags)
  1. [Comments](#comments)
  1. [Whitespace & Indentation](#whitespace--indentation)
  1. [Long Lines](#long-lines)
  1. [Good HTML Design](#good-html-design)

## Classes & IDs

  <a name="unused-classes"></a><a name="1.1"></a>
  - [1.1](#unused-classes) Only add classes and IDs to your HTML when they are needed by CSS and/or JavaScript for selecting elements.

  <a name="prefer-context"></a><a name="1.2"></a>
  - [1.2](#prefer-context) Prefer context selectors over adding classes when styling elements all in the same context. For example, to change fonts of all the paragraphs in `<main>`, use a context selector rather than applying the same class to all of the paragraphs.

    **TIP**: If you can easily describe what elements you are selecting in reference to where they will appear on the page, then you can likely use a context selector. Classes will be more useful when you don't need all of the elements in a certain context (maybe you only want to change the color of 3 specific paragraphs).

    ```HTML
    <!-- bad -->
    <ul>
      <li class="course">CSE 154</li>
      <li class="course">CSE 160</li>
      <li class="course">CSE 142</li>
      <li class="course">CSE 143</li>
    </ul>
    ```

  <a name="single-class"></a><a name="1.3"></a>
  - [1.3](#single-class) Classes should always appear at least twice in your HTML. Otherwise, you should use an ID.

    ```HTML
    <!-- bad -->
    <div class="boundless-container">
      <img src="pupper.jpg" alt="Dubs">
    </div>

    <!-- good -->
    <div id="boundless-container">
      <img src="pupper.jpg" alt="Dubs">
    </div>
    ```

  <a name="unique-id"></a><a name="1.4"></a>
  - [1.4](#unique-id) Each ID should be unique, only appearing once in the HTML.

    ```HTML
    <!-- bad -->
    <h2>Dubs</h2>
    <p id="bio">The adorable live mascot of UW</p>
    <h2>Harry The Husky</h2>
    <p id="bio">The body-suit mascot of UW</p>

    <!-- good -->
    <h2>Dubs</h2>
    <p class="bio">The adorable live mascot of UW</p>
    <h2>Harry The Husky</h2>
    <p class="bio">The body-suit mascot of UW</p>
    ```

**[⬆ back to top](#table-of-contents)**

## Naming Conventions

  <a name="naming--descriptive"></a><a name="2.1"></a>
  - [2.1](#naming--descriptive) Avoid single letter names for classes and IDs. Try to be as descriptive as possible.

    ```HTML
    <!-- bad -->
    <div class="c">...</div>

    <!-- good -->
    <div class="image-container">...</div>
    ```

  <a name="lowercase--naming"></a><a name="2.2></a>
  - [2.2](#lowercase--naming) Use all lowercase names for classes and IDs. You can choose to seperate words either by dashes or with no seperation mark. Either is fine, but make sure to be consistent.

    ```HTML
    <!-- bad -->
    <h1 id="first_heading">My Awesome Website</h1>
    <p class="importantReminder">do your homework</p>

    <!-- good -->
    <h1 id="first-heading">My Awesome Website</h1>
    <p class="important-reminder">do your homework</p>

    <!-- also good -->
    <h1 id="firstheading">My Awesome Website</h1>
    <p class="importantreminder">do your homework</p>
    ```

  <a name="lowercase--elements"></a><a name="2.3></a>
  - [2.3](#lowercase--elements) Use all lowercase for HTML elements and their attributes.

    ```HTML
    <!-- bad -->
    <H1>Code Quality Guide</H1>

    <!-- good -->
    <h1>Code Quality Guide</H1>
    ```

    ```HTML
    <!-- bad -->
    <img SRC="cat.jpg" ALT="furry friend">
    <img Src="cat.jpg" Alt="furry friend">

    <!-- good -->
    <img src="cat.jpg" alt="furry friend">
    ```

**[⬆ back to top](#table-of-contents)**


## Semantic Tags

  <a name="prefer--semantic"></a><a name="3.1"></a>
  - [3.1](#prefer--semantic) Always prefer semantic tags over generic ones (such as `<div>` and `<span>`). Never use classes that share a name with a tag, use that tag instead.
    
    > Why? Semantic tags make our code more accessible, particularly to screen readers. `<div>` and `<span>` are ignored for anything other than grouping, but tags such as `<main>`, `<article>` and `<section>` carry semantic meaning and help the screen reader interpret the page for a user.

    **TIP**: Semantic tags can be confusing to decide between. It can be helpful to wireframe your site and try to verbally describe each portion of your page. Here is a [great resource on the usage of these tags](https://www.semrush.com/blog/semantic-html5-guide/) as well as a [list of semantic tags](https://www.w3schools.com/html/html5_semantic_elements.asp).

    ```HTML
    <!-- bad -->
    <div>
      <div class="main-header">
        <h1>CSE 154 Is The Best!</h1>  
      </div>
      <div class="section">
        ....
      </div>
    </div>

    <!-- good -->
    <article>
      <header>
        <h1>CSE 154 Is The Best!</h1>  
      </header>
      <section>
        ....
      </section>
    </article>
    ```

  <a name="order--heading"></a><a name="3.2"></a>
  - [3.2](#order--heading) Heading tags denote heading levels, not font sizes. Never "skip" a level as this does not make semantic sense. For example, do not use `<h2>` unless your page has an `<h1>`. Do not use `<h3>` unless your page has an `<h2>`.
    

    ```HTML
    <!-- bad -->
    <h1>Main Heading</h1>
    <h3>Smaller Heading</h3>

    <!-- good -->
    <h1>Main Heading</h1>
    <h2>Smaller Heading</h2>
    ```

  <a name="presentation--tags"></a><a name="3.3"></a>
  - [3.3](#presentation--tags) Do not use presentation tags, as they describe style rather than content. Most of these have been deprecated, and all of them can be replaced with CSS styles. For example, avoid `<i>`, `<b>`, `<u>`, `<font>`, `<big>`, `<small>` and `<center>`. `<strong>` and `<em>` are acceptable to use, because they carry semantic meaning.

    ```HTML
    <!-- bad -->
    <b>Bold text!</b>

    <!-- good -->
    <strong>Strong text!</strong>
    ```

  <a name="tables--layout"></a><a name="3.4"></a>
  - [3.4](#tables--layout) Do not use `table` for layout purposes. Tables are okay to use if they are semantically appropriate, but CSS should be used to achieve layout.


**[⬆ back to top](#table-of-contents)**

# };
