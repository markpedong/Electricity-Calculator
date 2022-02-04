// NAVIGATION FUNCTION
import { OFFSET_SCREEN } from "./config.js";

const nav = document.querySelector(".navbar");
const btnOpen = document.querySelector(".navbar-toggler");
const navLinks = document.querySelectorAll(".nav-link");

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
