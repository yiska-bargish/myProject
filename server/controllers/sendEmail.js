const nodemailer = require("nodemailer");
const User = require('../models/user')

const emailToUsers = (subject,text)=>{
    console.log('emailToUsers')
    User.find({isNewsLetter:true})
    .then(users=>{
        users.forEach(u=>{
            sendEmail({body:{email:u.email,subject:subject,text:text}})

        })
    })
}

const sendEmail = async (req,res)=>{
    console.log(req)
    var transporter = nodemailer.createTransport({
        host: "smtp.gmail.com",
        service: 'gmail',
        auth: {
          user: process.env.EMAIL_USERNAME,
          pass: process.env.EMAIL_PASSWORD
        },
        tls: {
          rejectUnauthorized: false
        }
      });
      const mailOptions = {
        from : process.env.EMAIL_USERNAME,
        to: req.body.email,
        subject: req.body.subject,
        // attachments: filepath,
        text: req.body.text
      };
    
      transporter.sendMail(mailOptions, function (error, info) {
        if (error) {
          console.log(error);
        } else {
          console.log('Email sent: ' + info.response);
        }
      });
}
module.exports = {sendEmail,emailToUsers}

