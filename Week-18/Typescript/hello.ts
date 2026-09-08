let x = 30;
let y: number = 45;
let z: number = x+y;
console.log(z)

function add(a: number, b: number){
    return a + b;
}

let result = add(4,3)

function createUser(user: {firstname:string; lastname?:string}){
    user.firstname
    const trimmedlastname : string = user.lastname?.trim() || '';
}

createUser({
    firstname: 'uditya',
    lastname: 'pal',
})

interface User {
    firstName: string;
    lastName?: string;
    email:string;
    profileImageURL?: string;
}

function updateUser(user: User){
    // here we use all prop of User interface.
}