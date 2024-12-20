const mongoose = require("mongoose");

const gradeSchema = new mongoose.Schema(
  {
    course_name: { type: String, require: true, unique: true, dropDups: true },
    grade: { type: Number, required: true },
    passing: { type: Boolean, required: true },
  },
  {
    timestamps: true,
  }
);

// No indexes can optimize this Schema when used with the routes designed for it

const Grade = mongoose.model("Grade", gradeSchema);

module.exports = Grade;
