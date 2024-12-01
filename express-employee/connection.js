import mongoose from 'mongoose';

async function connectMongoDB(url){
    mongoose.connect(url)
}


export default connectMongoDB
