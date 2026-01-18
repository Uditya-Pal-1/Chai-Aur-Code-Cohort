const obj1 = {
    fname: "Aman",
    lname: "Pal",
    get fullName(){
        function fullName(){
            return `${obj1.fname} ${obj1.lname}`
        }
        return fullName();
    }
};
const obj2 = {   //object2
    fname: "Uditya",
    lname: "Pal",
    get fullName(){  //get keyword is used to define a property. method is a function inside an object.
        function fullName(){ //function fullName is a method.
            return `${obj2.fname} ${obj2.lname}`;
        }
        return fullName();
    }
}
console.log(obj1)
console.log(obj2)
console.log(obj1.fullName)
console.log(obj2.fullName)

// In the above code have a problem is DRY(Don't Repeat Yourself) principle is not followed.