const mongoose = require('mongoose')
const Category = require('../models/category')
const sendEmail = require('./sendEmail')


const createCategory = async (req, res) => {
    console.log('createCategory!!!')
    const c = new Category(req.body);
    try {
        const newC = await c.save()
        res.status(200).json({ newCategory: newC, message: "new category created succesfully" });
        sendEmail.emailToUsers('חדש!!! חדש!!!',"נוספה קטגוריה חדשה")
    } catch (err) {
        res.status(500).send(err.message);
    }
}

const getAllcategories = async (req, res) => {
    console.log("getAllCategories")
    Category.find().then(c => {
        if (c)
            res.status(200).json({ categories: c })
        else
            res.status(404).send("no categories")
    }).catch(err =>
        res.status(500).send(err.message))
}

const updateCategory = async (req, res) => {
    console.log('updateCategory!!!')
    Category.findByIdAndUpdate(req.body._id, req.body, { new: true })
        .then(category => {
            if (category)
                res.status(200).json({ category: category })
            else
                res.status(404).send("category not exist")
        }).
        catch((err) => res.status(500).send(err.message))
}

const deleteCategory = async (req, res) => {
    console.log('deleteCategory!!!')
    Category.findByIdAndDelete(req.params.id)
        .then(category => {
            res.status(200).send("category deleted succesfully")
        }).
        catch((err) => res.status(500).send(err.message))
}

module.exports = { getAllcategories, createCategory, updateCategory, deleteCategory } 