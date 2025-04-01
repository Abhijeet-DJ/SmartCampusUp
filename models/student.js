const { Schema, model } = require("mongoose");

const studentSchema = new Schema({
    student_Name: {
        type: String,
        required: true,
    },
    student_Roll: {
        type: String,
        required: true,
    },
    student_Class: {
        type: String,
        required: true,
    },
    student_Section: {
        type: String,
        required: true
    },

    present: {
        type: Number,
        default: 0,
    }
}, { timestamps: true });

const Student = model("Student", studentSchema);

module.exports = Student;