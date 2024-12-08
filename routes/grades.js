const express = require("express");
const router = express.Router();
const Grade = require("../models/grade");

// http://localhost:5050/api/grades
router
  .route("/")
  .get(async (req, res) => {
    try {
      // allows for search through request query
      const courseName = req.query.courseName;
      if (courseName) {
        const foundGrade = await Grade.findOne({ course_name: courseName });
        res.redirect(
          `http://localhost:3000/api/grades/${foundGrade.course_name}`
        );
      } else {
        const foundGrades = await Grade.find({});
        res.render("grades/GradesView", { foundGrades });
      }
    } catch (error) {
      res.status(400).send(error);
    }
  })
  .post(async (req, res) => {
    req.body.passing = false;
    req.body.course_name =
      req.body.course_name.charAt(0).toUpperCase() +
      req.body.course_name.slice(1).toLowerCase();
    if (req.body.grade >= 65) {
      req.body.passing = true;
    }
    try {
      const createdGrade = await Grade.create(req.body);
      res.status(200).redirect("/api/grades");
    } catch (error) {
      res.status(400).send(error);
    }
  })
  .put(async (req, res) => {
    for (let i = 0; i < gradesData.length; i++) {
      if (req.body.course_name === gradesData[i].course_name) {
        gradesData[i].grade = req.body.grade;
        if (gradesData[i].grade >= 65) {
          gradesData[i].passing = true;
        } else {
          gradesData[i].passing = false;
        }
      }
    }
    res.redirect("http://localhost:3000/grades");
  });

// http://localhost:5050/api/grades/seed
router.get("/seed", async (req, res) => {
  try {
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
  } catch (err) {
    res.status(400).send(err);
  }
});

// http://localhost:5050/api/grades/modifyGrades
router.route("/modifyGrades").get((req, res) => {
  res.render("gradesViews/ModifyGrades", { gradesData });
});

// http://localhost:5050/api/grades/:courseName
router.route("/:courseName").get((req, res) => {
  const value = [];
  for (let i = 0; i < gradesData.length; i++) {
    if (
      req.params.courseName.toLowerCase() ===
      gradesData[i].course_name.toLowerCase()
    ) {
      value.push(gradesData[i]);
    }
  }
  res.render("gradesViews/GradesView", { value });
});

module.exports = router;
