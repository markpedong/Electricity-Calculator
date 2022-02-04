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

class TotalPerDay {
  constructor(totalCostPerDay, totalCostPerMonth) {
    this.totalCostPerDay = totalCostPerDay;
    this.totalCostPerMonth = totalCostPerMonth;
  }
}

class Total {
  constructor(totalUsage, totalPower) {
    this.totalUsage = totalUsage;
    this.totalPower = totalPower;
  }
}

class Consumption {
  constructor(consumption) {
    this.consumption = consumption;
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
const totalPowerCalc = document.querySelector(".total__electricity");
const totalUsageCalc = document.querySelector(".total__usage");
const pricePerDay = document.querySelector(".price__day");
const pricePerMonth = document.querySelector(".price__month");
class App {
  #appliances = [];
  #totalDetails = [];
  #totalkWh = [];
  #cost = [];

  constructor() {
    form.addEventListener("submit", this._newDevices.bind(this));
    energyForm.addEventListener("submit", this._calculateTotal.bind(this));
  }

  _newDevices(e) {
    e.preventDefault();

    // Get the data from form
    const device = inputDevice.value;
    const usage = +inputUsage.value;
    const power = +inputPower.value;

    let appliance;

    /////////////////////////////////////////////////////
    //create appliance object
    appliance = new Calculator(device, usage, power);

    // Guard Clause
    if (!device) return alert("Please input Device / Appliances Name");
    if (!usage || !power) return alert("Inputs have to be a Positive Number");

    // Add new Objects to array
    this.#appliances.push(appliance);

    // RenderList data
    this._renderDevice(appliance);

    // Put All input in the Final
    this._totalDevice();

    // Check if data is valid

    // Clear All Inputs
    inputDevice.value =
      inputPower.value =
      inputUsage.value =
      energyForm.value =
        "";
  }

  _totalDevice() {
    // get data from form
    let total;
    let totalElec;

    // Calculatign all Totalvalue
    const totalUsage = this.#appliances.reduce(function (prevEl, curEl) {
      return prevEl + curEl.usage;
    }, 0);

    const totalPower = this.#appliances.reduce(function (prevEl, curEl) {
      return prevEl + curEl.power;
    }, 0);

    // Rendering in Total Calculator
    totalUsageCalc.textContent = totalUsage;

    const powerNUsage = totalPower * totalUsage;

    const totalPowerAll = (totalPowerCalc.textContent =
      numeral(powerNUsage) > 1000
        ? format("0a").slice(0, -1)
        : powerNUsage / 1000);

    //Create Total Object
    total = new Total(totalUsage, totalPower);
    totalElec = new Consumption(totalPowerAll);

    //Push data to array
    this.#totalDetails.push(total);
    this.#totalkWh.push(totalElec);
  }

  _calculateTotal(e) {
    e.preventDefault();

    let totalPerDayMonth;

    // Get data from form
    const price = +energyPrice.value;
    if (!price)
      return alert("Please input Electricity Price. Refer to your bill!");

    const totalConsumption = this.#totalkWh;

    const reverseTotal = totalConsumption.reverse().shift();
    const totalkWhPerDay = +reverseTotal.consumption;

    const totalCostPerDay = price * totalkWhPerDay;

    const totalCostPerMonth = totalCostPerDay * 30;

    // Creating TotalPerDay Object
    totalPerDayMonth = new TotalPerDay(totalCostPerDay, totalCostPerMonth);

    // Pushing into new Array
    this.#cost.push(totalPerDayMonth);

    this._renderCost();

    //store totalCostPerDay, totalCostPerMonth this into class and make a new function that renders this data into the DOM, Add animation on the DOM, FAQ, Contact
  }

  _renderCost() {
    const arrCost = this.#cost;

    const reverseArrCost = arrCost.reverse().shift();
    const costPerDay = +reverseArrCost.totalCostPerDay;
    const costPerMonth = +reverseArrCost.totalCostPerMonth;
    pricePerDay.textContent = `₱ ${costPerDay}`;
    pricePerMonth.textContent = `${costPerMonth}`;
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
}

const app = new App();
