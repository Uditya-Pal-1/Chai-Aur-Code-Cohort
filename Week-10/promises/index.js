const fs = require('fs')                     //       fs is a module it is use to read file.

console.log('starting Program')

// syncronous version
// const contents = fs.readFileSync('./hello.txt','utf-8');
// console.log("file reading successfully", contents)
// console.log("file reading successfully", content)


// asynchronous
// fs.readFile('./hello.txt','utf-8', function(err, content){
//     if(err){
//         console.log("Error in file",err)
//     }
//     else{
//         console.log('data is', content)
//     }
// });


//--------------legacy code---------------------
// async create hello.txt, reading, creating file, writing text on it, delete the original file.
// const content = " Lorem, ipsum dolor sit amet consectetur adipisicing elit. Sunt quis et reprehenderit? Provident aspernatur, maioresfuga numquam commodi autem nostrum iusto similique ab rem perferendis doloremque molestias labore illum eius ?Aspernatur dolorem illo illum officiis animi asperiores dignissimos doloremque magni deserunt quam perspiciatis cumquequod, omnis ducimus distinctio assumenda adipisci facilis deleniti ab ? Explicabo corporis, quisquam ut aspernaturmagni, aut ipsum, iste error iure illo reiciendis quo dolorum cumque assumenda pariatur cum eaque delectus minima.Laudantium numquam labore qui recusandae atque nobis sed exercitationem accusantium aperiam ? Explicabo at natusofficiis eaque praesentium, necessitatibus reiciendis esse ullam excepturi non sapiente.Aperiam expedita voluptatelaborum earum, itaque commodi deleniti, repellat repellendus, ipsum explicabo impedit modi quidem.Explicabo dolorvoluptas magnam ipsum consequuntur.Odit eaque, adipisci asperiores, at assumenda accusantium quo architecto verofacilis voluptates inventore quaerat doloribus totam laborum impedit cumque ? Ducimus adipisci veniam exercitationemratione, corporis tempore possimus qui odit.Tempora quae quidem, aliquid sunt porro nemo at dolore fugiat inventoredignissimos, ab voluptate doloremque dicta totam ? Rerum magnam sed alias, nesciunt voluptates, odit dolores assumendablanditiis laboriosam provident commodi nisi consectetur consequatur aliquid maiores dolore quisquam optio debitisomnis cumque corrupti, pariatur cum dicta! Ratione unde iusto deleniti ducimus temporibus aspernatur labore,"
// fs.writeFile("hello.txt", content, function (error) {
//     if (error) {
//         console.log("Error in file creation")
//     } else {
//         fs.readFile('./hello.txt', 'utf-8', function (err, content) {
//             if (err) {
//                 console.log("Error in file reading", err)
//             } else {
//                 console.log('File read successfully', content)
//                 fs.writeFile('backup.txt', content, function (err) {
//                     if (err) {
//                         console.log("Error in writing backup file", err)
//                     } else {
//                         setTimeout(() => {
//                             fs.unlink("./hello.txt", function (e) {
//                                 if (e) {
//                                     console.log("Error in deleting file", e);
//                                 } else {
//                                     console.log("file delete successfully")
//                                 }
//                             })
//                         }, 5000)
//                     }
//                 })
//             }
//         })

//     }
// });
// above code is callback hell . it is hard to maintain the code.

//  or

//-----------modern code--------------
// The equivalent code using promises is shown below.

// const content = " Lorem, ipsum dolor sit amet consectetur adipisicing elit. Sunt quis et reprehenderit? Provident aspernatur, maioresfuga numquam commodi autem nostrum iusto similique";
// const fsv2 = require('fs/promises')
// fsv2.writeFile("hello.txt",content)
// .then(()=>fsv2.readFile('./hello.txt', 'utf-8'))
// .then((content)=>fsv2.writeFile("backup.txt",content))
// .then(()=>setTimeout(()=>{fsv2.unlink('./hello.txt')},5000))
// .catch((e)=>console.log("Error",e))


// making custom promises  --- promisified version.

let contents = 'Lorem, ipsum dolor sit amet consectetur adipisicing elit. Sunt quis et reprehenderit? Provident aspernatur, maioresfuga numquam commodi autem nostrum iusto similique';

function createFileWithPromise(filepath, contents) {
    return new Promise((resolve, reject) => {
        fs.writeFile(filepath, contents, function (err) {
            if (err) {
                reject(err)
            } else {
                resolve(contents)
            }
        })
    })
}

function readFileWithPromise(filepath, encoding) {
    return new Promise((resolve, reject) => {
        fs.readFile(filepath, encoding, (err, content) => {
            if (err) {
                reject(err)
            } else {
                resolve(content); // user ke then function ko call kr do
            }
        })
    })
}

function writeFileWithPromise(filepath, content) {
    return new Promise((resolve, reject) => {
        fs.writeFile(filepath, content, function (err) {
            if (err) {
                reject(err)
            } else {
                resolve(content)
            }
        })
    })
}

function unlinkWithPromise(filepath) {
    return new Promise((resolve, reject) => {
        setTimeout(() => {
            fs.unlink(filepath, function (err) {
                if (err) {
                    reject(err);
                } else {
                    resolve()
                }
            })
        },5000)
    })
}

// multiple Async code is running in sync fashion.
createFileWithPromise('./hello.txt', contents)
    .then(content => readFileWithPromise('./hello.txt', 'utf-8'))
    .then(content => writeFileWithPromise("./backup.txt", content))
    .then(() => unlinkWithPromise('./hello.txt'))
    .catch(err => console.log("Error", err))
    .finally(() => console.log(("All Done")))




//----------------------------------- by using async await function
function wait(seconds){
    return new Promise((resolve, reject) => {
        setTimeout(() => resolve(), seconds * 1000)
    });
}

async function doTasks(){
    try{
    const fileContent = await readFileWithPromise('./hello.txt','utf-8');
    await writeFileWithPromise("./backup.txt", fileContent)
    await wait(10);
    await unlinkWithPromise('./hello.txt');
    }catch (e){
        console.log("Error",e)

    }finally {
        console.log("All Done")
    }
}
doTasks().then(() => console.log('All Done'));
console.log("end of program");