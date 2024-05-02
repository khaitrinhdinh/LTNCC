import express from "express";
import { upload } from "../midleware/upload.midleware.js";

import {
  createTeacher,
  deleteTeacher,
  getAllTeacher,
  getTeacherDetail,
  updateTeacher,
} from "../controllers/teacher.controller.js";
import multer from "multer";

const router = express.Router();


router.patch("/teacher/update/:id", updateTeacher);

router.post("/teacher/create", createTeacher);

router.delete("/teacher/delete/:id", deleteTeacher);

//Get 1 teacher by id
router.get("/teacher/:id", getTeacherDetail);

// Get all teachers in a class
router.get("/teacher", getAllTeacher);

export default router;
