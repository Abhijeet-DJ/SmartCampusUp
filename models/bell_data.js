const {Schema, model} = require("mongoose");
const mongoose = require("mongoose");

const bellSchema = new Schema({
    bell_Date : {
        type : Date,
    },
    
    bell_Time : [{
        type : String,
        format : "time",
    }],
    bell_Frequency : {
        type : String,
    },
    
    createdBy : {
        type : mongoose.Schema.Types.ObjectId,
        ref : "users"
    },
    
},{timestamps : true});

const Bell = model("Bell",bellSchema);

module.exports = Bell;