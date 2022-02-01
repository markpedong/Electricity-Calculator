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
  date = new Date();
  id = (Date.now() + "").slice(-10);
  constructor(device, power, usage) {
    this.device = device;
    this.power = power;
    this.usage = usage;
  }

  _setDescription() {
    const months = [
      "January",
      "February",
      "March",
      "April",
      "May",
      "June",
      "July",
      "August",
      "September",
      "October",
      "November",
      "December",
    ];

    this.description = `Input on ${
      months[this.date.getMonth()]
    } ${this.date.getDate()} at ${this.date.toLocaleTimeString([], {
      hour: "2-digit",
      minute: "2-digit",
    })}📅`;
  }
}

// Child Class of Device

class Calculator extends Device {
  constructor(device, power, usage) {
    super(device, power, usage);
    this._setDescription();
  }
}

///////////////////////////////////////
// APPLICATION ARCHITECTURE
const form = document.querySelector(".form");
const devices = document.querySelector(".devices");
const inputDevice = document.querySelector(".form__input--device");
const inputUsage = document.querySelector(".form__input--usage");
const inputPower = document.querySelector(".form__input--power");
const energyPrice = document.querySelector(".power__control");
const energyForm = document.querySelector(".energy__price");

console.log(energyPrice, energyForm);

energyForm.addEventListener("submit", function () {
  e.preventDefault();
  console.log(+energyPrice.value);
});

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
    let appliance;

    //create appliance object
    appliance = new Calculator(device, usage, power);

    // Check if data is valid
    if (!validInputs(usage, power) || !allPositive(usage, power))
      return alert("Inputs have to be a Positive Number");

    // Add new Object to device array
    this.#appliances.push(appliance);
    console.log(appliance);

    // Render device on list
    this._renderDevice(appliance);

    // Clear input Fields
    inputDevice.value = inputUsage.value = inputPower.value = "";
  }

  _renderDevice(appliance) {
    const html = `
    <li
    class="device__info text-dark mb-2 shadow-sm bg-body"
    data-id="${appliance.id}"
    style="
      background-color: rgba(212, 212, 212, 0.747);
      border-radius: 1rem;
      font-family: 'Manrope', sans-serif;
      border-left: 10px solid aqua;
    "
    >
      <div
        class="container px-0 p-3 text-center fw-bolder align-items-center"
      >
        <div class="row">
          <div class="col text-start ps-3 text-sm-center pb-2">
            ${appliance.description}
          </div>
          <div class="row device__details__container">
            <div class="col text-start ps-3 text-sm-center">
              ${appliance.device}
            </div>
            <div class="col device__details p-0">
              <span class="device__icon">⚡</span>
              <span class="device__value">${appliance.power}</span>
              <span class="device__unit">W</span>
            </div>
            <div class="col device__details p-0">
              <span class="device__icon">⏳</span>
              <span class="device__value">${appliance.usage}</span>
              <span class="device__unit">hr</span>
            </div>
          </div>
        </div>
      </div>
    </li>
    `;

    form.insertAdjacentHTML("afterend", html);
  }
}

const app = new App();
