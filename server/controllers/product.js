const mongoose = require('mongoose')
const Product = require('../models/product')
const sendEmail = require('./sendEmail')

const createProduct = async (req, res) => {
    console.log('createProduct!!!')
    const product = new Product(req.body);
    try {
        const newProduct = await product.save()
        res.status(200).json({ product: newProduct, message: "new product created succesfully" });
        sendEmail.emailToUsers('הודעה משמחת😁', 'מוצר חדש נוסף למערכת')
    } catch (err) {
        res.status(500).send(err.message);
    }
}

const getAllProducts = async (req, res) => {
    console.log('getAllProducts!!!')
    Product.find().then(p =>
        res.status(200).json({ products: p })
    ).catch(err => res.status(500).send(err.message))
}


const updateProduct = async (req, res) => {
    console.log('updateProduct!!!')
    Product.findByIdAndUpdate(req.body._id, req.body, { new: true })
        .then(product => res.status(200).send(product))
        .catch((err) => res.status(500).send(err.message))
}


const deleteProduct = async (req, res) => {
    console.log('deleteProduct!!!')
    Product.findByIdAndDelete(req.params.id)
        .then(p => {
            res.status(200).send(p)
        }).
        catch((err) => res.status(500).send(err.message))
}

module.exports = { createProduct, getAllProducts, updateProduct, deleteProduct }