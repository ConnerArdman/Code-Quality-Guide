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

  <a name="lowercase--naming"></a><a name="2.2"></a>
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

  <a name="lowercase--elements"></a><a name="2.3"></a>
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

  <a name="blockquote"></a><a name="3.5"></a>
  - [3.5](#blockquote) Use `<blockquote>` and `<cite>` when quoting content to surround the `<p>`.
    ```HTML
    <!-- bad -->
    <p>bark! bark! bark!</p>
    <p>- Debug Dog</p>

    <!-- good -->
    <blockquote>
      <p>bark! bark! bark!</p>
    </blockquote>
    <cite>- Debug Dog</cite>
    ```

**[⬆ back to top](#table-of-contents)**

## Self Closing Tags

  <a name="self-closing"></a><a name="4.1"></a>
  - [4.1](#self-closing) You may choose to omit the ` /` at the end of self closing tags, but be consistent with all tags in your file, including those in the `head` as well as `br` and `hr` tags.

    ```HTML
    <!-- bad -->
    <img src="foo.jpg" alt="foo description" />
    <br>

    <!-- good -->
    <img src="foo.jpg" alt="foo description" />
    <br />

    <!-- also good -->
    <img src="foo.jpg" alt="foo description">
    <br>
    ```

**[⬆ back to top](#table-of-contents)**

## Comments

  <a name="comments-header"></a><a name="5.1"></a>
  - [5.1](#comments-header) Always include a file header comment as shown below

    ```HTML
    <!--
      Name: Mowgli Hovik
      Date: 01.01.2019
      Section: CSE 154 AX

      This is the index.html page for my portfolio of web development work. It includes links to
      side projects I have done during CSE 154, including an AboutMe page, a blog template, and 
      a crytogram generator.
    -->
    ```

  <a name="comments-sources"></a><a name="5.2"></a>
  - [5.2](#comments-sources) Always cite sources in your comments if you use anything found online.

    **NOTE**: It is preferred to cite sources in the HTML so that your users actually see it!

    **BIG NOTE**: You should not be citing any sources on homework assignments as everything should be
    your own work or based on in class code (no need to cite our examples unless told otherwise). Feel free
    to use outside artwork, quotes, etc. in your creative projects with proper citations. If you want to use some
    code found online, ask your TA or instructor first then cite it with permission.

    <a name="comments-inline"></a><a name="5.3"></a>
  - [5.3](#comments-inline) For the most part, there is no need to comment inline in HTML. Most inline comments just result in restating what the HTML tags say. However, you might want to comment sections of code that are there for JavaScript to interactive with (such as empty divs).
    
    ```HTML
    <!-- bad -->
    <!-- main section -->
    <main>
      ...

      <!- Game board to be populated by JavaScript -->
      <div></div>
    </main>

    <!-- footer -->
    <footer>
      ...
    </footer>
    ```

    ```HTML
    <!-- good -->
    <main>
      ...

      <!- Game board to be populated by JavaScript -->
      <div></div>
    </main>

    <footer>
      ...
    </footer>
    ```

**[⬆ back to top](#table-of-contents)**

## Whitespace & Indentation

  <a name="whitespace-spaces"></a><a name="6.1"></a>
  - [6.1](#whitespace-spaces) Use soft tabs (space character) set to 2, 3 or 4 spaces. You should use the same tab length across all of your files.

    **NOTE**: Please ask a TA for assistance if you are unsure of how to correct this. The settings are a bit hard to find in Atom, and this can mess up your indentation when turning in files on GitGrade.

  <a name="whitespace-blocks"></a><a name="6.2"></a>
  - [6.2](#whitespace-blocks) Go to a new line before each block element. Never place more than one block element on a single line.
    
    **NOTE**: Images are technically "inline-block" elements, but we will apply the same indentation rules to them. Place images on their own lines without block elements.

    ```HTML
    <!-- bad -->
    <main><p>Go Dawgs!</p></main>

    <!-- good -->
    <main>
      <p>Go Dawgs!</p>
    </main>
    ```

  <a name="whitespace-indent"></a><a name="6.3"></a>
  - [6.3](#whitespace-indent) Always indent one time for each nested block element.

    ```HTML
    <!-- bad -->
    <body>
    <main>
      <div class="foo">
      <p>bar</p>
      <div>
    </main>
    <footer>
      <p>baz</p>
    </footer>
    </body>

    <!-- good -->
    <body>
      <main>
        <div class="foo">
          <p>bar</p>
        <div>
      </main>
      <footer>
        <p>baz</p>
      </footer>
    </body>
    ```

  <a name="whitespace-equal"></a><a name="6.4"></a>
  - [6.4](#whitespace-equal) Never leave space around the equal sign for attributes.

    ```HTML
    <!-- bad -->
    <div class = "foo">

    <!-- good -->
    <div class="foo">
    ```

  <a name="extra-space"></a><a name="6.5"></a>
  - [6.5](#extra-space) Do not add extra spacing inside of elements.

    > Why? HTML generally ignores extra whitespace, so this won't cause too many bugs. However, there are some cases where extra spaces can cause unwanted alignment errors.

    ```HTML
    <!-- bad -->
    <h1> My Webpage </h1>

    <!-- good -->
    <h1>My Webpage</h1>
    ```

**[⬆ back to top](#table-of-contents)**

## Good HTML Design

  <a name="alt-attribute"></a><a name="7.1"></a>
  - [7.1](#alt-attribute) Always use `alt` attributes for images.

    > Why? Similar to semantic tags, alt attributes make our code more accessible to screen readers. Rather than just telling a user that there is an image, it can mention what is in the actual image. This is also useful when the image fails to load to give a better experience to users by displaying the text.
    
    ```HTML
    <!-- bad -->
    <img src="tree.jpg">

    <!-- good -->
    <img src="tree.jpg" alt="large oak tree">
    ```

    <a name="alt-attribute"></a><a name="7.2"></a>
  - [7.2](#alt-attribute) Do not mention "image of" or anything similar in alt attribute text.

    > Why? This is mostly a redundancy thing. By using an image tag, you have already informed screen readers and browsers that there is an image. Some screen readers my even read the below example as "image of image of fluffy dog"!
    
    ```HTML
    <!-- bad -->
    <img src="dog.jpg" alt="image of fluffy dog">

    <!-- good -->
    <img src="dog.jpg" alt="fluffy dog">
    ```

  <a name="redundant-tags"></a><a name="7.3"></a>
  - [7.3](#redundant-tags) Never have two tags grouping the same content unless there is a specific semantic reason for it or it is necessary for styling. 

    **NOTE**: These cases are rare, and there is usually a solution that does not require redundant tags. There is almost never a time when two grouping tags (such as `div` and `article`) should wrap the same content.
    
    ```HTML
    <!-- bad -->
    <main>
      <article>
        ...
      </article>
    </main>

    <!-- good -->
    <main>
      ...
    </main>    
    ```

  <a name="js-in-html"></a><a name="7.4"></a>
  - [7.4](#js-in-html) Do not use the `<script>` tag except to link to an external `.js` file. Do not use the `<style>` tag, and do not include any style related attributes in your HTML. Do all styling in CSS.

      > Why? It is important to keep content, style and behavior seperate. This keeps our code modular and easy to interpret. Since HTML represents content, there should be no style or behavior information in it.

  <a name="script-in-head"></a><a name="7.5"></a>
  - [7.5](#script-in-head) Always put `<script>` tags in the head, not the body.

      > Why? The body represents the actual content of the page, so it is semantically incorrect to put script tags there. That said, it can be common in industry to put scripts at the bottom of the body. The browser reads HTML from the top to the bottom, so if the script tag is last, then the browser will not parse the JavaScript file until the page has loaded. While this technique eliminates the need for 'window.addEventListener('load', init)`, we will consider it poor code quality in this course.

  <a name="br-br"></a><a name="7.6"></a>
  - [7.6](#br-br) Never use consecutive `<br>` tags. Additionally, do not use them to create extra margin between paragraphs.

      > Why? Just like most other tags, `<br>` has semantic meaning - it represents a line break. It does not make semantic sense to have consecutive line breaks, because that is just a larger line break. In the case of needing more space between elements, CSS should be changed rather than HTML.

      ```HTML
      <!-- bad -->
      <p>
        ...
      </p>
      <br>
      <p>
        ...
      </p>

      <!-- bad -->
      <p>
        Dogs are<br><br>AMAZING!
      </p>
      ```

**[⬆ back to top](#table-of-contents)**

# };