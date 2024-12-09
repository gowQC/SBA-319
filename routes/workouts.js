const express = require("express");
const router = express.Router();
const Workout = require("../models/workout");

// http://localhost:5050/api/workouts
router
  .route("/")
  .get(async (req, res) => {
    try {
      // allows for search through request query
      if (req.query.workout_name) {
        const foundWorkout = await Workout.findOne({
          workout_name: req.query.workout_name,
        });
        res.json(foundWorkout);
      } else {
        const foundWorkouts = await Workout.find({});
        res.json(foundWorkouts);
      }
    } catch (error) {
      res.status(400).send(error);
    }
  })
  .post(async (req, res) => {
    req.body.completed = false; // creates third field called "passing" and defaults it to false
    req.body.workout_name =
      req.body.workout_name.charAt(0).toUpperCase() +
      req.body.workout_name.slice(1).toLowerCase(); // capitalized first letter + leaves the rest
    req.body.current_best = req.body.currently_completed;
    if (req.body.currently_completed > 0) req.body.completed = true;
    try {
      const createdWorkout = await Workout.create(req.body);
      res.status(200).redirect("/workouts");
    } catch (error) {
      res.status(400).send(error);
    }
  })
  .put(async (req, res) => {
    req.body.completed = false;
    if (req.body.currently_completed > 0) req.body.completed = true;
    try {
      const foundWorkout = await Workout.findOne({
        workout_name: req.body.workout_name,
      });
      if (req.body.currently_completed > foundWorkout.current_best) {
        req.body.current_best = req.body.currently_completed;
      } else req.body.current_best = foundWorkout.current_best;
      console.log("body:");
      console.log(req.body);
      const { workout_name, currently_completed, completed, current_best } =
        req.body;
      const updatedWorkout = await Workout.findOneAndUpdate(
        { workout_name },
        { currently_completed, current_best, completed },
        { new: true }
      );
      data = [req.body];
      res.status(200).render("workoutsViews/WorkoutsView", { data });
    } catch (error) {
      res.status(400).send(error);
    }
  })
  .delete(async (req, res) => {
    try {
      if (req.body.confirmedDeletion === "on") {
        const deletedWorkout = await Workout.findOneAndDelete({
          workout_name: req.body.workout_name,
        });
        res.status(200).redirect("/workouts");
      } else res.status(200).redirect("/workouts");
    } catch (error) {
      res.status(400).send(error);
    }
  });

// http://localhost:5050/api/workouts/seed
router.get("/seed", async (req, res) => {
  try {
    const count = await Workout.countDocuments({});
    // if not empty, then don't populate data
    if (count > 0) {
      res.status(200).redirect("/api/workouts");
    } else {
      await Workout.create([
        {
          workout_name: "Pushups",
          currently_completed: 0,
          current_best: 20,
          completed: false,
        },
        {
          workout_name: "Crunches",
          currently_completed: 0,
          current_best: 20,
          completed: false,
        },
        {
          workout_name: "Squats",
          currently_completed: 0,
          current_best: 20,
          completed: false,
        },
        {
          workout_name: "Pullups",
          currently_completed: 0,
          current_best: 20,
          completed: false,
        },
        {
          workout_name: "Chinups",
          currently_completed: 0,
          current_best: 20,
          completed: false,
        },
      ]);
      res.status(200).redirect("/api/workouts");
    }
  } catch (err) {
    res.status(400).send(err);
  }
});

module.exports = router;
