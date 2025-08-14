const Compare = { //Comparison constants to represent comparison results
    LESS_THAN: -1,
    BIGGER_THAN: 1
}

const defaultCompare = (a, b) => {//Comparison constants to represent comparison results
    if(a===b){// Returns 0 if a and b are equal
        return 0;
    }
    return a < b ? Compare.LESS_THAN : Compare.BIGGER_THAN // Returns -1 if a is less than b and return 1 if a is greater than b
}

let swaps = [] //Array to store the sequence of swaps

//Partition function to partition the array around a pivot
const partition = (array, left, right, compareFn) => {
    //Choose pivot as the middle of the array
    const pivot = array[Math.floor((right+left)/2)];

    let i = left; //Left pointer
    let j = right; //Right pointer

    //Partition the array
    while(i <= j){
        while(compareFn(array[i], pivot)===Compare.LESS_THAN){//Move left pointer until an element larger than pivot is found
            i++;
        }    
        while(compareFn(array[j], pivot)===Compare.BIGGER_THAN){//Move right pointer until an element smaller than pivot is found
            j--;
        }
        if(i <= j){ //If left pointer is less than right pointer, swap elements 
            let temp = array[i];
            array[i] = array[j];
            array[j] = temp;

            //Push the swap to the swaps array
            swaps.push({firstPosition: i,lastPosition: j}) 

            //Move the pointers towards each other
            i++;
            j--;
        }
    }
    return i; //Return the index where partioning ended
}

//Quicksort function to sort the array recursively
const quicksort = (array, left, right, compareFn) => {
    let index

    //If array has more than one element
    if(array.length > 1){
        //Partition the array around a pivot and get the index where partitioning ended
        index = partition(array, left, right, compareFn);

        //Recursively sort the two halves of the array
        if(left < index - 1){
            quicksort(array, left, index - 1, compareFn);
        }
        if(index < right){
            quicksort(array, index, right, compareFn);
        }
    }

    return array //Return the sorted array
}

class SortingAlgorithms {
    
    bubbleSort(array) { //(N-1) Iterations, putting ith largest element to its correct position in ith iteration
        const swaps = [];//Array to store the sequence of swaps
        for (let i = 0; i < array.length-1; i++) {

            //bool swap = false;  //To check if any swap occurs in the current iteration

            //Last i elements are already sorted
            for (let j = 0; j < array.length - i - 1; j++) {
                //Checking if the current element is greater than the next element
                if (array[j] > array[j + 1]) {
                    //If the condition is true then swap the elements and storing the sequence
                    //swap = true  //If swap occured
                    let temp = array[j];
                    array[j] = array[j + 1];
                    array[j + 1] = temp;

                    //Storing the sequence of swaps
                    swaps.push({ firstPosition: j, lastPosition: j + 1 });
                }
                
            }

            //if(swap===false) //Then break the loop as no swap occured in the previous iteration (Already sorted)
            
        }

        return swaps;
    }

    selectionSort(array){
        const swaps = []; //Array to store the sequence of swaps
        let min
        //N-1 iteration for N elements
        for (let i = 0; i < array.length - 1; i++) {
            min = i;//Assume current element is minimum

            //Finding index of the minimum element in remaining unsorted array
            for (let j = i+1; j < array.length; j++) {

                //If a smaller element is found update the minimum index
                if (array[j]<array[min]) {
                    min = j;
                }
            }

            //Swapping the minimum element with the fisrt element in unsorted portion 
            let temp = array[min]
            array[min] = array[i]
            array[i] = temp

            //Store the positions of elements that were swapped
            swaps.push({ firstPosition: min, lastPosition: i });
        }

        return swaps; //Return the sequence of swaps
    }

    quickSort(array, compareFn = defaultCompare) {
        swaps = [];
        quicksort(array,0,array.length-1,compareFn);
        return swaps;
    }

    insertionSort(array, compareFn = defaultCompare) {
        let swaps = []; // Array to store the sequence of swaps
        
        for (let i = 1; i < array.length; i++) {
            let current = array[i]; //Store the current element to be inserted
            let j = i - 1; //Start comparing the current element with previous element
            
            // Shift elements of array[0..i-1], that are greater than current,
            // to one position ahead of their current position
            while (j >= 0 && compareFn(array[j], current) === Compare.BIGGER_THAN) {
                array[j + 1] = array[j]; //Shift the element to the right
                swaps.push({ firstPosition: j, lastPosition: j + 1 }); //Store the swap
                j--; //Move to the previous element 
            }
            array[j + 1] = current; // Place the current element in its correct position 
        }
        
        return swaps;
    }

}

export {
    SortingAlgorithms
}
