// User loggin
// API requires
const mongosee = require('mongoose')
const bcrypt = require('bcrypt')
const express = require('express')
const User = require('../models/user')
const router = express.Router()
const { check, validationResult } = require('express-validator');

// User loggin
router.post('/', [
    check('email').isLength({min: 3}),
    check('password').isLength({min: 2})
],async(req, res)=>{
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
        return res.status(422).json({ errors: errors.array() });
    }
        // Check if the user exist in database
        let user = await User.findOne({email: req.body.email})
        if (!user) return res.status(400).send('Incorrect username or password')

        // compare the password 
        const validPassword = await bcrypt.compare(req.body.password, user.password)
        if(!validPassword) return res.status(400).send('Incorrect username or password')

        // Json Web Token 
        const jwtToken = user.generateJWT();
        
        // if user and password is correct, send this message:
        res.status(201).header('Authorization', jwtToken).send({
            _id: user._id,
            name: user.name,
            email: user.email,
        })
})

// export the module
module.exports = router 