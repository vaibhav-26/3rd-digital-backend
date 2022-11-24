var express = require("express");
var router = express.Router();

const { facebookLogin } = require("../Controllers/AuthController");
const StudentController = require("../Controllers/StudentController");
const auth = require("../Middleware/auth");
const uploadImage = require("../Middleware/studentImage");
/* GET home page. */

router.post("/facebook/login", facebookLogin);

router.post(
  "/student/add",
  auth,
  uploadImage.single("image"),
  StudentController.addStudent
);

router.put(
  "/student/edit/:id",
  auth,
  uploadImage.single("image"),
  StudentController.updateStudent
);

router.delete("/student/delete/:id", auth, StudentController.removeStudent);

router.get("/students", StudentController.getAllStudent);

module.exports = router;
