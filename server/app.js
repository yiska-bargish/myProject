const express = require('express')
const app = express()
const bodyParser = require('body-parser')
const mongoose = require('mongoose')
const dotenv = require('dotenv')
dotenv.config()
const cors = require('cors')
const router = require('./routes/api')
const morgan = require('morgan');
const router2 = require('./routes/uploadImg')

app.use(cors()); // הפתרון היה למטה
                 // עדיף להשתמש באקסיוס ולא בפקט
app.use(bodyParser.json())
app.use('/',router)
app.use('/',router2)
app.use(morgan('dev'));
app.use("/uploads",express.static('uploads'));
app.use(express.urlencoded({ extended: false }));
app.use(bodyParser.urlencoded({ extended: false }));

const connectionParams = {
    useNewUrlParser: true,
    // useCreateIndex: true,
    useUnifiedTopology: true,
   //useFindAndModify : false
}

// mongoose.connect(process.env.DB_CONNECT, connectionParams)
// .then(()=>console.log('connect to db'))
// .catch(err=>console.log(err))

//Y9u8IKFgRPlSubdh  https://data.mongodb-api.com/app/data-ezvdm/endpoint/data/beta
mongoose.connect("mongodb://localhost:27017", connectionParams)
.then(()=>console.log('connect to db'))
.catch(err=>console.log(err))

app.listen(process.env.PORT , ()=>console.log(`listening port ${process.env.PORT}`))