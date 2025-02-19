function add(...numbers) {
  return numbers.reduce((total, num) => total + num, 0);
}

function subtract(...numbers) {
  return numbers.reduce((total, num) => total - num);
}

function multiply(...numbers) {
  return numbers.reduce((total, num) => total * num, 1);
}

function divide(...numbers) {
  return numbers.reduce((total, num) => {
    if (num === 0) {
      return "Error";
    }
    return total / num;
  });
}

let num1 = "";
let num2 = "";
let operator = "";
let shouldResetDisplay = false;

function operate(operator, num1, num2) {
  num1 = Number(num1);
  num2 = Number(num2);

  switch (operator) {
    case "+":
      return add(num1, num2);
    case "-":
      return subtract(num1, num2);
    case "*":
      return multiply(num1, num2);
    case "/":
      return divide(num1, num2);
    default:
      return "Invalid operator";
  }
}

const buttons = document.querySelectorAll(".btn");
const display = document.getElementById("display");

document.addEventListener("keydown", function (event) {
  const key = event.key;

  if (!isNaN(key)) {
    handleButtonClick(key);
  } else if (["+", "-", "*", "/"].includes(key)) {
    handleButtonClick(key);
  } else if (key === "Enter" || key === "=") {
    handleButtonClick("=");
  } else if (key === "Backspace") {
    handleButtonClick("⌫");
  } else if (key === "Escape") {
    handleButtonClick("C");
  } else if (key === ".") {
    handleButtonClick(".");
  }
});

function handleButtonClick(value) {
  const button = [...buttons].find((btn) => btn.textContent === value);
  if (button) {
    button.click();
  }
}

buttons.forEach((button) => {
  button.addEventListener("click", function () {
    const value = button.textContent;
    if (value === "C") {
      display.textContent = "0";
      num1 = "";
      num2 = "";
      operator = "";
    } else if (value === "⌫") {
      display.textContent = display.textContent.slice(0, -1);
      if (display.textContent === "") {
        display.textContent = "0";
      }
    } else if (display.textContent === "0" && !(value === ".")) {
      display.textContent = value;
    } else if (value === ".") {
      if (display.textContent.includes(".")) {
        return;
      } else if (shouldResetDisplay) {
        display.textContent = value;
        shouldResetDisplay = false;
      } else {
        display.textContent += value;
      }
    } else if (!isNaN(value)) {
      if (shouldResetDisplay) {
        display.textContent = value;
        shouldResetDisplay = false;
      } else {
        display.textContent += value;
      }
    } else if (["+", "-", "*", "/"].includes(value)) {
      if (num1 === "") {
        num1 = display.textContent;
        shouldResetDisplay = true;
      }
      operator = value;
    } else if (value === "=") {
      if (num1 !== "" && operator !== "") {
        if (num2 === "") {
          num2 = display.textContent;
        }
        display.textContent = operate(operator, num1, num2);
        num1 = display.textContent;
      } else {
        return;
      }
    }
  });
});
