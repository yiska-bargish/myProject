const mongoose = require('mongoose')
const User = require('../models/user')
const sendEmail = require('./sendEmail')

const createUser = async(req, res) => {
    console.log('createUser!!!')
    const user = new User(req.body);
    try {
    const newUser = await user.save()
    sendEmail.sendEmail({body:{email:newUser.email,subject:'נרשמת בהצלחה לאתר הרמוניה לבית',text:"אנו שמחים שהצטרפת אלינו ומאחלים לך קניה מהנה:)"}})
    res.status(200).json({newUser:newUser,message:"new user created succesfully"});
    } catch(err){
    res.status(500).send(err.message);
    }
}

const getUser = async(req , res) =>{
    console.log('getUser!!!')
    try{
    const user = await  User.findById(req.params.id)
    if(user)
    res.status(200).json({user:user})
    else
    res.status(404).send("user not exist")
    }
    catch(error){
    res.status(500).send(error.message)
    }

}

const getUserByNameAndPassword = async(req , res) =>{
    console.log('getUserByNameAndPass!!!')
    try{
    const user = await  User.findOne({email:req.body.email,password:req.body.password})
    if(user)
    res.status(200).json({user:user})
    else
    res.status(404).send("user not exist")
    }
    catch(error){
    res.status(500).send(error.message)
    }

}

const updateUser = async(req,res)=>{
    console.log('updateUser!!!')
    User.findByIdAndUpdate(req.body._id, req.body)
    .then(user=>{
        if(user){
            if(req.body.isNewsLetter==true&&user.isNewsLetter==false)
            sendEmail({body:{email:user.email,subject:'נרשמת בהצלחה לקבלת עדכונים ומבצעים מאתר ארמוניה לבית',text:"אנו שמחיה שהצטרפת אלינו"}})
            res.status(200).json({user:user})
        }
        else
        res.status(404).send("user not exist")
    }).
    catch((err)=> res.status(500).send(err.message))
}

const deleteUser = async(req,res)=>{
    console.log('deleteUser!!!')
    User.findByIdAndDelete(req.params.id)
    .then(user=>{
        res.status(200).send("user deleted succesfully")
    }).
    catch((err)=> res.status(500).send(err.message))
}


module.exports = {createUser,getUser,updateUser,deleteUser,getUserByNameAndPassword}