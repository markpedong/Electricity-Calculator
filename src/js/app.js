"use strict";

////////////////////////////////////////////////////////////////////////////////////////////////////
// NAVIGATION FUNCTION
const nav = document.querySelector(".navbar");
const btnOpen = document.querySelector(".navbar-toggler");
const btnClose = document.querySelector(".btn-close");
const navLinks = document.querySelectorAll(".nav-link");

const navColorChange = function () {
  window.addEventListener("scroll", function () {
    if (window.pageYOffset > 500) {
      nav.classList.add("bg-dark", "shadow");
    } else {
      nav.classList.remove("bg-dark", "shadow");
    }
  });
};

navColorChange();

btnOpen.addEventListener("click", function () {
  navLinks.forEach((e) => {
    e.classList.remove("text-white");
    e.classList.add("text-black");
  });
});

////////////////////////////////////////////////////////////////////////////////////////////////////
// CALCULATOR FUNCTION
const form = document.querySelector(".form");
const devices = document.querySelector(".devices");
const inputDevice = document.querySelector(".form__input--device");
const inputUsage = document.querySelector(".form__input--usage");
const inputPower = document.querySelector(".form__input--power");

console.log(form);

form.addEventListener("submit", function (e) {
  e.preventDefault();

  const deviceValue = inputDevice.value;
  const usageValue = +inputUsage.value;
  const powerValue = +inputPower.value;

  let html = `
    <li
      class="device__info text-dark mb-2 shadow-sm bg-body device__display"
      style="
        background-color: rgba(212, 212, 212, 0.747);
        border-radius: 1rem;
        font-family: 'Manrope', sans-serif;
        border-left: 10px solid aqua;
      "
    >
      <div
        class="container d-grid px-0 p-3 text-center fw-bolder align-items-center"
        style="grid-template-columns: repeat(3, 1fr)"
      >
        <p class="mb-0">${deviceValue}</p>
        <div class="col device__details">
          <span class="device__icon">⚡</span>
          <span class="device__value">${usageValue}</span>
          <span class="device__unit">W</span>
        </div>
        <div class="col device__details">
          <span class="device__icon">⏳</span>
          <span class="device__value">${powerValue}</span>
          <span class="device__unit">hr</span>
        </div>
      </div>
    </li> 
  `;
});
