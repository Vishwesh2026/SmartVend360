const mongoose = require('mongoose');
const { dbURL } = require('./config');

const connectToDatabase = async () => {
    try {
        await mongoose.connect(dbURL, {
            useNewUrlParser: true,
            useUnifiedTopology: true,
            useCreateIndex: true,
            useFindAndModify: false,
        });
        console.log('Connected to MongoDB');
    } catch (error) {
        console.error('Error connecting to MongoDB:', error.message);
        process.exit(1);
    }
};

module.exports = {
    connectToDatabase,
};
