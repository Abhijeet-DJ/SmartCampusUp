const { Schema,model } = require("mongoose");

const bellStatusSchema = new Schema({
    Status : {
        type : Number,
        default : 0,
    }
},{timestamps : true});

const bellStatus = model("bellStatus",bellStatusSchema);

module.exports = bellStatus;