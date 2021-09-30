// load requirements 
const mongoose = require('mongoose') // load mongoose 
const express = require('express') // load express
const Car = require('../models/car') // load the export module car
const {Company} = require('../models/company')

const Role = require('../helpers/role')
const authorize = require('../middleware/role')
const auth = require('../middleware/auth')

const router = express.Router() // desviar desde la ruta / a este archivo
const { body, validationResult, check } = require('express-validator'); // api requires express validator 


// cars routes

//list of cars 
router.get('/list',async(req, res)=> { // rute using the get method
   const cars = await Car.find() // find in database and return all cars
   res.send(cars)
})

 // ruta home 
router.get('/', [auth, authorize([Role.Admin, Role.User])], async(req, res)=>{ // authoriza cuales usuarios pueden ver los autos
    const cars = await Car
        .find() // find in database and return the requested car 
        .populate('company', 'name country') // shows to the user the company of cars instead of the id
    res.send(cars)
})

// find the request car with id 
router.get('/:id', async(req, res)=>{
    const car = await Car.findById(req.params.id)
    // if car exist in database
    if(!car) return res.status(404).send('The request car with this id does not exist in the database')
        res.send(car)
})

// Method POST for embedded Data model
router.post('/', [
    check('model').isLength({min: 3})
],async(req, res)=>{
     // Finds the validation errors in this request and wraps them in an object with handy functions
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
        return res.status(422).json({ errors: errors.array() });
    }
    
    const car = new Car({
        company: req.body.company,
        model: req.body.model,
        year: req.body.year,
        sold: req.body.sold,
        price: req.body.price,
        extras: req.body.extras
    })

     // method for save the car
    const result = await car.save()
    res.status(201).send(result)
})

/* Method POST for normalized Data Model 
router.post('/', [
    check('model').isLength({min: 3})
],async(req, res)=>{
     // Finds the validation errors in this request and wraps them in an object with handy functions
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
        return res.status(422).json({ errors: errors.array() });
    }

    const car = new Car({
        company: req.body.company,
        model: req.body.model,
        year: req.body.year,
        sold: req.body.sold,
        price: req.body.price,
        extras: req.body.extras
    })

     // method for save the car
    const result = await car.save()
    res.status(201).send(result)
})
*/

router.put('/:id', [
    check('company').isEmail(), // check company is email 
    check('model').isLength({ min: 5 }) // check the length of car model
], async(req, res)=>{ 

    // Finds the validation errors in this request and wraps them in an object with handy functions
        const errors = validationResult(req);
            if (!errors.isEmpty()) {
             return res.status(400).json({ errors: errors.array() });
     }

        const car = await Car.findByIdAndUpdate(req.params.id,{
            company: req.body.company,
            model: req.body.model,
            year: req.body.year,
            sold: req.body.sold,
            price: req.body.price,
            extras: req.body.extras
        },
        {
            new: true
        }
        )
 
        // If car requerested not exist
        if (!car) {
            return res.send(404).send('This car id does not exist')
        }

        res.status(201).send('Updated', car)
})

router.delete('/:id', async(req, res)=>{ 
   
    const car = await Car.findByIdAndDelete(req.params.id) // find by id and delete the car 

        // If car id requerested not exist
        if (!car) {
            return res.send(404).send('This car id does not exist, not deleted');
        }

        res.status(200).send('deleted car')

})

// exports the file to use in other archive
module.exports = router
