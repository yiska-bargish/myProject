const mongoose = require('mongoose')
const Sale = require('../models/sale')
const sendEmail = require('./sendEmail')

const createSale = async (req, res) => {
    console.log('createSale!!!')
    const sale = new Sale(req.body);
    try {
        const newSale = await sale.save()
        res.status(200).json({ sale: newSale, message: "new sale created succesfully" });
        sendEmail.emailToUsers('הנחה מטורפת😁😁', 'בואו להנות ממבצעים משתלמים באתר')
    } catch (err) {
        res.status(500).send(err.message);
    }
}

const getAllSales = async (req, res) => {
    console.log('getAllSales!!!')
    Sale.find().then(s =>
        res.status(200).json({ sales: s })
    ).catch(err => res.status(500).send(err.message))
}

const getCurrentSales = async (req, res) => {
    console.log('getCurrentSales!!!')
    Sale.find().then(s => {
        const relevantSales = s.filter(sale => sale.startSaleDate <= new Date() && sale.endSaleDate >= new Date());
        res.status(200).send({ sales: relevantSales });
    }).catch(err => res.status(500).send(err.message))
}

const updateSale = async (req, res) => {
    console.log('updateSale!!!')
    Sale.findByIdAndUpdate(req.body._id, req.body, { new: true })
        .then(sale => {
            if (sale)
                res.status(200).json({ sale: sale })
            else
                res.status(404).send("sale not exist")
        }).
        catch((err) => res.status(500).send(err.message))
}

const deleteSale = async (req, res) => {
    console.log('deleteSale!!!')
    Sale.findByIdAndDelete(req.params.id)
        .then(sale => {
            res.status(200).send("sale deleted succesfully")
        }).
        catch((err) => res.status(500).send(err.message))
}

module.exports = { createSale, getAllSales, updateSale, deleteSale, getCurrentSales }