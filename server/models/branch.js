const mongoose = require('mongoose')

const branchSchema = mongoose.Schema({
    
    branchName:{type: String},
    address:{type:String},
    phone:{type:String},
    email:{type:String},
    lat:{type:String},
    lng:{type:String}
})

module.exports =  mongoose.model('Branch', branchSchema)