const mongoose = require('mongoose')

const product_unitSchema = mongoose.Schema({
    productCode:{type: Number},
    colorCode:{type: Number},
    status:{type: String}
})

module.exports =  mongoose.model('Product_unit', product_unitSchema)
