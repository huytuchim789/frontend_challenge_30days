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

const display = document.querySelector(".calculator__result");
const keys = document.querySelectorAll(".calculator__key");
const themeToggles = document.querySelectorAll(".theme-toggle__input");

// A single string to hold the expression
let displayExpression = "";

// Theme switching
function setTheme(themeNumber) {
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
  setTheme(themeNumber);
}

// Update display
function updateDisplay() {
  display.textContent = displayExpression || "0";
}

// Append number or dot
function appendCharacter(char) {
  // Prevent multiple dots in a single number without operator
  if (char === "." && /(\.\d*$|\.$)/.test(displayExpression)) return;
  displayExpression += char;
  updateDisplay();
}

// Handle an operator
function appendOperator(op) {
  // Replace 'x' with '*'
  if (op === "x") op = "*";

  // If last char is an operator, replace it
  if (/[\+\-\*\/]$/.test(displayExpression)) {
    displayExpression = displayExpression.slice(0, -1) + op;
  } else if (displayExpression !== "") {
    // Only add operator if there's something on display
    displayExpression += op;
  }
  updateDisplay();
}

// Calculate using math.js
function calculateExpression() {
  if (!displayExpression) return;
  try {
    const result = math.evaluate(displayExpression);
    displayExpression = result.toString();
  } catch (err) {
    alert("Invalid expression");
    displayExpression = "";
  }
  updateDisplay();
}

// Delete last character
function handleDelete() {
  displayExpression = displayExpression.slice(0, -1);
  updateDisplay();
}

// Reset calculator
function handleReset() {
  displayExpression = "";
  updateDisplay();
}

// Event Listeners
keys.forEach((key) => {
  key.addEventListener("click", () => {
    const keyContent = key.textContent;

    if (!isNaN(keyContent) || keyContent === ".") {
      appendCharacter(keyContent);
    } else if (["+", "-", "x", "/"].includes(keyContent)) {
      appendOperator(keyContent);
    } else if (keyContent === "=") {
      calculateExpression();
    } else if (keyContent === "DEL") {
      handleDelete();
    } else if (keyContent === "RESET") {
      handleReset();
    }
  });
});

themeToggles.forEach((toggle) => {
  toggle.addEventListener("change", () => {
    setTheme(toggle.id.replace("toggle", ""));
  });
});

// Initialize
initializeTheme();
updateDisplay();
