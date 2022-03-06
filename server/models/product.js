const mongoose = require( 'mongoose')

const productSchema = mongoose.Schema({
    categoryCode:{type:mongoose.Types.ObjectId, ref:'Category'},
    productName:{type: String},
    description:{type:String},
    colors:{type:[{color:{type:String}}]},
    price:{type:String},
    img:{type:String},
    count:{type:Number,default:0}
})

module.exports =  mongoose.model('Product', productSchema) 