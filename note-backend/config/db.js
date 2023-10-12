const mongoose = require('mongoose');

const connectDB = async () => {
    const url="mongodb+srv://utarora:mansha@cluster0.wmuj9.mongodb.net/notes?retryWrites=true&w=majority"
    try{
        const conn = await mongoose.connect(url,{
            useUnifiedTopology: true,
            useNewUrlParser: true
        });
        console.log(`MongoDB connected: ${conn.connection.host}`);
    }catch(error){
        console.error(`Error: ${error.message}`);
        process.exit();
    }
};

module.exports = connectDB;