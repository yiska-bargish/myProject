const mongoose = require('mongoose')

const purchaseSchema = mongoose.Schema({
   
    productCode:{type: Number},
    branchCode:{type: Number},
    categoryCode:{type: Number},
    amount:{type: String},

})

module.exports =  mongoose.model('Purchase', purchaseSchema)