
// prototype of ForEach function
if(!Array.prototype.myForEach){
    Array.prototype.myForEach = function(cb){
        for(let i = 0; i < this.length; i++ ){
            cb(this[i], i)
        }
    }
}

const arr=[1,2,3,4,5]
arr.myForEach((value, index)=>
    console.log(`At Index ${index} value: ${value}`))

// prototype of myMap function
if(!Array.prototype.myMap){
    Array.prototype.myMap = function(cb){
        let result = []
        for(let i = 0; i<this.length; i++){
            const value = cb(this[i],i)
            result.push(value);
        }
        return result;
    }
}
 
const tripalArray = arr.myMap((e)=>e*3);
console.log(tripalArray)

// reduce function use
const res = arr.reduce((oldValue, currentValue)=> oldValue + currentValue)
console.log(res)

// prototype (polyfill) for reduce function

if(!Array.prototype.myReduce){
    Array.prototype.myReduce = function(cb){
        let acc = this[0]
        for(let i = 1; i < this.length; i++){
            acc = cb(acc, this[i])
        }
        return acc;
    }
}

const myRes = arr.myReduce((oldValue, currentValue)=> oldValue + currentValue)
console.log({res, myRes})