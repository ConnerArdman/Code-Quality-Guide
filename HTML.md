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
# };
