
const express = require('express') // load express
//const app = express() // app require express dependencie

const router = express.Router() // desviar desde la ruta / a este archivo
const { body, validationResult, check } = require('express-validator');

// array of cars
var cars = [
    {id: 0, company: 'BMW', model: 'X7', year: '2021'},
    {id: 1, company: 'AUDI', model: 'A3', year: '2021'},
    {id: 2, company: 'Mercedes', model: 'Clase A', year: '2021'},
    {id: 3, company: 'Hyundai', model: 'Galloper', year: '2021'},
    {id: 4, company: 'AUDI', model: 'S7', year: '2021'},
    {id: 5, company: 'Mercedes', model: 'Clase G', year: '2021'}
]

// cars routes
router.get('/list',(req, res)=>{ // rute using the get method
    res.send(['BMW X1', 'AUDI A3', 'Mercedes Clase A', 'Hyundai galloper', 'AUDI S7', 'Mercedes Clase G']) // send a aswer with this list of cars
})

router.get('/id/:id',(req, res)=>{ // rute using the get method
    res.send(req.params.id) // send a aswer with the request, params and id 
})

router.get(':company/:model',(req, res)=>{ // rute using the get method
    res.send(req.params) // send a aswer with the request, params and car company
   // res.send(req.params.model) // send a aswer with the request, params and car model 
})
 
router.get('/', (req, res)=>{ // rute with method get
    res.send(cars) // send the array autos 
})

// rute get for show the company of the car request 
router.get(':company', (req, res)=>{
    const car = cars.find(car => car.company === req.params.company) // cars.fin = find in cars array 

    // analyze if the requested car is registered
    if (!car) {
        res.status(404).send('We do not have a record of the requested car')
    }else{
        res.send(car)
    }
})

router.post('/', (req, res)=>{ // rute post 
    var carId = cars.length; // assign id in the form of not repeating
    var car = {
        id: carId,
        company: req.body.company,
        model: req.body.model,
        year: req.body.year
    }
    cars.push(car)
    res.status(201).send(car)
})

router.post('/2', (req, res)=>{ // rute post for check what user not send invalid data
    if (!req.body.company || req.body.company.length < 4) {
        
        res.status(201).send('Enter the correct company')
        return
    }
    var carId = cars.length; // assign id in the form of not repeating
    var car = {
        id: carId,
        company: req.body.company,
        model: req.body.model,
        year: req.body.year
    }
    cars.push(car)
    res.status(201).send(car)
})

router.post('/3', [
    check('company').isEmail(), // check company is email 
    check('model').isLength({ min: 5 }) // check the length of model
],(req, res)=>{ // rute post for check what user not send invalid data

    // Finds the validation errors in this request and wraps them in an object with handy functions
        const errors = validationResult(req);
            if (!errors.isEmpty()) {
             return res.status(400).json({ errors: errors.array() });
     }

    if (!req.body.company || req.body.company.length < 4) {
        
        res.status(201).send('Enter the correct company')
        return
    }
    var carId = cars.length; // assign id in the form of not repeating
    var car = {
        id: carId,
        company: req.body.company,
        model: req.body.model,
        year: req.body.year
    }
    cars.push(car)
    res.status(201).send(car)
})

router.put('/:id', [
    check('company').isEmail(), // check company is email 
    check('model').isLength({ min: 5 }) // check the length of model
],(req, res)=>{ // rute post for check what user not send invalid data

    // Finds the validation errors in this request and wraps them in an object with handy functions
        const errors = validationResult(req);
            if (!errors.isEmpty()) {
             return res.status(400).json({ errors: errors.array() });
     }

        const car = cars.find(cars=> car.id === parseInt(req.params.id)) // find in the cars array, the car id requested
 
        // If car id requerested not exist
        if (!car) {
            return res.send(404).send('This car id does not exist')
        }

        car.company = req.body.company
        car.model = req.body.model
        car.year = req.body.year

        res.status(201).send(car)
})

router.delete('/:id', (req, res)=>{
    const car = cars.find(cars=> car === parseInt(req.params.id)) // find in the cars array, the car id requested
 
        // If car id requerested not exist
        if (!car) {
            return res.send(404).send('This car id does not exist, not deleted');
        }

        const index = cars.indexOF(cars)
        cars.splice(index,1)
        res.status(200).send('deleted car')

})

// exports the file to use in other archive
module.exports = router