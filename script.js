"use strict";

const buttonEl = document.querySelector(".btn");
const zerosEl = document.querySelector(".zeros");
const cardNameEl = document.querySelector(".cardName");
const nameEl = document.querySelector(".name");
const dateEl = document.querySelector(".date");
const cvcNumEl = document.querySelector(".cvcNum");
const cardNumberEl = document.querySelector(".cardNumber");
const cardMonthEl = document.querySelector(".cardMonth");
const cardYearEl = document.querySelector(".cardYear");
const cvcEl = document.querySelector(".CVC");
const error1El = document.querySelector(".error1");
const secondErrorEl = document.querySelector(".secondError");
const errorsEl = document.querySelector(".errors");
const errors2El = document.querySelector(".errors2");
const formAspectEl = document.querySelector(".formAspect");
const btnContEl = document.querySelector(".btnCont");
const messageEl = document.querySelector(".message");
const month_error = document.querySelector(".month_error");
const cvc_error = document.querySelector(".cvc_error");

const formatInputLetter = function (inputString) {
  const pattern = /[^0-9]/;
  console.log(pattern.test(inputString));
  return pattern.test(inputString);
};

const formatInputNumber = function (inputString) {
  if (inputString.length > 20 && inputString.includes(" ")) {
    inputString = inputString.substring(0, 20);
  } else if (inputString.length > 16 && inputString.includes(" ") === false) {
    error1El.classList.remove("hidden");
    cardNumberEl.style.borderColor = "hsl(0, 100%, 66%)";
    zerosEl.textContent = `0000 0000 0000 0000`;
    inputString = inputString.substring(0, 16);
  }

  if (inputString.length < 20 && inputString.includes(" ")) {
    error1El.classList.remove("hidden");
    cardNumberEl.style.borderColor = "hsl(0, 100%, 66%)";
  } else if (inputString.length < 16 && inputString.includes(" ") === false) {
    error1El.classList.remove("hidden");
    cardNumberEl.style.borderColor = "hsl(0, 100%, 66%)";
  }

  // Insert space afterevry 4 digits
  const formattedString = inputString.replace(/(\d{4})(?=\d)/g, "$1 ");
  return formattedString;
};

buttonEl.addEventListener("click", function (e) {
  e.preventDefault();

  zerosEl.textContent = formatInputNumber(cardNumberEl.value);
  if (cardNumberEl.value === "") {
    zerosEl.textContent = "0000 0000 0000 0000";
  }

  if (cardNameEl.value === "") {
    nameEl.textContent = "Jane Appleseed";
    document.querySelector(".nameError").classList.remove("hidden");
    cardNameEl.style.borderColor = "hsl(0, 100%, 66%)";
  } else {
    nameEl.textContent = cardNameEl.value;
  }
  // month and year errors
  if (cardMonthEl.value === "" || cardYearEl.value === "") {
    dateEl.textContent = "00/00";
    errorsEl.classList.remove("hidden");
    month_error.classList.remove("hidden");
    cardMonthEl.style.borderColor = "hsl(0, 100%, 66%)";
    cardYearEl.style.borderColor = "hsl(0, 100%, 66%)";
  } else {
    dateEl.textContent = `${cardMonthEl.value}/${cardYearEl.value}`;
  }
  

  if (Number(cardMonthEl) === NaN || Number(cardYearEl) === NaN) {
    errors2El.classList.remove("hidden");
  }

  // cvc errors
  if (cvcEl.value === "") {
    cvcNumEl.textContent = "000";
    cvcEl.style.borderColor = "hsl(0, 100%, 66%)";
    errorsEl.classList.remove("hidden");
    if (month_error.classList.contains("hidden")) {
      errorsEl.style.justifyContent = "end";
    }
    cvc_error.classList.remove("hidden");
  } else {
    cvcNumEl.textContent = cvcEl.value;
  }
 

  // Show thank you message
  if (
    cvcNumEl.textContent === cvcEl.value &&
    dateEl.textContent === `${cardMonthEl.value}/${cardYearEl.value}` &&
    nameEl.textContent === cardNameEl.value &&
    zerosEl.textContent === cardNumberEl.value
  ) {
    formAspectEl.classList.add("hidden");
    messageEl.classList.remove("hidden");
  }
});
