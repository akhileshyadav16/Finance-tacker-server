const mongoose = require("mongoose");
require("dotenv").config();

const dbConnect = ()=>{
    mongoose.connect(process.env.DATABASE_URL)
    .then(()=>{
        console.log("DataBase connected successfully");
    })
    .catch((err)=>{
        console.log("DB connection failed");
        process.exit(1);
    })
}

module.exports = dbConnect;