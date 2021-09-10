// API Requires 
const mongoose = require('mongoose')

// Schema 
const saleSchema = new mongoose.Schema({
    user:{
        type: new mongoose.Schema({
            name: String,
            email: String
        }),
        required: true
    },
    car:{
        type: new mongoose.Schema({
            model: String
        }),
        require: true
    },
    price: Number,
    date: {type: Date, default:Date.now}
})

// create the mongoose model
const Sale = mongoose.model('sale', saleSchema)

// export the module
module.exports = Sale
