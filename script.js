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
  const regex2 = /^\s+$/;

  if (cardNameEl.value === "") {
    nameEl.textContent = "Jane Appleseed";
    document.querySelector(".nameError").classList.remove("hidden");
    cardNameEl.style.borderColor = "hsl(0, 100%, 66%)";
  } else {
    nameEl.textContent = cardNameEl.value;
  }

  const regex = /[^A-Za-z]s/;
  if (regex.test(cardNameEl.value)) {
    document.querySelector(".nameError").textContent =
      "Name should only contain letters";
    document.querySelector(".nameError").classList.remove("hidden");
    cardNameEl.style.borderColor = "hsl(0, 100%, 66%)";
    nameEl.textContent = "Jane Appleseed";
  }

  if (regex2.test(cardNameEl.value)) {
    nameEl.value = "Jane Appleseed";
    document.querySelector(".nameError").textContent = "Enter a valid name";
    document.querySelector(".nameError").classList.remove("hidden");
    cardNameEl.style.borderColor = "hsl(0, 100%, 66%)";
    nameEl.textContent = "Jane Appleseed";
  }

  const pattern = /[^0-9\s]/;
  if (pattern.test(cardNumberEl.value)) {
    error1El.textContent = "Wrong format, numbers only";
    error1El.classList.remove("hidden");
    zerosEl.textContent = "0000 0000 0000 0000";
    cardNumberEl.style.borderColor = "hsl(0, 100%, 66%)";
  }

  if (regex2.test(cardNumberEl)) {
    error1El.textContent = "Enter valid card number";
    error1El.classList.remove("hidden");
    zerosEl.textContent = "0000 0000 0000 0000";
    cardNumberEl.style.borderColor = "hsl(0, 100%, 66%)";
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

  if (pattern.test(cardMonthEl.value || cardYearEl.value)) {
    month_error.textContent = "Wrong format, numbers only";
    month_error.classList.remove("hidden");
    dateEl.textContent = `00/00`;
    cardMonthEl.style.borderColor = "hsl(0, 100%, 66%)";
    cardYearEl.style.borderColor = "hsl(0, 100%, 66%)";
  }

  if (regex2.test(cardMonthEl.value || cardYearEl.value)) {
    dateEl.textContent = `00/00`;
    month_error.textContent = "Enter a valid date";
    month_error.classList.remove("hidden");
    cardMonthEl.style.borderColor = "hsl(0, 100%, 66%)";
    cardYearEl.style.borderColor = "hsl(0, 100%, 66%)";
  }

  if (cardMonthEl.value > 2 || cardYearEl.value > 2) {
    dateEl.textContent = `00/00`;
    month_error.textContent = "Enter a valid date";
    month_error.classList.remove("hidden");
    cardMonthEl.style.borderColor = "hsl(0, 100%, 66%)";
    cardYearEl.style.borderColor = "hsl(0, 100%, 66%)";
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

  if (pattern.test(cvcEl.value)) {
    cvc_error.textContent = "Wrong format, numbers only";
    cvc_error.classList.remove("hidden");
    cvcNumEl.textContent = "000";
    cvcEl.style.borderColor = "hsl(0, 100%, 66%)";
  }

  if (regex2.test(cvcEl.value)) {
    cvcNumEl.textContent = "000";
    cvc_error.textContent = "Enter valid cvc number";
    cvc_error.classList.remove("hidden");
    cvcEl.style.borderColor = "hsl(0, 100%, 66%)";
  }

  if (
    cvc_error.textContent === "Enter valid cvc number" &&
    month_error.textContent === "Enter a valid date"
  ) {
    document.querySelector(".errors").style.gap = "10px";
  }

  if (cvcEl.textContent > 3) {
    cvcNumEl.textContent = "000";
    cvc_error.textContent = "Enter valid cvc number";
    cvc_error.classList.remove("hidden");
    cvcEl.style.borderColor = "hsl(0, 100%, 66%)";
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
