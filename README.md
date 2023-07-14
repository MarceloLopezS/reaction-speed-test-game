# Reaction - Aim Speed Test

This is a simple Aim Speed Test game developed with HTML, CSS and JavaScript. It generates random figures and keeps track of the time it takes for the user to click on the figure (simulating aim) to then calculate the average reaction time after a determined number of figure appearances.

The app is intended to provide a simple, user-friendly interface and optimal experience across desktop devices with different screen resolutions that use a mouse as the primary pointer device. For this, the most recent CSS features, along with semantic HTML, and up-to-date JavaScript technologies are used.

The main game logic is handled by the JavaScript code, which is driven towards Functional Programming and centered in clean, readable code with good practices. This code is divided in four main sections: *DOM Elements*, *Variables*, *Main* and *Functions*.

The *DOM Elements* section stores the elements that will be manipulated to achieve the game's visual functionallity and interactivity.

The *Variables* section initializes the variables in the highest scope so they can easily be accessed and modified inside different functions.

The *Main* section sets the event listeners for the main controls, which are the Start and Stop button.

The *Functions* section contains all the necessary functions for the game to work. These are:

- `showElements(...elements)`: This function takes in an arbitrary number of DOM elements as arguments and sets their CSS visibility property to ‘visible’, effectively showing them on the page.

- `hideElements(...elements)`: This function takes in an arbitrary number of DOM elements as arguments and sets their CSS visibility property to ‘hidden’, effectively hiding them on the page.

- `initGame()`: This function initializes the game by resetting global variables, clearing any intervals or timeouts, and showing the game instructions.

- `generateRandomHslColor()`: This function generates and returns a random HSL color string, with hue values between 0 and 359, saturation values between 0 and 100%, and lightness values between 0 and 60% (to maintain contrast with a white background).

- `generateRandomWidth(containerWidth)`: This function takes in the width of the container element as an argument and generates and returns a random width for the target figure. The random width is calculated as a percentage of the container width, with values between 4% and 8% of the container width.

- `generateRandomPosition()`: This function generates a random position for the target figure, with top values between 10% and 50% of the container height, and left values between 10% and 70% of the container width. The position is returned as an object with top and left properties.

- `displayRandomizedFigure()`: This function displays a randomized target figure on the page. The figure is either a square or a circle, with a random returned color from `generateRandomHslColor()`, width from `generateRandomWidth(containerWidth)`, and position from `generateRandomPosition()`. The function also registers the display moment and increments the `figureAppearances` counter.

- `randomlyDelayedFigureDisplay()`: This function uses `setTimeout` to randomly delay the display of the target figure, when calling `displayRandomizedFigure()`,by up to 2 seconds.

- `calculateReactionTime(startMoment, endMoment)`: This function takes in two arguments representing the start and end moments of a reaction time measurement and returns the reaction time in seconds.

- `updateLastReactionTimeIndicator(timeValue)`: This function takes in a time value (in seconds) as an argument and updates the last reaction time indicator on the page with it.

- `calculateAverage(...numbers)`: This function takes in an arbitrary number of numbers as arguments and returns their average value.

- `gameOver()`: This function handles game over by resetting global variables, clearing any intervals or timeouts, hiding countdown message, reaction indicator, last reaction time and target figure elements; removing event listeners from the target figure, and showing either the game instructions or game over message (depending on whether the game was stopped by the user or the max figure appearances were reached).

- `handleFigureClick()`: This function handles clicks on the target figure by removing its click event listener, calculating the reaction time, updating the last reaction time indicator, checking if the max figure appearances were reached (and ending the game if so), hiding the target figure, and respawning a new random figure by calling `randomlyDelayedFigureDisplay()`.

- `handleOnStartClick()`: This function handles clicks on the Start button by initializing the game, setting playing status to true, starting a countdown, hiding game over message, reaction indicator, reaction time and target figure elements; showing game instructions and countdown message elements; and displaying a randomized target figure when the countdown reaches zero by calling `randomlyDelayedFigureDisplay()`.

This project is mainly a use example of CSS for responsiveness across devices and JavaScript for interactivity by implementing DOM manipulation, Event Listeners, Intervals and Timeouts using the latest ECMAScript features such as template strings, arrow functions, object destructuring, spread syntax, conditionals using ternary operator, etc.