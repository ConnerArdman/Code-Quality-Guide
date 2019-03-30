(function() {
  "use strict";
  window.addEventListener("load", initializePage);

  // Calls various functions that will fetch course information
  function initializePage() {
    $("mobile-dropdown-icon").addEventListener("click", toggleNavMenu);
    $("mobile-x-icon").addEventListener("click", toggleNavMenu);
  }

  function toggleNavMenu() {
    let navbar = qs("header");
    if (navbar.className === "navbar") {
      navbar.className += " responsive-nav";
    } else {
      navbar.className = "navbar";
    }
  }

/*****************************  HELPER FUNCTIONS  *****************************/

/**
  * Helper function to create shorthand for document.getElementById.
  * @param {string} the ID of the element that will be retrieved
  * @return {DOM object} the DOM object with the corresponding ID
  */
  function $(id) {
    return document.getElementById(id);
  }

/**
  * Helper function to create shorthand for document.querySelector.
  * @param {string} the CSS selector that will be queried
  * @return {DOM object} the DOM object corresponding to the first instance
  * of the given selector
  */
  function qs(selector) {
    return document.querySelector(selector);
  }

})();
