const { Schema,model } = require("mongoose");
const mongoose = require("mongoose")

const NPKSchema = new Schema({
    N_Val : {
        type : Number,
        required : true
    },
    P_Val : {
        type : Number,
        required : true
    },
    K_Val : {
        type : Number,
        required : true
    },
    createdBy : {
            type : mongoose.Schema.Types.ObjectId,
            ref : "users"
        },
    moistureLevel : {
        type : Number,
        required : true
    },
    soilTemperature : {
        type : Number,
        required : true
    },
    PH_Level : {
        type : Number,
        default : 7,
    },
    date : { 
        type : Date,
        default : 2025-1-1
    },
},
{timestamps : true});

const NPK = model("NPK",NPKSchema);

module.exports = NPK;