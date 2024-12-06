# Frontend Mentor - Calculator app solution

This is a solution to the [Calculator app challenge on Frontend Mentor](https://www.frontendmentor.io/challenges/calculator-app-9lteq5N29).

## Table of contents

- [Overview](#overview)
  - [The challenge](#the-challenge)
  - [Screenshot](#screenshot)
  - [Links](#links)
- [My process](#my-process)
  - [Built with](#built-with)
  - [Implementation Details](#implementation-details)
  - [Project Structure](#project-structure)
  - [System Design](#system-design)
  - [Useful resources](#useful-resources)
- [Author](#author)
- [Acknowledgments](#acknowledgments)

## Overview

### The challenge

Users should be able to:

- See the size of the elements adjust based on their device's screen size
- Perform mathematical operations like addition, subtraction, multiplication, and division
- Adjust the color theme based on their preference
- **Bonus**: Have their initial theme preference checked using `prefers-color-scheme` and have any additional changes saved in the browser

### Screenshot

![Calculator App](./design/desktop-preview.jpg)

### Links

- Solution URL: [Add solution URL here]
- Live Site URL: [Add live site URL here]

## My process

### Built with

- Semantic HTML5 markup
- CSS custom properties
- CSS Grid
- BEM methodology
- Mobile-first workflow
- Vanilla JavaScript
- Local Storage for theme persistence

### Implementation Details

#### HTML Structure

- Used semantic HTML5 elements
- Implemented BEM naming convention for better maintainability
- Organized calculator layout with proper sections for:
  - Theme switcher
  - Calculator display
  - Keypad grid

#### CSS Features

- Implemented three distinct themes using CSS custom properties
- Used CSS Grid for calculator keypad layout
- Responsive design with mobile breakpoint at 375px
- Custom styles for different button types:
  - Number keys
  - Operation keys
  - Delete and Reset keys
  - Equals key
- Smooth transitions for theme switching
- Custom toggle switch for theme selection

### Project Structure

```
calculator-app/
├── css/
│   └── index.css          # Main stylesheet with BEM structure
├── js/
│   └── index.js           # JavaScript functionality
├── images/
│   └── favicon-32x32.png  # Favicon
├── design/                # Design files
├── html/
│   └── index.html         # Main HTML file
├── README.md
└── style-guide.md         # Design tokens and guidelines
```

### System Design

#### Calculator Architecture

The calculator follows a modular design pattern with clear separation of concerns:

1. **State Management**

   ```javascript
   // Core state variables
   let currentNumber = "0";
   let previousNumber = null;
   let operation = null;
   let shouldResetScreen = false;
   let displayExpression = "";
   ```

2. **Core Components**

   - Display Module: Handles result visualization
   - Keypad Module: Manages user input
   - Operation Module: Processes calculations
   - Memory Module: Manages calculation state

3. **Data Flow**
   ```
   User Input → State Update → Display Update → Calculation → Result Display
   ```

#### Theme System Architecture

The theme system uses a CSS custom properties-based approach with JavaScript management:

1. **Theme Definition**

   ```javascript
   const themes = {
     1: {
       mainBackground: "hsl(222, 26%, 31%)",
       // ... other theme properties
     },
   };
   ```

2. **Theme Components**

   - Theme Toggle UI
   - Color Variables System
   - Storage Management
   - System Preference Detection

3. **Theme Switching Flow**
   ```
   User Selection → Theme Load → CSS Update → Storage Update
   ```

#### BEM Methodology Implementation

The project follows BEM (Block Element Modifier) naming convention:

1. **Blocks**

   ```css
   .calculator    /* Main calculator container */
   /* Main calculator container */
   .theme        /* Theme switching component */
   .header; /* Header section */
   ```

2. **Elements**

   ```css
   .calculator__display  /* Calculator display */
   /* Calculator display */
   .calculator__keypad  /* Calculator keypad */
   .calculator__key; /* Individual keys */
   ```

3. **Modifiers**
   ```css
   .calculator__key--equals  /* Equals button */
   /* Equals button */
   .calculator__key--del    /* Delete button */
   .calculator__key--reset; /* Reset button */
   ```

### Useful resources

- [BEM Methodology](https://getbem.com/) - For maintaining a clean and scalable CSS structure
- [CSS Custom Properties](https://developer.mozilla.org/en-US/docs/Web/CSS/Using_CSS_custom_properties) - For understanding CSS variables and theming
- [CSS Grid Guide](https://css-tricks.com/snippets/css/complete-guide-grid/) - For CSS Grid layout implementation

## Author

- Website - [Loki]
- Frontend Mentor - [@yourusername](https://www.frontendmentor.io/profile/yourusername)

## Acknowledgments

Thanks to Frontend Mentor for providing this challenge and the design assets.
