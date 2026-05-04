function createCounter(stepSize = 1, initialValue = 0) {
    return function () {
        initialValue += stepSize;
        return initialValue;
    }
}

const i1 = createCounter(1, 1)

console.log(i1())
console.log(i1())
console.log(i1())
console.log(i1())
console.log(i1())

function debouncedVersion(fn, delay) {
    let timerId = null
    return function () {
        createTimeout(timerId)
        setTimeout(fn, delay)
    }
}

function apiCall(){}
const apiCallDebounce = debouncedVersion(apiCall, 5*1000)
apiCallDebounce()

function createInstance(){
    let store = {
        value:100,
    }
    return function(){
        console.log(store);
    }
}

const logger = createInstance()
logger();
logger();
logger();
logger();
logger();