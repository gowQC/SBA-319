const mongoose = require("mongoose");

const workoutSchema = new mongoose.Schema(
  {
    workout_name: { type: String, require: true, unique: true, dropDups: true },
    currently_completed: { type: Number, required: true, default: 0 },
    current_best: { type: Number, required: true },
    completed: { type: Boolean, required: true },
  },
  {
    timestamps: true,
  }
);

const Workout = mongoose.model("Workout", workoutSchema);

module.exports = Workout;