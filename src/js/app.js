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

//

// Device Class

class Device {
  id = (Date.now() + "").slice(-10);
  constructor(device, power, usage) {
    this.device = device;
    this.power = power;
    this.usage = usage;
  }
}

// Child Class of Device

class Calculator extends Device {
  constructor(device, power, usage) {
    super(device, power, usage);
  }
}

///////////////////////////////////////
// APPLICATION ARCHITECTURE
const form = document.querySelector(".form");
const devices = document.querySelector(".devices");
const inputDevice = document.querySelector(".form__input--device");
const inputUsage = document.querySelector(".form__input--usage");
const inputPower = document.querySelector(".form__input--power");

class App {
  #appliances = [];

  constructor() {
    form.addEventListener("submit", this._newDevices.bind(this));
  }

  _newDevices(e) {
    const validInputs = (...inputs) =>
      inputs.every((inp) => Number.isFinite(inp));

    const allPositive = (...inputs) => inputs.every((inp) => inp > 0);

    e.preventDefault();

    // Get the data from form
    const device = inputDevice.value;
    const usage = +inputUsage.value;
    const power = +inputPower.value;

    //create device object

    // Check if data is valid
    if (!validInputs(usage, power) || !allPositive(usage, power))
      return alert("Inputs have to be a Positive Number");

    const appliance = new Device(device, usage, power);
    this.#appliances.push(appliance);

    // Add new Object to device array

    // Render device on list

    // Clear input Fields
    inputDevice.value = inputUsage.value = inputPower.value = "";
  }
}

const app = new App();

// form.insertAdjacentHTML("afterend", html);

//https://www.udemy.com/course/the-complete-javascript-course/learn/lecture/22649243#content
//Time Stamp: 18:00
