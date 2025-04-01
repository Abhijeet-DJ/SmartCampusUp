const {Schema, model} = require("mongoose");

const NotificationSchema = new Schema({
    Notification_Name : {
        type : String,
        required : true,
    },
    Notification_Time : {
        type : String,
        required : true,
    },
    Notification_data : {
        imgURL : {
            type : String,
        },
        text : {
            type : String,
        }
    },
    Notification_Date : {
        type : String,
        required : true,
    },
    Notification_priority : {
        type : String,
        required : true,
    },
    Notification_Day : {
        type : String,
        required : true,
    },
    
},{timestamps : true});

const Notification = model("Notification",NotificationSchema);

module.exports = Notification;