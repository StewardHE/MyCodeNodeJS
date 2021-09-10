// car model 

// API Requires
const mongoose = require('mongoose')
const {companySchema} = require('./company')


// Cars Schema 
const carSchema = new mongoose.Schema({
        company:{
            type: companySchema,
            required: true

        },
  
    /* company:{
        type: mongoose.Schema.Types.ObjectId,
        ref: 'company' // connect the company collection with the model company.js 
   }, */
    model: String,
    sold: Boolean,
    price:{
        type: Number,
        required: function(){
            return this.sold
        }
    },
    year:{
        type: Number,
        min: 2000,
        max: 2030,
    },
    extras: [String],
    date: {type: Date, default: Date.now}
})

// Mongoose model

const Car = mongoose.model('car', carSchema)


// module export 
module.exports = Car