const express = require('express') // load express
const app = express() // app require express dependencie

const PORT = process.env.PORT || 3003 // here, defined the port 

const car = require("./routes/cars") // load the file of routes
app.use(express.json()) // for express to parcel the json objects
app.use("/api/cars", car) // add /api/cars/ in the api

// rute home
app.get('/', function (req, res) { // creates the rute "/" and process the request of user and send a answer 
    res.send('Welcome to my cars store') // send this answer
})

// listen in port 3000
app.listen(PORT, () => {
    console.log('API Rest listening at localhost:' + PORT)
})