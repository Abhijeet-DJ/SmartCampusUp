const { Schema,model } = require("mongoose");

const pumpStatusSchema = new Schema({
    Status : {
        type : Number,
        default : 0,
    }
},{timestamps : true});

const pumpStatus = model("pumpStatus",pumpStatusSchema);

module.exports = pumpStatus;