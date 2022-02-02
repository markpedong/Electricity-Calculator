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

class Total {
  constructor(totalPower, totalUsage, energyPrice) {
    this.totalPower = totalPower;
    this.totalUsage = totalUsage;
    this.energyPrice = energyPrice;
  }
}
class Device {
  date = new Date();
  id = (Date.now() + "").slice(-10);
  constructor(device, usage, power) {
    this.device = device;
    this.usage = usage;
    this.power = power;
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
const energyCalculator = document.querySelector(".energy__calculator");
class App {
  #appliances = [];
  #totalDetails = [];

  constructor() {
    form.addEventListener("submit", this._newDevices.bind(this));
    energyForm.addEventListener("submit", this._totalAll.bind(this));
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

    // Add new Object to appliance array
    this.#appliances.push(appliance);

    // Render device on list
    this._renderDevice(appliance);

    // Clear input Fields
    inputDevice.value = inputPower.value = inputUsage.value = "";
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
              <span class="device__icon">⏳</span>
              <span class="device__value">${appliance.usage}</span>
              <span class="device__unit">hr</span>
            </div>
            <div class="col device__details p-0">
              <span class="device__icon">⚡</span>
              <span class="device__value">${appliance.power}</span>
              <span class="device__unit">W</span>
            </div>
           
          </div>
        </div>
      </div>
    </li>
    `;

    form.insertAdjacentHTML("afterend", html);
  }

  _totalAll(appliance) {
    const validInputs = (...inputs) =>
      inputs.every((inp) => Number.isFinite(inp));

    const allPositive = (...inputs) => inputs.every((inp) => inp > 0);

    appliance.preventDefault();

    // Getting data from form
    const energy = +energyPrice.value;
    let total;

    // Checking if the data is valid
    if (!validInputs(energy) || !allPositive(energy))
      return alert("Inputs have to be a Positive Number");

    // Loop over the array and get the total value from the appliances array
    console.log(this.#appliances);
    const totalPower = this.#appliances.reduce(function (prevEl, curEl) {
      return prevEl + curEl.power;
    }, 0);

    const totalUsage = this.#appliances.reduce(function (prevEl, curEl) {
      return prevEl + curEl.usage;
    }, 0);

    total = new Total(totalPower, totalUsage, energy);

    // Create Total Object
    console.log(total);

    // Render device on list
    this._renderTotal(total);

    // Clear input Fields
    energyPrice.value = "";
  }

  _renderTotal(total) {
    const html = `
      <div
      class="container d-grid justify-content-center p-0 gap-3"
      style="
        grid-template-columns: repeat(2 1fr);
        font-family: 'Manrope', sans-serif;
      "
        >
        <!-- Inner Container For Calculator -->
        <div
          class="container d-grid p-0"
          style="grid-template-columns: repeat(2, 1fr)"
        >
          <!-- Daily Usage Time -->
          <div class="text-start">Usage Time:</div>
          <div
            class="total__container d-grid"
            style="grid-template-columns: 1fr 1fr 2fr"
          >
            <div class="text-center text-sm-end total__icon">🕰️</div>
            <div class="text-start text-sm-center total__value">${total.totalUsage}</div>
            <div class="text-center power__unit">hrs / day</div>
          </div>
        </div>
        <!-- Daily Power Consumption -->
        <div
          class="container d-grid p-0"
          style="grid-template-columns: repeat(2, 1fr)"
        >
          <div class="text-start">Power Consumption:</div>
          <div
            class="total__container d-grid"
            style="grid-template-columns: 1fr 1fr 2fr"
          >
            <div class="text-center text-sm-end total__icon">⚡</div>
            <div class="text-start text-sm-center total__value">${total.totalPower}</div>
            <div class="text-center power__unit">W / day</div>
          </div>
        </div>

        <!-- Total cost per DAY -->
        <div
          class="container d-grid p-0"
          style="grid-template-columns: repeat(2, 1fr)"
        >
          <div class="text-start">Total Cost:</div>
          <div
            class="total__container d-grid"
            style="grid-template-columns: 1fr 1fr 2fr"
          >
            <div class="text-center text-sm-end total__icon">💵</div>
            <div class="text-start text-sm-center total__value">
              ₱
            </div>
            <div class="text-center power__unit">/ day</div>
          </div>
        </div>
      </div>
      <!-- Total Cost for Monthly -->
      <div
        class="container p-0 pt-5 mb-4 fs-5 d-grid fw-bold"
        style="
          grid-template-columns: 1fr;
          font-family: 'Manrope', sans-serif;
          justify-items: center;
        "
      >
        <div class="text-center">Total Cost: Monthly</div>
        <div
          class="d-grid text-center"
          style="grid-template-columns: repeat(3, 1fr)"
        >
          <div class="text-center total__icon">₱</div>
          <div class="text-start total__value"></div>
          <div class="power__unit">/ month</div>
        </div>
      </div>
    `;
    energyCalculator.insertAdjacentHTML("afterend", html);
    energyCalculator.removeChild(energyCalculator.childNodes[0]);
  }
}

const app = new App();
