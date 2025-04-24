const { Schema, model } = require("mongoose");
const mongoose = require("mongoose");

const bellSchema = new Schema({
    // bell_Date: {
    //     type: Date,
    //     required: true,
    //     // Custom setter to strip time
    //     set: (date) => new Date(date.setHours(0, 0, 0, 0))
    // },
    
    bell_Time: [{
        type: String,
        validate: {
            validator: v => /^\d{2}:\d{2}$/.test(v), // optional strict format check
            message: props => `${props.value} is not a valid time format (HH:mm)`
        }
    }],
    
    bell_Frequency: {
        type: String,
    },
    
    createdBy: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "users"
    },
    
}, { timestamps: true });

const Bell = model("Bell", bellSchema);
module.exports = Bell;