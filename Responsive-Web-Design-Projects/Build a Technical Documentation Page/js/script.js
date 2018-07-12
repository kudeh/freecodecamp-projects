document.addEventListener("DOMContentLoaded", function() {

  // Variable declarations
  var nav = document.getElementById("navbar");
  var navUL = nav.getElementsByTagName("ul")[0];
  // Syntax highlighting
  hljs.initHighlightingOnLoad();

  // Responsive menu toggle

  var toggle = document.getElementById("toggle");
  toggle.addEventListener("click", function(event) {
    event.preventDefault();

    nav.classList.toggle("is-open");

  });

  // Hide menu on click in body
  document.getElementById("main-doc").addEventListener("click", function(event) {
    if (nav.classList.contains("is-open")) {
      nav.classList.remove("is-open");
    }
  });

  document.getElementById("navbar").addEventListener("click", function(event) {
    if (nav.classList.contains("is-open")) {
      nav.classList.remove("is-open");
    }
  });

  document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
        e.preventDefault();

        document.querySelector(this.getAttribute('href')).scrollIntoView({
            behavior: 'smooth'
        });
    });
});

});
