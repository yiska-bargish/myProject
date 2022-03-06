const mongoose = require('mongoose')
const Basket = require('../models/basket')
const Product = require('../models/product')

const createBasket = async (req, res) => {
    console.log('createBasket!!!')
    const b = new Basket(req.body);
    try {
        const nb = await b.save()
        let arr = []
        nb.products.forEach(async (element) => {
            const p = await Product.findById(element.productCode)
            await Product.findByIdAndUpdate(element.productCode, { count: p.count - element.amount })
        })
        res.status(200).send(nb)
    } catch (err) {
        res.status(500).send(err.message);
    }
}

const getAllBasket = (req, res) => {
    console.log("getAllBranch")
    Basket.find().then(c => {
        res.status(200).send(c)

    }).catch(err =>
        res.status(500).send(err.message))
}

const getBasketsByUserId = async (req, res) => {
    console.log("getBasketsByUserId")
    Basket.find({ userCode: req.params.id }).then(basket => {
        res.status(200).send(basket)
    }).catch(err =>
        res.status(500).send(err.message))
}


module.exports = { createBasket, getBasketsByUserId }