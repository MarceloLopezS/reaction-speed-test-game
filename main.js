/* DOM Elements */


const dom_startButton = document.querySelector("button[data-game-start]");
const dom_stopButton = document.querySelector("button[data-game-stop]");
const dom_gameInstructions = document.querySelector(".game-instructions");
const dom_reactionIndicator = document.querySelector(".indicators__last-reaction-time");
const dom_lastReactionTime = dom_reactionIndicator.querySelector("span[data-last-reaction-time]");
const dom_mainBoard = document.querySelector(".main-board");
const dom_countDownMessage = dom_mainBoard.querySelector("div[data-countdown-message]");
const dom_gameOverMessage = dom_mainBoard.querySelector("div[data-gameover-message]");
const dom_averageReactionTime = dom_gameOverMessage.querySelector("span[data-average-reaction-time]");
const dom_targetFigure = dom_mainBoard.querySelector("div[data-game-target]");


/* GLOBAL VARIABLES */


let countDownInterval, figureDisplayTimeout, figureStartMoment, figureAppearances, averageReactionTime;
let playing = false;
let reactionTimeList = [];
const maxFigureAppearances = 20;
const mainBoardWidth = dom_mainBoard.clientWidth;

/* MAIN */


dom_startButton.addEventListener('click', handleOnStartClick);
dom_stopButton.addEventListener('click', gameOver);


/* FUNCTIONS */


// Show DOM elements
function showElements(...elements) {
    elements.forEach(element => element.style.visibility = 'visible')
}

// Hide DOM elements
function hideElements(...elements) {
    elements.forEach(element => element.style.visibility = 'hidden')
}

// Initialize game
function initGame() {
    figureStartMoment = null;
    figureAppearances = 0;
    reactionTimeList = [];
    averageReactionTime = null;
    clearInterval(countDownInterval);
    clearTimeout(figureDisplayTimeout);

    showElements(dom_gameInstructions)
}

// Generate random hsl color for the target figure (CSS formatted)
function generateRandomHslColor() {
    const hue = Math.round(Math.random() * 359);
    const saturation = Math.round(Math.random() * 100);
    // Cap ligthness at 60% max to maintain contrast with white background
    const lightness = Math.round(Math.random() * 60);
    const hslColor = `hsl(${hue}, ${saturation}%, ${lightness}%)`;

    return hslColor
}

// Generate random width for the target figure (use with CSS pixel unit)
function generateRandomWidth(containerWidth) {
    // Random width generated as a percentaje of the container width
    // Random width can be from 4% to 8% of the container width
    const randomWidth = containerWidth * 0.04 + (Math.round(Math.random() * containerWidth * 0.04));

    return randomWidth
}

// Generate random position (use with CSS percentaje unit)
function generateRandomPosition() {
    const offset = 10;
    // Top between 10% and 50% of the container height
    const top = offset + Math.round(Math.random() * 50);
    // Left between 10% and 70% of the container width
    const left = offset + Math.round(Math.random() * 70);

    return { top, left }
}

// Display randomized target figure (square or circle), with random color and random position. Also register the display moment and appearance
function displayRandomizedFigure() {
    const hslColor = generateRandomHslColor();
    const width = generateRandomWidth(mainBoardWidth);
    const { top, left } = generateRandomPosition();

    dom_targetFigure.style.backgroundColor = hslColor;
    // Only defining width as the CSS of the element has aspect-ratio: 1
    dom_targetFigure.style.width = `${width}px`;
    dom_targetFigure.style.top = `${top}%`;
    dom_targetFigure.style.left = `${left}%`;
    // Randomize square or circle shape
    Math.random() < 0.5
        ? dom_targetFigure.style.borderRadius = '50%'
        : dom_targetFigure.style.borderRadius = 'none';
    
    dom_targetFigure.addEventListener('click', handleFigureClick);
    showElements(dom_targetFigure);

    // Register display moment
    figureStartMoment = new Date().getTime();
    // Register figure appearance
    figureAppearances++
}

// Randomly delay display of the figure (between 0 and 2 seconds)
function randomlyDelayedFigureDisplay() {
    figureDisplayTimeout = setTimeout(displayRandomizedFigure, Math.random() * 2000)
}

// Calculate reaction time in seconds
function calculateReactionTime(startMoment, endMoment) {
    return (endMoment - startMoment) / 1000
}

// Update last reaction time
function updateLastReactionTimeIndicator(timeValue) {
    if (dom_lastReactionTime.style.visibility === '' || dom_lastReactionTime.style.visibility === 'hidden') {
        dom_lastReactionTime.style.visibility = 'visible'
    }

    dom_lastReactionTime.textContent = `${timeValue}s`
}

// Get numbers average
function calculateAverage(...numbers) {
    const initialValue = 0;
    const totalSum =  numbers.reduce(
        (accumulator, currentValue) => accumulator + currentValue,
        initialValue
    )
    
    return totalSum / numbers.length
}

// Game Over
function gameOver() {
    if (!playing) return;

    playing = false;
    dom_startButton.textContent = 'Start';
    clearInterval(countDownInterval);
    clearTimeout(figureDisplayTimeout);
    hideElements(dom_countDownMessage, dom_reactionIndicator, dom_lastReactionTime, dom_targetFigure);
    dom_targetFigure.removeEventListener('click', handleFigureClick);
    /* If game is stopped by user before completing the max figure appearances:
    Show instructions, not game over message with average reaction time */
    if (figureAppearances < maxFigureAppearances) {
        showElements(dom_gameInstructions);
        return
    }
    dom_averageReactionTime.textContent = `${calculateAverage(...reactionTimeList).toFixed(3)}s`;
    showElements(dom_gameOverMessage);
}

// Handle target figure click
function handleFigureClick() {
    dom_targetFigure.removeEventListener('click', handleFigureClick);
    
    const figureEndMoment = new Date().getTime();
    const reactionTime = calculateReactionTime(figureStartMoment, figureEndMoment);
    updateLastReactionTimeIndicator(reactionTime);
    // Register reaction time
    reactionTimeList = [...reactionTimeList, reactionTime];
    // Check if max appearances limit is reached. If so, end game
    if (figureAppearances === maxFigureAppearances) {
        return gameOver()
    }

    // Hide target figure
    hideElements(dom_targetFigure);
    // Respawn random figure
    randomlyDelayedFigureDisplay();
}

// Handle click on Start button
function handleOnStartClick() {
    // To act as a reset button when playing, end game and continue
    if (playing) {
        gameOver()
    }

    let count = 3;
    initGame();
    playing = true;
    dom_startButton.textContent = 'Reset';
    dom_countDownMessage.textContent = count;
    hideElements(dom_gameOverMessage, dom_reactionIndicator, dom_lastReactionTime, dom_targetFigure);
    showElements(dom_gameInstructions, dom_countDownMessage);
    countDownInterval = setInterval(() => {
        count--;
        dom_countDownMessage.textContent = count;
        if (count < 1) {
            clearInterval(countDownInterval);
            hideElements(dom_gameInstructions, dom_countDownMessage);
            showElements(dom_reactionIndicator);
            randomlyDelayedFigureDisplay();
        }
    }, 1000)
}