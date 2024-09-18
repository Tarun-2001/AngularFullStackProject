const express = require("express");
const Student = require("../models/Student");
const router = express.Router();

router.get("/fetchStudents", async (req, res) => {
  try {
    const students = await Student.find({});
    res.json({ Message: "Student Data Feteched Successfully", students });
  } catch (error) {
    res.status(500).send("Error occured while fetching the students");
  }
});
router.post("/createStudent", async (req, res) => {
  try {
    const student = new Student({
      FirstName: req.body.FirstName,
      LastName: req.body.LastName,
      Email: req.body.Email,
      Gender: req.body.Gender,
      Contact: req.body.Contact,
    });
    await student.save();
    res.json({ Message: "Student Added Successfully", student });
  } catch (error) {
    res.status(500).send("Error occured while saving the student");
  }
});
router.put("/editStudent/:id", async (req, res) => {
  try {
    const student = await Student.findById(req.params.id);
    for (let key in req.body) {
      student[key] = req.body[key];
    }
    await student.save();
    res.json({ Message: "Student updated Successfully", student });
  } catch (error) {
    res.status(500).send("Error occured while updating the student");
  }
});
router.delete("/deleteStudent/:id", async (req, res) => {
  try {
    const student = await Student.findById(req.params.id);
    await student.deleteOne({ _id: req.params.id });
    res.json({ Message: "Student deleted Successfully", student });
  } catch (error) {
    res.status(500).send("Error occured while deleting the student");
  }
});
router.get("/searchStudent", async (req, res) => {
  try {
    const seachQuerey = req.query.name
      ? {
          $or: [
            { FirstName: { $regex: req.query.name, $options: "i" } },
            { LastName: { $regex: req.query.name, $options: "i" } },
          ],
        }
      : {};
    const students = await Student.find(seachQuerey)
    res.json({ Message: "Fetched Successfully", students });
  } catch (error) {
    res.status(500).send("Error occured while fetching the student");
  }
});

module.exports = router;
