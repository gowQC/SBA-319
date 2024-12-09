/**
 * NPM INSTALLATIONS:
 * npm install express
 * npm install nodemon
 * npm install jsx-view-engine
 * npm install method-override
 * npm install body-parser
 * npm install mongoose
 * npm install dotenv
 */

// initialize standard variables
const express = require("express");
const app = express();
const dotenv = require("dotenv");
dotenv.config();

// routes
const gradeRoutes = require("./routes/grades");
const taskRoutes = require("./routes/tasks");
const workoutRoutes = require("./routes/workouts");

// db connection, third party middlewares and port connection
const db = require("./db/conn");
const bodyParser = require("body-parser"); // npm install body-parser
const jsxViewEngine = require("jsx-view-engine"); // using jsx view engine for views, terminal installation command: npm i jsx-view-engine
const methodOverride = require("method-override"); // npm install method-override
const PORT = process.env.PORT || 5050;

// models
const Grade = require("./models/grade");
const Task = require("./models/task");
const Workout = require("./models/workout");

// views setup
app.set("view engine", "jsx");
app.set("views", "./views");
app.engine("jsx", jsxViewEngine());

// use and apply middleware
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json({ extended: true }));
app.use(methodOverride("_method"));
app.use(express.static("public/static"));

// setting time variable as let because it will eventually be reset when x amount of minutes pass
let dueTime = new Date();
dueTime.setMinutes(dueTime.getMinutes() + 5); // based off curent time, sets due time (5 minutes ahead in original example)

// my 2 pieces of custom middleware
app.use((req, res, next) => {
  const currentTime = new Date(); // grabs date at time of calling middleware
  const timeDiff = dueTime.getTime() - currentTime.getTime(); // difference in time
  if (timeDiff <= 0) {
    // hits due time or past due time - reset values and set another 10 minutes
    console.log(`It's a new day! Resetting values of all daily activities.`);

    // reset task data boolean, will have to implement
    // for (let i = 0; i < todoListData.length; i++) {
    //   todoListData[i].completed = false;
    // }

    // resets workout data boolean, will have to implement
    // for (let i = 0; i < workoutsData.length; i++) {
    //   workoutsData[i].currently_completed = 0;
    //   workoutsData[i].completed = false;
    // }

    dueTime = new Date();
    dueTime.setMinutes(dueTime.getMinutes() + 5);
  } else {
    const totalSeconds = Math.floor(timeDiff / 1000);
    const minutes = Math.floor(totalSeconds / 60);
    const seconds = totalSeconds % 60;
    console.log(
      `${
        minutes > 0 ? `${minutes} minute${minutes > 1 ? "s" : ""} and ` : ""
      }${seconds} second${
        seconds !== 1 ? "s" : ""
      } remaining to complete all activities.`
    );
  }
  next();
});

async function checkAll() {
  let myBoolean = true;
  // will implement checks to see if all completed/passing values are true
  // for (let i = 0; i < todoListData.length; i++) {
  //   if (todoListData[i].completed === false) {
  //     myBoolean = false;
  //   }
  // }
  // for (let i = 0; i < gradesData.length; i++) {
  //   if (gradesData[i].passing === false) {
  //     myBoolean = false;
  //   }
  // }
  // for (let i = 0; i < workoutsData.length; i++) {
  //   if (workoutsData[i].completed === false) {
  //     myBoolean = false;
  //   }
  // }
  return myBoolean;
}

app.use((req, res, next) => {
  const currentDate = new Date();
  console.log(
    `-----
        ${currentDate.toLocaleDateString()}: Received a ${
      req.method
    } request to ${req.url}.`
  );
  console.log(req.body);
  if (req.body && Object.keys(req.body).length > 0) {
    console.log(`Containing the data:`);
    console.log(`${JSON.stringify(req.body)}`);
  }
  if (checkAll()) {
    console.log(
      "Hooray! All grades are passing and all daily activites are done!"
    );
  } else {
    console.log("Not everything is complete, but keep trying!");
  }
  next();
});

// use and apply routes
app.use("/api/grades", gradeRoutes);
app.use("/api/tasks", taskRoutes);
app.use("/api/workouts", workoutRoutes);

app.get("/", (req, res) => {
  res.send(
    "The root. Basically our starting point. Try adding '/help' to the end of this URL..."
  );
});

app.get("/help", (req, res) => {
  res.render("Help");
});

// "/grades" render routes
app.get("/grades", async (req, res) => {
  try {
    const foundGrades = await Grade.find({});
    res.status(200).render("gradesViews/GradesView", { foundGrades });
  } catch (err) {
    res.send(err).status(400);
  }
});

app.get("/grades/modify", async (req, res) => {
  try {
    const foundGrades = await Grade.find({});
    res.render("gradesViews/ModifyGradesView", { foundGrades });
  } catch (err) {
    res.status(400).send(err);
  }
});

// "/tasks" render routes
app.get("/tasks", async (req, res) => {
  try {
    const foundTasks = await Task.find({});
    res.status(200).render("tasksViews/TasksView", { foundTasks });
  } catch (err) {
    res.send(err).status(400);
  }
});

app.get("/tasks/modify", async (req, res) => {
  try {
    const foundTasks = await Task.find({});
    res.render("tasksViews/ModifyTasksView", { foundTasks });
  } catch (err) {
    res.status(400).send(err);
  }
});

// "/workouts" render routes
app.get("/workouts", async (req, res) => {
  try {
    const foundWorkouts = await Workout.find({});
    res.status(200).render("workoutsViews/WorkoutsView", { foundWorkouts });
  } catch (err) {
    res.send(err).status(400);
  }
});

app.get("/workouts/modify", async (req, res) => {
  try {
    const foundWorkouts = await Workout.find({});
    res.render("workoutsViews/ModifyWorkoutsView", { foundWorkouts });
  } catch (err) {
    res.status(400).send(err);
  }
});

// error handling middleware
app.use((err, req, res, next) => {
  console.error(err.stack); // console error details
  res
    .status(err.status || 500)
    .json({ error: err.message || "Internal Server Error" });
});

app.use((req, res) => {
  console.log(
    "Error: This error only displays if all other routes were unable to respond."
  );
  res.status(404).json({ error: "Resource not found" });
});

app.listen(PORT, () => {
  console.log(`Listening on port: ${PORT}`);
});
