import express from 'express';
import connectMongoDB from './connection.js';
import routes from './routes/routes.js'


const app = express();
const PORT = 4000;

connectMongoDB("mongodb://127.0.0.1:27017/nodejs")

app.use(express.urlencoded({extended : false}));

app.use('/api/users',routes)

app.listen(PORT,()=> console.log(`server start at : http://localhost:${PORT}/`))