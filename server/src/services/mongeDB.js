const mongoose = require('mongoose');
require("dotenv").config();

const PASSWORD = process.env.MONGODB_PASSWORD;

const MONGO_URL = `mongodb+srv://amazon-clone-20:${PASSWORD}@amazon-clone.ezw7aua.mongodb.net/Users?retryWrites=true&w=majority`;

mongoose.set("strictQuery", false);

mongoose.connection.once('open', () => {
    console.log('MongoDB connection ready..!');
});

mongoose.connection.on('error', (err) => {
    console.log(err);
});

async function mongoConnect() {
    await mongoose.connect(MONGO_URL, {
        useNewUrlParser: true,
        useUnifiedTopology: true,
    });
};

async function mongoDisconnect() {
    await mongoose.disconnect();
};

module.exports = {
    mongoConnect,
    mongoDisconnect
}