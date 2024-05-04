import express from "express";

import {
  createTeacher,
  deleteTeacher,
  getAllTeacher,
  getTeacherDetail,
  updateTeacher,
} from "../controllers/teacher.controller.js";

const router = express.Router();


router.patch("/teacher/update/:id", updateTeacher);

router.post("/teacher/create", createTeacher);

router.delete("/teacher/delete/:id", deleteTeacher);

//Get 1 teacher by id
router.get("/teacher/:id", getTeacherDetail);

// Get all teachers in a class
router.get("/teacher", getAllTeacher);

export default router;
