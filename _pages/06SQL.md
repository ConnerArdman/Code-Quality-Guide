# CSE 154 Code Quality Guide(SQL) {

*SELECT code quality FROM guide WHERE class = [CSE 154](https://cs.washington.edu/154) AND university = `University of Washington`*

## Table of Contents

  1. [Letter Casing](#naming-conventions)
  1. [Comments](#comments)
  1. [Whitespace & Indentation](#whitespace--indentation)

## Other Guides
  1. [General Guidelines](README.md)
  1. [HTML](HTML.md)
  1. [CSS](CSS.md)
  1. [JavaScript](javascript.md)
  1. [PHP](PHP.md)

## Letter Casing

  <a name="uppercase-naming"></a><a name="1.1"></a>
  - [1.1](#uppercase-naming) SQL kewords such as `SELECT`, `FROM` and `AUTO INCREMENT` should be capitalized.

    > Why? Aside from being a standard, using all capital letters makes it easier to quickly read your code. 

    ```sql
    -- bad
    select dog from animal;
    SELECT dog from animal;
    Select dog From animal;

    -- good
    SELECT dog FROM animal;
    ```

  <a name="lowercase-db"></a><a name="1.2"></a>
  - [1.2](#lowercase-db) Database names should be all lowercase without any numbers or special characters (such as "-" or "_").

  <a name="lowercase-table"></a><a name="1.3"></a>
  - [1.3](#lowercase-table) Table names can either use the same conventions as databases (all lowercase) or you may use PascalCasing (camelCase with the first letter capitalized). Choose one convention and be consistent.

  <a name="lowercase-column"></a><a name="1.4"></a>
  - [1.4](#lowercase-column) Column names should use lowercase_naming conventions.

## Comments

  <a name="no-comment"></a><a name="2.1"></a>
  - [2.1](#no-comment) SQL files should contain a header comment just like any other. Other than that, there is no need to comment, but you may comment any complex logic (although we don't expect it to be necessary in this class).

## Whitespace & Indentation

  <a name="new-line"></a><a name="3.1"></a>
  - [3.1](#new-line) To avoid long lines (over 100 characters), it is common to go to new lines in `SELECT` queries. Start each line with a SQL command such as `SELECT`, `FROM`, `WHERE`, or `AND`.

    ```sql
    -- bad
    SELECT
    name, description FROM
    courses WHERE
    dept = 'CSE';

    -- good
    SELECT name, descripion
    FROM courses
    WHERE dept = 'CSE';
    ```

  <a name="consistent-indentation"></a><a name="3.2"></a>
  - [3.2](#consistent-indentation) Keep indendation consistent. There are no clear cut rules on indenation, but keep it consistent and readable.
  
    ```sql
    -- bad
    SELECT DISTINCT c.name
      FROM courses c, students s1, students s2, grades g1, grades g2 
        WHERE g1.course_id = c.id 
        AND g1.student_id = s1.id 
          AND g2.course_id = c.id 
          AND g2.student_id = s2.id 
        AND s1.name = 'Bart' 
        AND s2.name = 'Lisa';

    -- good
    SELECT DISTINCT c.name
    FROM courses c, students s1, students s2, grades g1, grades g2 
    WHERE g1.course_id = c.id AND g1.student_id = s1.id 
      AND g2.course_id = c.id AND g2.student_id = s2.id 
      AND s1.name = 'Bart' AND s2.name = 'Lisa';

    -- good
    SELECT DISTINCT c.name
    FROM courses c, students s1, students s2, grades g1, grades g2 
    WHERE g1.course_id = c.id
    AND g1.student_id = s1.id 
    AND g2.course_id = c.id
    AND g2.student_id = s2.id 
    AND s1.name = 'Bart'
    AND s2.name = 'Lisa';

    -- good
    SELECT DISTINCT c.name
    FROM courses c, students s1, students s2, grades g1, grades g2 
    WHERE g1.course_id = c.id
      AND g1.student_id = s1.id 
      AND g2.course_id = c.id
      AND g2.student_id = s2.id 
      AND s1.name = 'Bart'
      AND s2.name = 'Lisa';
    ```

    ```sql
    -- bad
    CREATE TABLE dogbreeds(breed_id INT, breed_name VARCHAR(20), PRIMARY KEY (breed_id));
    CREATE TABLE doggies
    (
    dog_id INT AUTO INCREMENT,
    dog_name VARCHAR(20),
    dog_age INT,
    breed_id INT,
    PRIMARY KEY (breed_id)
    FOREIGN KEY (breed_id) REFERENCES dobreeds(breed_id));

    -- good
    CREATE TABLE dogbreeds (
      breed_id INT AUTO INCREMENT, 
      breed_name VARCHAR(20), 
      PRIMARY KEY (breed_id)
    );
     
    CREATE TABLE doggies (
      dog_id INT AUTO INCREMENT,
      dog_name VARCHAR(20),
      dog_age INT,
      breed_id INT,
      PRIMARY KEY (dog_id)
      FOREIGN KEY (breed_id) REFERENCES dogbreeds(breed_id)
    );
    ```

**[⬆ back to top](#table-of-contents)**

# };
