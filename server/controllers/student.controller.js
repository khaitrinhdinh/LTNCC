import Student from "../models/student.model.js";
import Users from "../models/user.model.js";
import xlsx from "xlsx";
import argon2 from "argon2";
import jwt from "jsonwebtoken";
import axios from "axios";
import { readDocument, readCollection, getListStudent, deleteStudentByMSSV, getStudentByMSSV } from "../scripts/firestore.js";
export const getAllStudent = async (req, res) => {
  try {
    const ListStudents = await getListStudent(req.params.lop);
    res.json({ success: true, ListStudents });
  } catch (error) {
    res
      .status(500)
      .json({ success: false, message: "Server error ~ getAllStudent" });
  }
};

export const updateStudent = async (req, res) => {
  try {
    console.log(req.body);
    const { name, birthday, gender, phone, address } = req.body;
    const updatedStudent = await Student.findByIdAndUpdate(
      { _id: req.params.id },
      { name, birthday, gender, phone, address }
    );
    if (updatedStudent) {
      res.json({ message: "Update successfully" });
    } else {
      res.json({ message: "Update fail" });
    }
  } catch (error) {
    res.status(500).json({ message: "Server error ~ updateStudent" });
  }
};

export const createStudent = async (req, res) => {
  try {
    const {
      msv,
      name,
      birthday,
      gender,
      phone,
      address,
      sum_of_credits,
      gpa,
      status,
      lop,
    } = req.body;

    const isExist = await Student.findOne({ msv });
    if (isExist) {
      return res
        .status(400)
        .json({ success: false, message: "Student already exist!" });
    }

    const newStudent = new Student({
      msv,
      name,
      birthday,
      gender,
      phone,
      address,
      sum_of_credits,
      gpa,
      status,
      lop,
    });
    await newStudent.save();
    console.log("Create successfully");
  } catch (error) {
    res.status(500).json({ message: "Server error ~ createStudent" });
  }
};

export const deleteStudent = async (req, res) => {
  // const userID = req.params.id;
  try {
    const deletedStudent = await deleteStudentByMSSV(req.params.mssv);
    if (deletedStudent) {
      res.json({ success: true, message: "Deleted successfully!" });
    } else {
      res.status(404).json({ success: false, message: "Deleted fail!" });
    }
  } catch (error) {
    res.status(500).json({ message: "Server error ~ deleteStudent" });
  }
};
export const importFromExcel = async (req, res) => {
  try {
    const wb = xlsx.readFile("./uploads/import.xlsx", { cellDates: true });
    const ws = wb.Sheets["Sheet1"];
    const dataStudent = xlsx.utils.sheet_to_json(ws);
    console.log(dataStudent);
    const dataUser = [];

    // for (let i = 0; i < dataStudent.length; i++) {
    //   dataUser.push({
    //     username: dataStudent[i].msv,
    //     password: await argon2.hash(dataStudent[i].msv.toString()),
    //     lop: dataStudent[i].lop,
    //   });
    // }

    for (let i = 0; i < dataStudent.length; i++) {
      dataUser[i] = new Users({
        username: dataStudent[i].msv,
        password: await argon2.hash(dataStudent[i].msv.toString()),
        lop: dataStudent[i].lop,
      });
      //await dataUser[i].save();
      jwt.sign({ userId: dataUser[i]._id }, process.env.ACCESS_TOKEN_SECRET);

      // axios.post(
      //   "https://api.chatengine.io/users/",
      //   {
      //     username: dataStudent[i].msv.toString(),
      //     secret: dataStudent[i].msv.toString(),
      //   },
      //   {
      //     headers: headers,
      //   }
      // );
    }
    //   console.log(dataUser);

    // const isCreatedUser = await Users.insertMany(dataUser);

    const isImported = await Student.insertMany(dataStudent);
    if (isImported) {
      res.send("Import successfully");
    } else {
      res.send("Import fail");
    }
  } catch (error) {
    res.status(500).json({ message: "Server error ~ importFromExcel" });
  }
};

export const getStudentDetail = async (req, res) => {
  try {
    const { data, error } = await readDocument('Students', req.params.id);
    if (error) {
      res.status(500).json({ success: false, message: "Server error ~ getStudentDetail" });
    } else if (data) {
      res.json({ studentData: data });
    } else {
      res.status(404).json({ success: false, message: "Student not found" });
    }
  } catch (error) {
    res.status(500).json({ success: false, message: "Server error ~ getStudentDetail" });
  }
};

export const transcriptStudent = async (req, res) => {
  try {
    const result = await readCollection('Students/GfdM5Tuv10bCVVKhKpJYqnort372/BANGDIEM');
    if (result.error) {
      return res.status(500).json({ success: false, message: "Server error ~ transcriptStudent" });
    }

    if (!result || result.length === 0) {
      return res.status(404).json({ success: false, message: "Transcripts not found" });
    }
    return res.json(result);
  } catch (error) {
    return res.status(500).json({ success: false, message: "Server error ~ transcriptStudent" });
  }
};

export const getStudentM = async(req, res) => {
  try {
    const data = await getStudentByMSSV(req.params.id);
    if (data.error) {
      res.status(500).json({ success: false, message: "Server error ~ getStudentDetail" });
    } else if (data) {
      res.json({ studentData: data });
    } else {
      res.status(404).json({ success: false, message: "Student not found" });
    }
  } catch (error) {
    res.status(500).json({ success: false, message: "Server error ~ getStudentDetail" });
  }
}