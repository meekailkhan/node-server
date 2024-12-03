const express = require('express');
const app = express();
const {connectionMongoDb} = require('./connection');
const {reqResLog} = require('./middlewares/index')

const PORT = 5000;
const Router = require('./routes/routes');

// connecting
connectionMongoDb("mongodb://127.0.0.1:27017/company")


app.use(express.urlencoded({extended : false}))

app.use(reqResLog("./log.txt"))


app.use('/api/employee',Router)

app.get('/',(req,res)=>{
    res.send('express server started')
})


app.listen(PORT,()=>{
    console.log(`server start at port ${PORT}`)
})