const {Schema, model} = require("mongoose");
const mongoose = require("mongoose");

const eventSchema = new Schema({

    event_Name : {
        type : String,
    },
    bell_Date : {
            type : String,
            format : "date",
    },

    bell_StartTime :{
        type : String,
        format : "time",
    },
    bell_EndTime :  {
        type : String,
        format : "time",
    },
    createdBy : {
            type : mongoose.Schema.Types.ObjectId,
            ref : "users"
        },
},{timestamps : true});

const Event = model("Event",eventSchema);

module.exports = Event;