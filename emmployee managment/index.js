const express = require('express');
const app = express();
const PORT = 5000;
const Router = require('./routes/routes');
const mongoose = require('mongoose')

mongoose.connect('mongodb://127.0.0.1:27017/company')
.then(()=>{
    console.log('Mongodb Connected Successfully')
}).catch((err)=>{
    console.log("mongo err",err)
})


app.use(express.urlencoded({extended : false}))

app.use('/api/employee',Router)

app.get('/',(req,res)=>{
    res.send('express server started')
})


app.listen(PORT,()=>{
    console.log(`server start at port ${PORT}`)
})