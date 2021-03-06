// API requires
const mongosee = require('mongoose')
const bcrypt = require('bcrypt')
const express = require('express')
const User = require('../models/user')

const router = express.Router()
const { check, validationResult } = require('express-validator');

// routes 
router.get('/', async(req, res)=> {
    const users = await User.find()
    res.send(users)
})

router.get('/:id', async(req, res)=>{
    const user = await User.findById(req.params.id)
    if(!user) return res.status(404).send('No hemos encontrado un usuario con ese ID')
    res.send(user)
})

// POST 
router.post('/', [
    check('name').isLength({min: 3}),
    check('email').isLength({min: 3}),
    check('password').isLength({min: 2})
],async(req, res)=>{
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
        return res.status(422).json({ errors: errors.array() });
    }

     // Analyze if the user already is registered
     let user = await User.findOne({email: req.body.email})
     if(user) return res.status(400).send('That user already is registered')


     // Encript user passwords 

    const salt = await bcrypt.genSalt(10)
    const hashPassword = await bcrypt.hash(req.body.password, salt)


        user = new User({
        name: req.body.name,
        email: req.body.email,
        password: hashPassword,
        isCustomer: false,
        isAdmin: false
    })

    // method for save the user 
    const result = await user.save()

    // Json Web Token 
    const jwtToken = user.generateJWT();

    res.status(201).header('Authorization', jwtToken).send({
        _id: user._id,
        name: user.name,
        email: user.email,
    })
})

router.put('/:id', [
    check('name').isLength({min: 3}),
    check('email').isLength({min: 3})
], async (req, res)=>{
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
        return res.status(422).json({ errors: errors.array() });
    }

    const user = await User.findByIdAndUpdate(req.params.id,{
        name: req.body.name,
        email: req.body.email,
        isCustomer: req.body.isCustomer
    },
    {
        new: true
    })

    if(!user){
        return res.status(404).send('The user with this ID does not exists')
    }
    
    res.status(204).send()
})

router.delete('/:id', async(req, res)=>{

    const user = await User.findByIdAndDelete(req.params.id)

    if(!user){
        return res.status(404).send('This car id does not exist, not deleted')
    }

    res.status(200).send('Deleted user')

})

// exports the module
module.exports = router