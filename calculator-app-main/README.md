# Frontend Mentor - Calculator App Solution

This is a solution to the [Calculator app challenge on Frontend Mentor](https://www.frontendmentor.io/challenges/calculator-app-9lteq5N29). The calculator features a clean, responsive design with theme switching capabilities and full arithmetic functionality.

## Features

- **Theme Switching**: Three distinct color themes with persistent storage
- **Full Arithmetic Operations**: Addition, subtraction, multiplication, and division
- **Expression Display**: Shows full mathematical expressions
- **Error Handling**: Graceful handling of invalid expressions
- **Responsive Design**: Mobile-first approach with clean layout
- **Keyboard Support**: Full keyboard input support
- **Local Storage**: Persists theme preferences

## Technical Implementation

### Architecture

The project follows a modular architecture with clear separation of concerns:

```
src/
├── js/
│   └── index.js      # Core calculator logic and theme management
├── css/
│   └── index.css     # Styled using BEM methodology
└── html/
    └── index.html    # Semantic HTML structure
```

### Core Components

1. **Theme System**

   - Uses CSS custom properties for dynamic theme switching
   - Persists preferences in localStorage
   - Three complete theme configurations

   ```javascript
   const themes = {
     1: {
       /* Default theme */
     },
     2: {
       /* Light theme */
     },
     3: {
       /* Dark theme */
     },
   };
   ```

2. **Calculator Logic**

   - Expression-based calculation using math.js
   - Maintains single expression string
   - Handles decimal validation
   - Supports operation chaining

   ```javascript
   let displayExpression = ""; // Stores current expression
   ```

3. **Display Management**
   - Real-time expression updates
   - Overflow handling with scrolling
   - Number formatting
   ```javascript
   function updateDisplay() {
     display.textContent = displayExpression || "0";
   }
   ```

### CSS Architecture

The project uses BEM methodology for maintainable CSS:

1. **Block Examples**

   ```css
   .calculator {
   }
   .theme-toggle {
   }
   .header {
   }
   ```

2. **Element Examples**

   ```css
   .calculator__display {
   }
   .calculator__keypad {
   }
   .calculator__key {
   }
   ```

3. **Modifier Examples**
   ```css
   .calculator__key--equals {
   }
   .calculator__key--del {
   }
   ```

### Key Features Implementation

1. **Theme Switching**

   ```javascript
   function setTheme(themeNumber) {
     const theme = themes[themeNumber];
     const root = document.documentElement;
     Object.entries(theme).forEach(([property, value]) => {
       root.style.setProperty(`--${property}`, value);
     });
     localStorage.setItem("calculator-theme", themeNumber);
   }
   ```

2. **Expression Handling**

   ```javascript
   function appendOperator(op) {
     if (op === "x") op = "*";
     if (/[\+\-\*\/]$/.test(displayExpression)) {
       displayExpression = displayExpression.slice(0, -1) + op;
     } else if (displayExpression !== "") {
       displayExpression += op;
     }
     updateDisplay();
   }
   ```

3. **Calculation**
   ```javascript
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
   ```

### Responsive Design

The calculator uses a mobile-first approach with:

- Flexible grid layout for keypad
- Responsive text sizing
- Adaptive spacing
- Touch-friendly button sizes

```css
.calculator__keypad {
  display: grid;
  grid-template-columns: repeat(4, 1fr);
  gap: 20px;
  padding: 20px;
}
```

### Browser Support

- Modern browsers (Chrome, Firefox, Safari, Edge)
- Uses CSS Grid and Custom Properties
- Fallback for localStorage
- Touch event support

## Development Setup

1. Clone the repository
2. Open `index.html` in a browser
3. No build process required - vanilla JavaScript and CSS

## Future Improvements

- Add keyboard support
- Implement scientific calculator functions
- Add calculation history
- Add animation for theme switching
- Improve accessibility features

## Credits

- Design by [Frontend Mentor](https://www.frontendmentor.io)
- Math.js library for calculations
- League Spartan font from Google Fonts
