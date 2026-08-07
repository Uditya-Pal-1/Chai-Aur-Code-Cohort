const express = require('express')
const http = require('http')

const app = express();
app.get('/', (req, res) => res.end('Homepage'))
app.get('/contact-us', (req, res) => res.end('contact us page'))
app.get('/about-us', (req, res) => res.end('about us page'))

// middleware
// app.use(req, res, next) => { }

// function handlerFunction(req, res) {
//     // console.log("incoming req aaya")
// // middleware

//     switch(req.method) {
//         case "GET":
//             {
//                 if(req.url === '/') return res.end('Homepage')
//                 if(req.url === '/contact-us') return res.end('contact us page')
//                 if(req.url === '/about-us') return res.end('about us page')
//             }
//             break;
//             case'POST':
//             {

//             }
//             break;
//     }

//     // console.log(req.method)
//     // console.log(req.url)
//     // res.end('ye lo ji response')
// }

// const server = http.createServer(app)

app.listen(8000, function () {
    console.log("server started")
})

// http module
// can you create a basic express
// get and post
// req.method and req.url (node) | magical layer

// ex--
//const c = require('cohortjs')
//c.getCallPr('/', function(){})
//c.suno(8000).aurPhir(()=>console.log())