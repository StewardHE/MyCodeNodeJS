// API requires
const mongoose = require('mongoose')
const bcrypt = require('bcrypt')

const express = require('express') // load express
const app = express() // app require express dependencie

const PORT = process.env.PORT || 3003 // here, defined the port 

// add files 
const car = require("./routes/cars") // load the file of routes
const user = require("./routes/user") // load the user file
const company = require("./routes/company") // load the company file 
const sale = require('./routes/sale') 
const auth = require('./routes/auth') // load the file of the user loggin

// add routes in the api 
app.use(express.json()) // for express to parcel the json objects
app.use("/api/cars", car) // add /api/cars/ in the api
app.use("/api/user/", user) // add /api/user/ in the api 
app.use("/api/company/", company) 
app.use("/api/sale/", sale) // add /api/sale/ in the api 
app.use("/api/auth/", auth) // add /api/auth/ in the api 

/* rute home
app.get('/', function (req, res) { // creates the rute "/" and process the request of user and send a answer 
    res.send('Welcome to my cars store') // send this answer
})*/

// listen in port 3000
app.listen(PORT, () => {
    console.log('API Rest listening at localhost:' + PORT)
})

// connect with the database mongoDB
mongoose.connect('mongodb://localhost/carsDB', { useNewUrlParser: true, useUnifiedTopology: true, useFindAndModify:false, useCreateIndex: true})
.then(()=> console.log('successfully connected to the database MongoDB'))
.catch(()=> console.log('error to connect with the database MongoDB')) // catch errors