const mongoose = require('mongoose')

const userSchema = mongoose.Schema({
    userName:{type: String},
    password:{type:String},
    email:{type:String},
    phone:{type:String},
    address:{type:String},
    isNewsLetter:{type:Boolean,default:false}
    // product:[{type:mongoose.Schema.Types.ObjectId, ref: 'User'}]
})

module.exports =  mongoose.model('User', userSchema)