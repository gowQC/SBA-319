const mongoose = require("mongoose");

const taskSchema = new mongoose.Schema(
  {
    task_number: { type: Number, require: true },
    description: { type: String, required: true },
    completed: { type: Boolean, required: true },
  },
  {
    timestamps: true,
  }
);

const Task = mongoose.model("Task", taskSchema);

module.exports = Task;
