const sleep = async (ms) => {
    return new Promise(resolve => setTimeout(resolve, ms));//Adds a timeout (delay)
}
//Sleep function

export {
    sleep   
}
