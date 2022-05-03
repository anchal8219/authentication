const express = require("express");
var app = express();
const dotenv = require('dotenv');
const mongoose = require('mongoose');
//import routes
const authRoute = require('./routes/auth');
const postRoute = require('./routes/posts');

dotenv.config();
mongoose.connect(process.env.DB_CONNECT,()=>{
    console.log('connected')
})
//middleware
app.use(express.json());


//routes middleware
app.use('/api/user',authRoute);
app.use('/api/posts', postRoute);


app.listen(200,()=>{
    console.log('listening')
})
