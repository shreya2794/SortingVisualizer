//Importing necessary functions
import { SortingAlgorithms } from "./helpers/sortingAlgorithms.js";
import { sleep } from "./helpers/util.js";

//Initial number of bars
let nBars = 12;

//Get input of number of elements
let numbersBars = document.getElementById('numbersBars');

const stage = document.getElementById('stage');
stage.style.width = `${nBars*60}px`;
//Width of the stage based on the number of bars

//Choosing the algorithm
const selectAlgorithm = document.getElementById('selectAlgorithm');

//Get reference to buttons
const generateBtn = document.getElementById('generateBtn');
const solveBtn = document.getElementById('solveBtn');

//Arrays to store the bar data and their corresponding div elements
let bars = []
let barsDivs = []

//Create an instance of SortingAlgorithms with an empty configuration
const sortingAlgorithms = new SortingAlgorithms({})

//Function to initialize and render the bars on the stage
const start = () => {
    stage.innerHTML = '' //Clear the stage
    
    //Generate array of random heights for the bars  
    bars = Array(nBars).fill(0).map( ()=> {
        return {
            width: 40,
            height: Math.floor(Math.random() * 350) + 1
        }
    })

    barsDivs = [];//Reset the array of bar divs

    //Create and style each bar div, then append it to the stage
    for (let i = 0; i < bars.length; i++) {
        const bar = document.createElement('div')
        bar.style.width = `${bars[i].width}px`
        bar.style.height = `${bars[i].height}px`
        bar.style.left = `${5 + i * 60}px`
        bars[i] = {...bars[i], position: i }
        bar.classList.add('bar')
        barsDivs.push(bar)
        stage.appendChild(bar)
    }
}

//Initial render of the bars on the stage
start()

//Swap two bars and animate the transition  
async function swapBars(barsDivs,i ,j){
    barsDivs[i].style.left = `${5+j*60}px`
    barsDivs[i].classList.add('activate')
    barsDivs[j].style.left = `${5+i*60}px`
    barsDivs[j].classList.add('activate')
    await sleep(300)
    barsDivs[i].classList.remove('activate')
    barsDivs[j].classList.remove('activate')
    let temp = barsDivs[i]
    barsDivs[i]=barsDivs[j]
    barsDivs[j]=temp  
}

//Array of sorting algorithms
const algorithms = [
    sortingAlgorithms.bubbleSort,
    sortingAlgorithms.insertionSort,
    sortingAlgorithms.selectionSort,
    sortingAlgorithms.quickSort,
    sortingAlgorithms.mergeSort
]

//Function to execute the selected sorting algorithm and visualize the sorting process
const solve = async () => {
    //Create a copy of the bar heights array
    const array = structuredClone(bars.map(el => el.height))

    //Get the swaps required to sort the array using the selected algorithm
    const swaps = algorithms[selectAlgorithm.selectedIndex](array)

    //Perform swaps with visual animation
    for (let i = 0; i < swaps.length; i++) {
        if (swaps[i].firstPosition !== swaps[i].lastPositon) {
            await swapBars(barsDivs, swaps[i].firstPosition, swaps[i].lastPosition)
        }
    }
}

//Event listener for generating new bar
generateBtn.addEventListener('click', () => {
    nBars = parseInt(numbersBars.value)//Input of number of elements
    stage.style.width = `${nBars * 60}px`//Adjust the width of the stage based on number of elements
    start()//Reinitialize the bars
})

//Event listener for solve button
solveBtn.addEventListener('click', () => {
    solve()
})

// Theme toggle
const themeSwitch = document.getElementById('themeSwitch');

// Load saved theme
if (localStorage.getItem('theme') === 'dark') {
    document.body.classList.add('dark');
    themeSwitch.checked = true;
}

themeSwitch.addEventListener('change', () => {
    if (themeSwitch.checked) {
        document.body.classList.add('dark');
        localStorage.setItem('theme', 'dark');
    } else {
        document.body.classList.remove('dark');
        localStorage.setItem('theme', 'light');
    }
});
