const mongoose = require('mongoose')

const basketSchema = mongoose.Schema({
    basketDate:{type: Date,default:new Date()},
    userCode:{type:mongoose.Types.ObjectId,ref:'User'},
    products:{type:[{
        amount:{type: Number},
        productCode:{type:mongoose.Types.ObjectId,ref:'Product'},
    }]}
})

module.exports =  mongoose.model('Basket', basketSchema)
