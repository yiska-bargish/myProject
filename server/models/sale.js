const mongoose = require('mongoose')

const saleSchema = mongoose.Schema({
    
    productCode:{type: Number},
    description:{type:String},
    startSaleDate:{type: String},
    endSaleDate:{type: String}
})

module.exports =  mongoose.model('Sale', saleSchema)