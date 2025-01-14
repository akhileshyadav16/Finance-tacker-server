const mongoose = require("mongoose");

const financeSchema = new mongoose.Schema({
    title:{
        type:String,
        required:true,
        maxLength : 50
    },
    category:{
        type:String,
        required : true
    },
    amount:{
        type:Number,
        required:true
    },
    date:{
        type:Date,
        required:true,
        default : Date.now(),
    },
    user:{
        type: mongoose.Schema.Types.ObjectId,
        ref:"User"
    }
})

module.exports = mongoose.model("Finance",financeSchema);