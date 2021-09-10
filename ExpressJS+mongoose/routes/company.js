// API requires
const express = require('express') 
const Car = require('../models/car')
const {Company} = require('../models/company') 
const router = express.Router() // desviar desde la ruta / a este archivo

// routes

 // ruta home 
router.get('/', async(req, res)=>{ // rute with method get
    const companies = await Company.find() // find in database and return all cars
    res.send(companies)
})

// find the request car with id 
router.get('/:id', async(req, res)=>{
    const company = await Company.findById(req.params.id)
    // check if company exist in database
    if(!company) return res.status(404).send('The request company does not exist in the database')
        res.send(company)
})

// route home
router.post('/',async(req, res)=>{

    // create the new company 
    const company = new Company({
       name: req.body.name,
       country: req.body.country
    })

     // method for save the company
    const result = await company.save()
    res.status(201).send(result)
})


router.put('/:id', async(req, res)=>{ 

    const company = await Company.findByIdAndUpdate(req.params.id,{
        name: req.body.name,
        country: req.body.country
        },
        {
            new: true
        }
        )
 
        // If company requerested not exist
        if (!company) {
            return res.send(404).send('This company does not exist')
        }

        res.status(204).send()
})

router.delete('/:id', async(req, res)=>{ 
   
    const Company = await Company.findByIdAndDelete(req.params.id) // find by id and delete the car 

        // If company requerested not exist
        if (!company) {
            return res.send(404).send('This company does not exist, not deleted');
        }

        res.status(200).send('deleted company')

})

// exports the file to use in other archive
module.exports = router
