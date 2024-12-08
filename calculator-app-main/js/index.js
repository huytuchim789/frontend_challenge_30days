const themes = {
  1: {
    mainBackground: "hsl(222, 26%, 31%)",
    toggleKeypadBackground: "hsl(223, 31%, 20%)",
    screenBackground: "hsl(224, 36%, 15%)",
    keyBackgroundDark: "hsl(30, 25%, 89%)",
    keyShadowDark: "hsl(28, 16%, 65%)",
    keyBackgroundAccent: "hsl(225, 21%, 49%)",
    keyShadowAccent: "hsl(224, 28%, 35%)",
    keyBackgroundEquals: "hsl(6, 63%, 50%)",
    keyShadowEquals: "hsl(6, 70%, 34%)",
    textPrimary: "hsl(0, 0%, 100%)",
    textEquals: "hsl(0, 0%, 100%)",
    textMainKey: "hsl(223, 31%, 20%)",
    textFunctionKey: "hsl(0, 0%, 100%)",
  },
  2: {
    mainBackground: "hsl(0, 0%, 90%)",
    toggleKeypadBackground: "hsl(0, 5%, 81%)",
    screenBackground: "hsl(0, 0%, 93%)",
    keyBackgroundDark: "hsl(45, 7%, 89%)",
    keyShadowDark: "hsl(35, 11%, 61%)",
    keyBackgroundAccent: "hsl(185, 42%, 37%)",
    keyShadowAccent: "hsl(185, 58%, 25%)",
    keyBackgroundEquals: "hsl(25, 98%, 40%)",
    keyShadowEquals: "hsl(25, 99%, 27%)",
    textPrimary: "hsl(60, 10%, 19%)",
    textEquals: "hsl(0, 0%, 100%)",
    textMainKey: "hsl(60, 10%, 19%)",
    textFunctionKey: "hsl(0, 0%, 100%)",
  },
  3: {
    mainBackground: "hsl(268, 75%, 9%)",
    toggleKeypadBackground: "hsl(268, 71%, 12%)",
    screenBackground: "hsl(268, 71%, 12%)",
    keyBackgroundDark: "hsl(268, 47%, 21%)",
    keyShadowDark: "hsl(290, 70%, 36%)",
    keyBackgroundAccent: "hsl(281, 89%, 26%)",
    keyShadowAccent: "hsl(285, 91%, 52%)",
    keyBackgroundEquals: "hsl(176, 100%, 44%)",
    keyShadowEquals: "hsl(177, 92%, 70%)",
    textPrimary: "hsl(52, 100%, 62%)",
    textEquals: "black",
    textMainKey: "hsl(52, 100%, 62%)",
    textFunctionKey: "hsl(0, 0%, 100%)",
  },
};

//Dom Elements

const resultDisplay = document.querySelector(".calculator__result");
const keys = document.querySelectorAll(".calculator__key");
const themeTogglesInput = document.querySelectorAll(".theme-toggle__input");
// Calculator state
let currentNumber = "0";
let previousNumber = null;
let operator = null;
let shouldResetScreen = false;
let displayExpression = "";
let isLockConsecutiveOperator = false;
// Theme Switching
function switchTheme(themeNumber) {
  const theme = themes[themeNumber];

  const root = document.documentElement;
  Object.entries(theme).forEach(([property, value]) => {
    root.style.setProperty(
      `--${property.replace(/([A-Z])/g, "-$1").toLowerCase()}`,
      value
    );
  });

  localStorage.setItem("calculator-theme", themeNumber);
}

function initializeTheme() {
  const themeNumber = localStorage.getItem("calculator-theme") || 1;
  document.getElementById(`toggle${themeNumber}`).checked = true;
  switchTheme(themeNumber);
}

// Calculator Logic
function updateDisplay(isResult = false) {
  if (isResult) {
    resultDisplay.textContent = currentNumber;
    displayExpression = "";
  } else {
    let displayText = displayExpression;

    if (!shouldResetScreen) {
      displayText += (displayExpression ? " " : "") + currentNumber;
    }

    resultDisplay.textContent = displayText || currentNumber;
  }
}

function appendNumber(number) {
  if (shouldResetScreen) {
    shouldResetScreen = false;
    currentNumber = "";
  }
  if (number === "." && currentNumber.includes(".")) return;
  if (currentNumber === "0" && number !== ".") {
    currentNumber = number;
  } else {
    currentNumber += number;
  }
  isLockConsecutiveOperator = false;
  updateDisplay();
}
function calculate() {
  if (!previousNumber || !operator || shouldResetScreen) return;

  displayExpression += ` ${currentNumber}`;
  const prev = parseFloat(previousNumber);
  const current = parseFloat(currentNumber);
  let result;

  switch (operator) {
    case "+":
      result = prev + current;
      break;
    case "-":
      result = prev - current;
      break;
    case "x":
      result = prev * current;
      break;
    case "/":
      if (current === 0) {
        alert("Can't divide by zero!");
        return;
      }
      result = prev / current;
      break;
    default:
      return;
  }

  currentNumber = result.toString();
  previousNumber = null;
  operator = null;
  updateDisplay(true);
}
function handleReset() {
  currentNumber = "0";
  previousNumber = null;
  operator = null;
  isLockConsecutiveOperator = false;
  displayExpression = "";
  updateDisplay();
}

function handleDelete() {
  if (shouldResetScreen) {
    // If we're about to reset screen, delete the operator instead
    if (displayExpression) {
      displayExpression = displayExpression.slice(0, -2); // Remove operator and space
      operator = null;
      shouldResetScreen = false;
      isLockConsecutiveOperator = false;
      currentNumber = previousNumber;
      previousNumber = null;
    }

    console.log("1", 1);
  } else {
    if (currentNumber.length === 1) {
      currentNumber = "";
      // Reset display expression if we're deleting the last digit
      console.log("2", 2);
      if (displayExpression) {
        displayExpression = displayExpression.slice(
          0,
          displayExpression.lastIndexOf(" ")
        );
      }
    } else {
      currentNumber = currentNumber.slice(0, -1);
    }
  }
  updateDisplay();
}

function handleOperation(operation) {
  if (isLockConsecutiveOperator) return;
  if (!displayExpression) {
    displayExpression = currentNumber;
  } else if (!shouldResetScreen) {
    displayExpression += ` ${currentNumber}`;
  }
  if (previousNumber === null) {
    previousNumber = currentNumber;
  } else if (!shouldResetScreen) {
    const prev = parseFloat(previousNumber);
    const current = parseFloat(currentNumber);

    switch (operation) {
      case "+":
        previousNumber = (prev + current).toString();
        break;
      case "-":
        previousNumber = (prev - current).toString();
        break;
      case "×":
        previousNumber = (prev * current).toString();
        break;
      case "/":
        if (current === 0) {
          alert("Cannot divide by 0");
        } else {
          previousNumber = (prev / current).toString();
        }
        break;
    }
  }
  operator = operation;
  displayExpression += ` ${operation}`;
  shouldResetScreen = true;
  isLockConsecutiveOperator = true;
  updateDisplay();
}
// Event Listeners
keys.forEach((key) => {
  key.addEventListener("click", () => {
    const keyContent = key.textContent;

    if (!isNaN(keyContent) || keyContent === ".") {
      appendNumber(keyContent);
    } else if (["+", "-", "x", "/"].includes(keyContent)) {
      handleOperation(keyContent);
    } else if (keyContent === "=") {
      calculate();
    } else if (keyContent === "DEL") {
      handleDelete();
    } else if (keyContent === "RESET") {
      handleReset();
    }
  });
});

themeTogglesInput.forEach((toggle) => {
  toggle.addEventListener("click", () => {
    switchTheme(toggle.id.replace("toggle", ""));
  });
});

initializeTheme();
updateDisplay();
