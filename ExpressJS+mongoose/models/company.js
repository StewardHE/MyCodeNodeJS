// API requires
const mongoose = require('mongoose')

// company schema
const companySchema = new mongoose.Schema({
    name:{
        type: String,
        require: true,
        minlength: 1,
        maxlength: 99
    },
    country: String,
    date: {type:Date, default:Date.now}
})

// company model 
const Company = mongoose.model('company', companySchema)

// export the module
module.exports.Company = Company
module.exports.companySchema = companySchema