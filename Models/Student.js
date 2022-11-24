const mongoose = require("mongoose");

const Schema = mongoose.Schema;

const StudentSchema = new Schema(
  {
    name: String,
    physics: String,
    chemistry: String,
    maths: String,
    image: String,
  },
  {
    timestamps: true,
    toJSON: { getters: true, virtuals: true },
  }
);

const Student = mongoose.model("Student", StudentSchema);

module.exports = Student;
