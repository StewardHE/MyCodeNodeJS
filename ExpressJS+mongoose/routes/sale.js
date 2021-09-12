// API Requires 
const express = require('express') 
const Sale = require('../models/sale')
const Car = require('../models/car')
const User = require('../models/user')
const router = express.Router() 
const mongoose = require('mongoose')
const auth = require('../middleware/auth') 

// Route home with the method GET 
router.get('/', async(req, res)=>{
    const sales = await Sale.find()
    res.send(sales)
})

// Route home with the method POST
router.post('/', auth, async(req, res)=>{
    const user = await User.findById(req.body.userId)
    // check if the requested user exist in database 
    if (!user) return res.status(400).send('that user does not exist in database')

    const car = await Car.findById(req.body.carId)
    // check if the car requisted exist in database 
    if (!car) return res.status(400).send('that car does not exist in database')

    // check if the car requested has already been sold
    if(car.sold === true) return res.status(400).send('that car has already been sold')

    // method to sell the car 
    const sale = new Sale({
        user:{
            _id: user._id,
            name: user.name,
            email: user.email
        },
        car:{
            _id: car._id,
            model: car.model
        },
        price: req.body.price
    })

    /* method for save the sale
    const result = await sale.save()

    // after user purchase a car, the user is Customer
    user.isCustomer = true
    user.save()
    car.sold = true 
    car.save()
    res.status(201).send(result) */

    // transactions
    const session = await mongoose.startSession()
    session.startTransaction()
    // method for save the sales
    try{
        const result = await sale.save()
        // after user purchase a car, the user is Customer
        user.isCustomer = true
        user.save()
        car.sold = true 
        car.save()
        await session.commitTransaction()
        session.endSession()
        res.status(201).send(result)
    }catch(e){
        await session.abortTransaction()
        session.endSession()
        res.status(500).send(e.message)
    }

}) 

// export with router
module.exports = router