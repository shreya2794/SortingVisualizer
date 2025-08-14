//  sleep Function

// Purpose: Pause execution for a specified number of milliseconds
// Useful for animations to create a delay between steps

const sleep = async (ms) => {
    // Return a promise that resolves after 'ms' milliseconds
    return new Promise(resolve => setTimeout(resolve, ms));
}

// Export the sleep function for use in other modules
export {
    sleep
}
