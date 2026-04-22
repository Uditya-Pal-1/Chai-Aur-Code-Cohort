function ptaNhi(fn, delay){


    let myId;
    return function(...args){
        clearTimeout(myId)
       myId = setTimeout(() => {
            fn.apply(this, args)
        }, delay);

    }
}
// call - jab hmare pass context na ho and hme function ko call krna ho tab ham call use krte hai
// bind - fn return krta hai
// apply - jab array or context ki baat ho rhe ho fn me


function greet(name){
    console.log(`Hello ${name}`)
}


const sachMeNiPta = ptaNhi(() => greet("Aman Pal"), 2000)
sachMeNiPta();
sachMeNiPta();
sachMeNiPta();
sachMeNiPta();
sachMeNiPta();