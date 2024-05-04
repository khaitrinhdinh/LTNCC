import express from "express";

import {
  createAdmin,
  deleteAdmin,
  getAllAdmin,
  getAdminDetail,
  updateAdmin,
} from "../controllers/admin.controller.js";


const router = express.Router();


router.patch("/admin/update/:id", updateAdmin);

router.post("/admin/create", createAdmin);

router.delete("/admin/delete/:id", deleteAdmin);


router.get("/admin/:id", getAdminDetail);

router.get("/admin", getAllAdmin);

export default router;
