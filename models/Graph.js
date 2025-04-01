const { Schema, model } = require("mongoose");

const graphSchema = new Schema({
   y_axis: {
       type: [Number],
       required: true,
   }, 
   x_axis: {
       type: [String],
       required: true,
   },
   data: {
         type: [Number],
         required: true,
        }
}, { timestamps: true });

const Graph = model("Graph", graphSchema);

module.exports = Graph;