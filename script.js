// ======================================
//  Import external helper functions
// ======================================
// SortingAlgorithms contains all sorting algorithm implementations
import { SortingAlgorithms } from "./helpers/sortingAlgorithms.js";

// sleep function pauses execution for animations
import { sleep } from "./helpers/util.js";

// ======================================
//  Initialization
// ======================================

// Initial number of bars to display
let nBars = 12;

// Reference to the input element for number of bars
const numbersBars = document.getElementById('numbersBars');

// Reference to the stage where bars will be displayed
const stage = document.getElementById('stage');

// Set initial width of stage based on number of bars (60px per bar including margin)
stage.style.width = `${nBars * 60}px`;

// Reference to the algorithm dropdown
const selectAlgorithm = document.getElementById('selectAlgorithm');

// Reference to control buttons
const generateBtn = document.getElementById('generateBtn');
const solveBtn = document.getElementById('solveBtn');

// Arrays to store bar data and corresponding HTML elements
let bars = [];       // Stores bar properties like width, height, position
let barsDivs = [];   // Stores the div elements for each bar

// Create an instance of SortingAlgorithms
const sortingAlgorithms = new SortingAlgorithms({});

// ======================================
//  Function: start
//  Initializes and renders bars on the stage
// ======================================
const start = () => {
    // Clear previous bars from stage
    stage.innerHTML = '';

    // Generate array of random bar heights
    bars = Array(nBars).fill(0).map(() => {
        return {
            width: 40, // Each bar has fixed width
            height: Math.floor(Math.random() * 350) + 1 // Random height between 1 and 350
        }
    });

    // Reset barsDivs array
    barsDivs = [];

    // Create div element for each bar and append to stage
    for (let i = 0; i < bars.length; i++) {
        const bar = document.createElement('div');

        // Set bar dimensions and position
        bar.style.width = `${bars[i].width}px`;
        bar.style.height = `${bars[i].height}px`;
        bar.style.left = `${5 + i * 60}px`; // Space bars by 60px
        bars[i] = { ...bars[i], position: i }; // Store position

        // Add 'bar' class for CSS styling
        bar.classList.add('bar');

        // Store reference to div
        barsDivs.push(bar);

        // Add bar to stage
        stage.appendChild(bar);
    }
}

// Initial rendering of bars
start();

// ======================================
//  Function: swapBars
//  Swap two bars visually with animation
// ======================================
async function swapBars(barsDivs, i, j) {
    // Move bars to each other's positions
    barsDivs[i].style.left = `${5 + j * 60}px`;
    barsDivs[i].classList.add('activate'); // Highlight active bar
    barsDivs[j].style.left = `${5 + i * 60}px`;
    barsDivs[j].classList.add('activate');

    // Pause for animation
    await sleep(300);

    // Remove highlight
    barsDivs[i].classList.remove('activate');
    barsDivs[j].classList.remove('activate');

    // Swap the div elements in the array
    let temp = barsDivs[i];
    barsDivs[i] = barsDivs[j];
    barsDivs[j] = temp;
}

// ======================================
//  Array of sorting algorithm functions
// ======================================
const algorithms = [
    sortingAlgorithms.bubbleSort,
    sortingAlgorithms.insertionSort,
    sortingAlgorithms.selectionSort,
    sortingAlgorithms.quickSort,
    sortingAlgorithms.mergeSort
];

// ======================================
//  Function: solve
//  Executes the selected sorting algorithm and animates it
// ======================================
const solve = async () => {
    // Create a copy of the bar heights
    const array = structuredClone(bars.map(el => el.height));

    // Get the sequence of swaps from the selected algorithm
    const swaps = algorithms[selectAlgorithm.selectedIndex](array);

    // Perform each swap visually
    for (let i = 0; i < swaps.length; i++) {
        if (swaps[i].firstPosition !== swaps[i].lastPosition) {
            await swapBars(barsDivs, swaps[i].firstPosition, swaps[i].lastPosition);
        }
    }
}

// ======================================
//  Event Listeners
// ======================================

// Generate new random bars when Generate button is clicked
generateBtn.addEventListener('click', () => {
    nBars = parseInt(numbersBars.value); // Update number of bars
    stage.style.width = `${nBars * 60}px`; // Adjust stage width
    start(); // Render new bars
});

// Start sorting visualization when Solve button is clicked
solveBtn.addEventListener('click', () => {
    solve();
});

// ======================================
//  Dark Mode Toggle
// ======================================
const themeSwitch = document.getElementById('themeSwitch');

// Load saved theme from localStorage
if (localStorage.getItem('theme') === 'dark') {
    document.body.classList.add('dark');
    themeSwitch.checked = true;
}

// Toggle theme on switch change
themeSwitch.addEventListener('change', () => {
    if (themeSwitch.checked) {
        document.body.classList.add('dark');
        localStorage.setItem('theme', 'dark'); // Save preference
    } else {
        document.body.classList.remove('dark');
        localStorage.setItem('theme', 'light'); // Save preference
    }
});
