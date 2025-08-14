// ======================================
//  Comparison Constants
// ======================================
// Used to standardize comparison results across algorithms
const Compare = { 
    LESS_THAN: -1,  // Represents a < b
    BIGGER_THAN: 1  // Represents a > b
}

// ======================================
//  Default Compare Function
// ======================================
// Compares two values and returns -1, 0, or 1
const defaultCompare = (a, b) => {
    if (a === b) { 
        return 0; // a equals b
    }
    return a < b ? Compare.LESS_THAN : Compare.BIGGER_THAN;
}

// ======================================
//  Swaps Array
// ======================================
// Stores the sequence of swaps for visualization purposes
let swaps = [];

// ======================================
//  Partition Function for QuickSort
// ======================================
const partition = (array, left, right, compareFn) => {
    // Choose pivot element (middle of the current subarray)
    const pivot = array[Math.floor((right + left) / 2)];

    let i = left;  // Left pointer
    let j = right; // Right pointer

    // Partitioning loop
    while (i <= j) {

        // Move left pointer until an element >= pivot is found
        while (compareFn(array[i], pivot) === Compare.LESS_THAN) {
            i++;
        }

        // Move right pointer until an element <= pivot is found
        while (compareFn(array[j], pivot) === Compare.BIGGER_THAN) {
            j--;
        }

        // Swap elements if pointers haven't crossed
        if (i <= j) {
            let temp = array[i];
            array[i] = array[j];
            array[j] = temp;

            // Store the swap positions for animation
            swaps.push({ firstPosition: i, lastPosition: j });

            // Move pointers toward each other
            i++;
            j--;
        }
    }

    // Return the partition index
    return i;
}

// ======================================
//  QuickSort Recursive Function
// ======================================
const quicksort = (array, left, right, compareFn) => {
    let index;

    // Only sort if subarray has more than 1 element
    if (array.length > 1) {
        // Partition the array and get pivot index
        index = partition(array, left, right, compareFn);

        // Recursively sort left half
        if (left < index - 1) {
            quicksort(array, left, index - 1, compareFn);
        }

        // Recursively sort right half
        if (index < right) {
            quicksort(array, index, right, compareFn);
        }
    }

    return array; // Return sorted array (not strictly needed for visualization)
}

// ======================================
//  SortingAlgorithms Class
// ======================================
class SortingAlgorithms {

    // ==============================
    //  Bubble Sort
    // ==============================
    bubbleSort(array) {
        const swaps = []; // Store swaps for visualization

        // Outer loop: N-1 iterations
        for (let i = 0; i < array.length - 1; i++) {
            // Inner loop: compare adjacent elements
            for (let j = 0; j < array.length - i - 1; j++) {
                if (array[j] > array[j + 1]) {
                    // Swap if elements are in wrong order
                    let temp = array[j];
                    array[j] = array[j + 1];
                    array[j + 1] = temp;

                    // Record the swap
                    swaps.push({ firstPosition: j, lastPosition: j + 1 });
                }
            }
        }

        return swaps; // Return sequence of swaps
    }

    // ==============================
    //  Selection Sort
    // ==============================
    selectionSort(array) {
        const swaps = []; // Store swaps
        let min;

        // Outer loop: iterate through each element
        for (let i = 0; i < array.length - 1; i++) {
            min = i; // Assume current element is minimum

            // Find minimum element in the remaining unsorted array
            for (let j = i + 1; j < array.length; j++) {
                if (array[j] < array[min]) {
                    min = j;
                }
            }

            // Swap minimum element with current element
            let temp = array[min];
            array[min] = array[i];
            array[i] = temp;

            // Record the swap for visualization
            swaps.push({ firstPosition: min, lastPosition: i });
        }

        return swaps;
    }

    // ==============================
    //  Quick Sort
    // ==============================
    quickSort(array, compareFn = defaultCompare) {
        swaps = []; // Reset swaps array
        quicksort(array, 0, array.length - 1, compareFn);
        return swaps; // Return sequence of swaps
    }

    // ==============================
    //  Insertion Sort
    // ==============================
    insertionSort(array, compareFn = defaultCompare) {
        const swaps = []; // Store swaps

        for (let i = 1; i < array.length; i++) {
            const current = array[i]; // Current element to insert
            let j = i - 1;

            // Shift elements greater than current to the right
            while (j >= 0 && compareFn(array[j], current) === Compare.BIGGER_THAN) {
                array[j + 1] = array[j]; // Move element right
                swaps.push({ firstPosition: j, lastPosition: j + 1 }); // Record swap
                j--;
            }

            // Place current element in its correct position
            array[j + 1] = current;
        }

        return swaps;
    }
}

// ======================================
//  Export the class for external use
// ======================================
export { SortingAlgorithms }
