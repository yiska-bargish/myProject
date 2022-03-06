const mongoose = require('mongoose')
const Branch = require('../models/branch')

const createBranch = async (req, res) => {
    console.log('createBranch!!!')
    const b = new Branch(req.body);
    try {
        const nb = await b.save()
        res.status(200).send(nb)
    } catch (err) {
        res.status(500).send(err.message);
    }
}

const getAllBranch = (req, res) => {
    console.log("getAllBranch")
    Branch.find().then(c => {
        res.status(200).send(c)

    }).catch(err =>
        res.status(500).send(err.message))
}

const updateBranch = async (req, res) => {
    console.log('updateBranch!!!')
    Branch.findByIdAndUpdate(req.body._id, req.body, { new: true })
        .then(branch => {
            if (branch)
                res.status(200).json({ branch: branch })
            else
                res.status(404).send("branch not exist")
        }).
        catch((err) => res.status(500).send(err.message))
}

const deleteBranch = async (req, res) => {
    console.log('deleteBranch!!!')
    Branch.findByIdAndDelete(req.params.id)
        .then(branch => {
            res.status(200).send("branch deleted succesfully")
        }).
        catch((err) => res.status(500).send(err.message))
}

module.exports = { getAllBranch, createBranch, updateBranch, deleteBranch }