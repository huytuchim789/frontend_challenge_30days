// Theme handling
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
    textDark: "hsl(221, 14%, 31%)",
    textWhite: "white",
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
    textDark: "white",
    textWhite: "white",
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
    textDark: "hsl(198, 20%, 13%)",
    textWhite: "white",
  },
};

// Calculator state
let currentNumber = "0";
let previousNumber = null;
let operation = null;
let shouldResetScreen = false;
let displayExpression = "";

// DOM Elements
const display = document.querySelector(".calculator__result");
const keys = document.querySelectorAll(".calculator__key");
const themeToggles = document.querySelectorAll(".theme-toggle__input");

// Theme switching
function setTheme(themeNumber) {
  const theme = themes[themeNumber];
  const root = document.documentElement;

  document.body.setAttribute("data-theme", themeNumber);

  Object.entries(theme).forEach(([property, value]) => {
    root.style.setProperty(
      `--${property.replace(/([A-Z])/g, "-$1").toLowerCase()}`,
      value
    );
  });

  localStorage.setItem("calculatorTheme", themeNumber);
}

// Initialize theme
function initializeTheme() {
  const savedTheme =
    localStorage.getItem("calculatorTheme") ||
    (window.matchMedia("(prefers-color-scheme: dark)").matches ? "1" : "2");
  document.getElementById(`toggle${savedTheme}`).checked = true;
  setTheme(savedTheme);
}

// Calculator functions
function updateDisplay(isResult = false) {
  if (isResult) {
    display.textContent = currentNumber;
    displayExpression = "";
  } else {
    // Show current expression and current number being entered
    let displayText = displayExpression;
    if (!shouldResetScreen && currentNumber !== "0") {
      displayText += (displayExpression ? " " : "") + currentNumber;
    }
    display.textContent = displayText || currentNumber;
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

  updateDisplay();
}

function handleOperation(op) {
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
          alert("Can't divide by zero!");
          return;
        }
        previousNumber = (prev / current).toString();
        break;
    }
  }

  operation = op;
  displayExpression += ` ${op}`;
  shouldResetScreen = true;
  updateDisplay();
}

function calculate() {
  if (!previousNumber || !operation || shouldResetScreen) return;

  displayExpression += ` ${currentNumber}`;

  const prev = parseFloat(previousNumber);
  const current = parseFloat(currentNumber);
  let result;

  switch (operation) {
    case "+":
      result = prev + current;
      break;
    case "-":
      result = prev - current;
      break;
    case "×":
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
  operation = null;
  updateDisplay(true);
}

function handleReset() {
  currentNumber = "0";
  previousNumber = null;
  operation = null;
  displayExpression = "";
  updateDisplay();
}

function handleDelete() {
  if (currentNumber.length === 1) {
    currentNumber = "0";
  } else {
    currentNumber = currentNumber.slice(0, -1);
  }
  updateDisplay();
}

// Event Listeners
keys.forEach((key) => {
  key.addEventListener("click", () => {
    const keyContent = key.textContent;

    if (!isNaN(keyContent) || keyContent === ".") {
      appendNumber(keyContent);
    } else if (["+", "-", "×", "/"].includes(keyContent)) {
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

themeToggles.forEach((toggle) => {
  toggle.addEventListener("change", (e) => {
    const themeNumber = e.target.id.replace("toggle", "");
    setTheme(themeNumber);
  });
});

// Initialize calculator
initializeTheme();
updateDisplay();
