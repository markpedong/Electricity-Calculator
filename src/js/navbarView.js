// NAVIGATION FUNCTION
import { OFFSET_SCREEN } from "./config.js";

const nav = document.querySelector(".navbar");
const btnOpen = document.querySelector(".navbar-toggler");
const navLinks = document.querySelectorAll(".nav-link");
const accordion = document.querySelector(".accordion__3");

// Accordion 3 Change Border Bottom Color
let index = 0;

const colors = ["white", "rgba(0, 0, 0, 0.5)"];

accordion.addEventListener("click", function onClick() {
  accordion.style.borderBottom = `2px solid ${colors[index]}`;

  index = index >= colors.length - 1 ? 0 : index + 1;
});

///////////////////////////////////////////////////////

function navColorChange() {
  window.addEventListener("scroll", function () {
    if (window.pageYOffset > OFFSET_SCREEN) {
      nav.classList.add("bg-dark", "shadow");
    } else {
      nav.classList.remove("bg-dark", "shadow");
    }
  });
}

btnOpen.addEventListener("click", function () {
  navLinks.forEach((e) => {
    e.classList.remove("text-white");
    e.classList.add("text-black");
  });
});

export { navColorChange };
