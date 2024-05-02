import express from "express";
import { upload } from "../midleware/upload.midleware.js";

import {
  createAdmin,
  deleteAdmin,
  getAllAdmin,
  getAdminDetail,
  updateAdmin,
} from "../controllers/admin.controller.js";
import multer from "multer";

const router = express.Router();


router.patch("/admin/update/:id", updateAdmin);

router.post("/admin/create", createAdmin);

router.delete("/admin/delete/:id", deleteAdmin);


router.get("/admin/:id", getAdminDetail);

router.get("/admin", getAllAdmin);

export default router;
