const express = require("express");
const router = express.Router();
const Task = require("../models/task");

// http://localhost:5050/api/tasks
router
  .route("/")
  .get(async (req, res) => {
    try {
      // allows for search through request query
      if (req.query.task_number) {
        const foundTask = await Task.findOne({
          task_number: req.query.task_number,
        });
        res.json(foundTask);
      } else {
        const foundTasks = await Task.find({});
        res.json(foundTasks);
      }
    } catch (error) {
      res.status(400).send(error);
    }
  })
  .put(async (req, res) => {
    console.log("Here's the body:");
    console.log(req.body);
    if (req.body.completed === "on") {
      req.body.completed = true;
    } else {
      req.body.completed = false;
    }
    const { task_number, completed } = req.body;
    try {
      const updatedTask = await Task.findOneAndUpdate(
        { task_number },
        { completed },
        { new: true }
      );
      data = [updatedTask];
      res.status(200).render("tasksViews/TasksView", { data });
    } catch (error) {
      res.status(400).send(error);
    }
  });
// http://localhost:5050/api/tasks/seed
router.get("/seed", async (req, res) => {
  try {
    const count = await Task.countDocuments({});
    // if not empty, then don't populate data
    if (count > 0) {
      res.status(200).redirect("/api/tasks");
    } else {
      await Task.create([
        {
          task_number: 0,
          description: "Walk the dog",
          completed: false,
        },
        {
          task_number: 1,
          description: "Go shopping",
          completed: false,
        },
        {
          task_number: 2,
          description: "Clean the house",
          completed: false,
        },
        {
          task_number: 3,
          description: "Start dinner",
          completed: false,
        },
        {
          task_number: 4,
          description: "Finish assignments",
          completed: false,
        },
      ]);
      res.status(200).redirect("/api/tasks");
    }
  } catch (err) {
    res.status(400).send(err);
  }
});

// http://localhost:5050/tasks/:task_number
router.route("/:task_number").get(async (req, res) => {
  try {
    if (!isNaN(Number(req.params.task_number))) {
      const num = Number(req.params.task_number);
      const foundTask = await Task.findOne({
        task_number: num,
      });
      if (foundTask) {
        const value = [foundTask];
        res.render("tasksViews/TasksView", { value });
      } else {
        res.send("Request parameter is a number, but not a valid index.");
      }
    } else {
      res.send("Request parameter is not a number.");
    }
  } catch (error) {
    res.status(400).send(error);
  }
});

module.exports = router;
