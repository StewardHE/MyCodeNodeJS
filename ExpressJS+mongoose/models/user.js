// API requires
const mongoose = require('mongoose')
const jwt = require('jsonwebtoken')

// user schema 
const userSchema = new mongoose.Schema({
    name:{
        type: String,
        required: true,
    },
    isCustomer: Boolean,
    email: {
        type: String,
        required: true,
        unique: true
    },
    password:{
        type: String,
        required: true
    },
    isAdmin: Boolean,
    role: String,

    date: {type: Date, default: Date.now}
})

// function for generate JWT
userSchema.methods.generateJWT = function(){
    return jwt.sign({
        _id: this._id,
        name: this.name,
        role: this.role, // send the roll to the JWT 
        isAdmin: this.isAdmin
    }, "" + process.env.SECRET_KEY_JWT_CAR_API)
}

// User model
const User = mongoose.model('user', userSchema)

// export the module
module.exports = User