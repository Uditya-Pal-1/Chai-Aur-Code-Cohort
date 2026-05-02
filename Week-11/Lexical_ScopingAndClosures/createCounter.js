function createCounter(stepSize=1,initialValue = 0){
    return function(){
        initialValue+=stepSize;
        return initialValue;
    }
}

const i1 = createCounter(1,1)

console.log(i1())
console.log(i1())
console.log(i1())
console.log(i1())
console.log(i1())