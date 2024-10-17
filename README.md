# DragonBall

A project designed to practice API usage, focusing on fetching and displaying data from external sources related to the Dragon Ball universe.

## Table of Contents
- [Introduction](#introduction)
- [Features](#features)
- [Installation](#installation)
- [Usage](#usage)
- [Technologies](#technologies)
- [Contributing](#contributing)
- [Authors](#authors)
- [License](#license)

## Introduction

This project demonstrates how to interact with external APIs to fetch data related to the Dragon Ball universe and display it dynamically on a webpage. It focuses on practicing JavaScript techniques for making HTTP requests and handling API responses in JSON format.

## Features

- Fetch data from external APIs related to Dragon Ball
- Display character information, images, and other data dynamically
- Error handling for API requests
- Responsive and user-friendly layout

## Installation

To run this project locally:

git clone https://github.com/OlenaMyroshnykova/DragonBall.git  
cd DragonBall  
open index.html  
# or  
start index.html  
# or for Linux  
xdg-open index.html

## Usage

1. Open the project in your browser.  
2. The project automatically fetches data from the API and displays it on the webpage.  
3. You can explore and modify the `script.js` file to fetch different data from the API, handle errors, or add new features.

Example of API call in `script.js`:

```javascript
fetch('https://api.example.com/dragonball/characters')
  .then(response => response.json())
  .then(data => {
      // Logic to dynamically display the fetched data
      data.forEach(character => {
          // Example: Create elements to display character info
          const characterElement = document.createElement('div');
          characterElement.innerHTML = `<h2>${character.name}</h2><img src="${character.imageUrl}" alt="${character.name}">`;
          document.body.appendChild(characterElement);
      });
  })
```
 


## Technologies

HTML5: Markup structure for displaying content

CSS3: Styling for layout and responsiveness

JavaScript: Fetching and displaying API data, error handling, and dynamic content generation

## Contributing

Contributions are welcome! Feel free to submit suggestions or improvements related to API handling, data presentation, or user experience.

## Authors

Olena Myroshnykova - Initial work - GitHub Profile

## License

This project is licensed under the MIT License. See the LICENSE file for more details.


