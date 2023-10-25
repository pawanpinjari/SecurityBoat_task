const mongoose = require('mongoose');
require('dotenv').config();

// const MONGO_URL = process.env.MONGO_URL;
// const DB_NAME = process.env.DB_NAME;
const MONGO_URL="mongodb+srv://pawanpinjari:pawan@cluster0.jq4fate.mongodb.net/"
mongoose.connect(MONGO_URL, {
    dbName: "mydb"
}).then(
    () => {
        console.log('Connected to database');
    }
).catch((err) => {
    console.log('Error connecting to database ' + err);
})
