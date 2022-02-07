// NAVIGATION FUNCTION

const btnOpen = document.querySelector(".navbar-toggler");
const navLinks = document.querySelectorAll(".nav-link");
const accordion = document.querySelector(".accordion__3");
const navCalculator = document.querySelector(".nav__calculator");
const secCalculator = document.querySelector(".calculator");
const navFAQ = document.querySelector(".nav__faq");
const secFAQ = document.querySelector(".sec__faq");
const navContact = document.querySelector(".nav__contact");
const secContact = document.querySelector(".sec__contact");

// Accordion 3 Change Border Bottom Color
let index = 0;

const colors = ["white", "rgba(0, 0, 0, 0.5)"];

accordion.addEventListener("click", function onClick() {
  accordion.style.borderBottom = `2px solid ${colors[index]}`;

  index = index >= colors.length - 1 ? 0 : index + 1;
});

btnOpen.addEventListener("click", function () {
  navLinks.forEach((e) => {
    e.classList.remove("text-white");
    e.classList.add("text-black");
  });
});

navCalculator.addEventListener("click", function () {
  secCalculator.scrollIntoView({ behavior: "smooth" });
});

navFAQ.addEventListener("click", function () {
  secFAQ.scrollIntoView({ behavior: "smooth" });
});

navContact.addEventListener("click", function () {
  secContact.scrollIntoView({ behavior: "smooth" });
});
