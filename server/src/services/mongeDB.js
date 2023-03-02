const mongoose = require('mongoose');
require("dotenv").config(
    // {path: path to file}
);

console.log(process.env.HOST);

const PASSWORD = process.env.PASSWORD;

const MONGO_URL = process.env.MONGO_URL;

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