const mongoose = require('mongoose');
require('dotenv').config();

const connectDB = async () => {
    try {
        await mongoose.connect(process.env.MONGI_URI);
        console.log('Mongodb is connected');
    } catch (error) {
        console.log('Mongodb not connect')

    }

}

module.exports = connectDB;