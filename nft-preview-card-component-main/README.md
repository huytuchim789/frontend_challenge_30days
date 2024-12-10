# Frontend Mentor - NFT Preview Card Component Solution

This is a solution to the [NFT preview card component challenge on Frontend Mentor](https://www.frontendmentor.io/challenges/nft-preview-card-component-SbdUL_w0U). 

## Table of contents

- [Overview](#overview)
  - [The challenge](#the-challenge)
  - [Screenshot](#screenshot)
  - [Links](#links)
- [My process](#my-process)
  - [Built with](#built-with)
  - [What I learned](#what-i-learned)
- [Author](#author)

## Overview

### The challenge

Users should be able to:

- View the optimal layout depending on their device's screen size
- See hover states for interactive elements on the NFT card

### Screenshot

![](./screenshot.jpg)

*Add your screenshot here*

### Links

- Solution URL: [Add solution URL here](https://your-solution-url.com)
- Live Site URL: [Add live site URL here](https://your-live-site-url.com)

## My process

### Built with

- Semantic HTML5 markup
- CSS custom properties
- Flexbox
- CSS Grid
- Mobile-first workflow
- BEM methodology

### What I learned

Some key learnings from this project:

- Creating overlay effects on hover
- Working with card layouts
- Implementing responsive images
- Using BEM naming conventions
- Managing asset paths effectively

Example of the overlay implementation:

```css
.card-image-container {
  position: relative;
}

.card-image-overlay {
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background-color: hsla(178, 100%, 50%, 0.5);
  opacity: 0;
  transition: opacity 0.3s ease;
}

.card-image-container:hover .card-image-overlay {
  opacity: 1;
}
```

## Author

- Frontend Mentor - [@yourusername](https://www.frontendmentor.io/profile/yourusername)

## Acknowledgments

- Challenge by [Frontend Mentor](https://www.frontendmentor.io)
- Outfit font from Google Fonts
