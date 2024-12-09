const express = require("express");
const router = express.Router();
const Grade = require("../models/grade");

// http://localhost:5050/api/grades
router
  .route("/")
  .get(async (req, res) => {
    try {
      // allows for search through request query
      if (req.query.courseName) {
        const foundGrade = await Grade.findOne({
          course_name: req.query.courseName,
        });
        res.json(foundGrade);
      } else {
        const foundGrades = await Grade.find({});
        res.json(foundGrades);
      }
    } catch (error) {
      res.status(400).send(error);
    }
  })
  .post(async (req, res) => {
    req.body.passing = false; // creates third field called "passing" and defaults it to false
    req.body.course_name =
      req.body.course_name.charAt(0).toUpperCase() +
      req.body.course_name.slice(1).toLowerCase(); // capitalized first letter + leaves the rest
    if (req.body.grade >= 65) {
      req.body.passing = true; // sets passing to true based on expected grade field
    }
    try {
      const createdGrade = await Grade.create(req.body);
      res.status(200).redirect("/api/grades");
    } catch (error) {
      res.status(400).send(error);
    }
  })
  .put(async (req, res) => {
    req.body.passing = false; // creates third field called "passing" and defaults it to false
    if (req.body.grade >= 65) {
      req.body.passing = true; // sets passing to true based on expected grade field
    }
    const { course_name, grade, passing } = req.body;
    try {
      const updatedGrade = await Grade.findOneAndUpdate(
        { course_name },
        { grade, passing },
        { new: true }
      );
      data = [req.body];
      res.status(200).render("gradesViews/GradesView", { data });
      // res.redirect(`/api/grades/`);
    } catch (error) {
      res.status(400).send(error);
    }
  });

// http://localhost:5050/api/grades/seed
router.get("/seed", async (req, res) => {
  try {
    const count = await Grade.countDocuments({});
    // if not empty, then don't populate data
    if (count > 0) {
      res.status(200).redirect("/api/grades");
    } else {
      await Grade.create([
        {
          course_name: "Biology",
          grade: 75,
          passing: true,
        },
        {
          course_name: "Calculus",
          grade: 50,
          passing: false,
        },
        {
          course_name: "History",
          grade: 60,
          passing: false,
        },
      ]);
      res.status(200).redirect("/api/grades");
    }
  } catch (err) {
    res.status(400).send(err);
  }
});

// http://localhost:5050/api/grades/:courseName
router.get("/:courseName", async (req, res) => {
  try {
    const foundGrade = await Grade.findOne({
      course_name: req.params.courseName,
    });
    res.json(foundGrade);
  } catch (error) {
    res.status(400).send(error);
  }
});

module.exports = router;
