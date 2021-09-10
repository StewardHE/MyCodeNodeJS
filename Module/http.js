/* Module http Javascript 

const http = require('http'); // import http module

const server = http.createServer(); // create the module http

// this part turns on the server
server.on('connection', (Socket)=> {
     console.log('New connection detected')
})

server.listen(2012) // port listening in 2012
console.log('Escuchando en el puerto 2012');
*/

// Module http Javascript (option 2)

// const http = require("http"); // import http module
/*
const server = http.createServer((req, res)=>{ // create the module http
    if(req.url === '/'){ // if he accesses the home page
        res.write('Hi world');
        res.write('Hello world');
        res.end(); // end answers
    } 

    // if(req.url == '/coches'){ // if user write /coches in navegatior bar
     //   res.write('coche1'); // write coche1 in the html 
      //  res.end(); // end aswers
    }

// });

server.listen(3030);  // port listening in 3030
console.log('Escuchando en puerto 3030...'); // message
*/

// http module with html 

const http = require("http"); // import http module

const server = http.createServer((req, res)=>{ // creates the server with arrow function
    res.writeHead(200, {'content-Type': 'text/html'}); // define what content is html
    res.write('<h1>Hola mundo</h1>');
    res.write('<p>Hello world</p>');
    res.end(); 


}).listen(5050); // set the port 
