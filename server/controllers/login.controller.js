import Users from "../models/user.model.js";
import argon2 from "argon2";
import jwt from "jsonwebtoken";
import Student from "../models/student.model.js";
import { loginUser } from "../scripts/auth.js";
import {readDocument} from "../scripts/firestore.js"
// @Router: /login
// @desc: user login
// @access: public
export const login = async (req, res) => {
  const email = req.body.email;
  const password = req.body.password;

  try {
    // Gọi hàm loginUser từ firebaseAuth để thực hiện đăng nhập
    const loginResult = await loginUser(email, password);

    // Kiểm tra kết quả và trả về response tương ứng
    if (!loginResult.error) {
      const userDoc = await readDocument('Users',loginResult.data);
      if(!userDoc.error){
        const userRole = userDoc.data.role;
        if(userRole === "student"){
          const studentDoc = await readDocument('Students', loginResult.data);
          res.json({
            success: true,
            message: "User logged in successfully",
            userId: loginResult.data,
            role : userRole,
            lop : studentDoc.data.lop,
          });
        }else{
          const teacherDoc = await readDocument('Teachers', loginResult.data)
          res.json({
            success: true,
            message: "User logged in successfully",
            userId: loginResult.data,
            lop: teacherDoc.data.management,
            role : userRole,
          });
        }
      }
    } else {
      res.status(400).json({
        success: false,
        message: "Login failed",
        error: loginResult.data.message, // Lưu ý: Dữ liệu lỗi có thể khác nhau dựa vào cách Firebase Auth trả về
      });
    }
  } catch (error) {
    console.log(error);
    res.status(500).json({ success: false, message: "Internal server error" });
  }
};

// @Router: POST /create-student-account
// @desc: Teacher create new account for student
// @access: Only teacher can do
export const createStudentAccount = async (req, res) => {
  const { username, password, lop } = req.body;

  try {
    // Check for existing user
    const user = await Users.findOne({ username });

    if (user)
      return res
        .status(400)
        .json({ success: false, message: "Username already exist" });

    // If user is ok -> save to the db
    const hashedPassword = await argon2.hash(password);
    const newUser = new Users({
      username,
      password: hashedPassword,
      role: "student",
      lop: lop,
    });
    await newUser.save();

    // Return token
    const accessToken = jwt.sign(
      { userId: newUser._id },
      process.env.ACCESS_TOKEN_SECRET
    );

    res.json({
      success: true,
      message: "User created successfully",
      accessToken,
    });
  } catch (error) {
    console.log(error);
    res.status(500).json({ success: false, message: "Internal server error" });
  }
};

export const deleteStudentAccount = async (req, res) => {
  try {
    const acc = await Users.findOneAndDelete({ username: req.params.msv });
    if (acc) {
      res.json({ message: "Delete successfully" });
    } else {
      res.json({ message: "Delete fail" });
    }
  } catch (error) {
    res.status(500).json({ message: "Server error ~ deleteStudentAccount" });
  }
};

export const changePassword = async (req, res) => {
  try {
    const { username, old_pass, new_pass } = req.body;
    const user = await Users.findOne({
      username: username,
    });
    const verifiedPassword = await argon2.verify(user.password, old_pass);
    console.log(verifiedPassword);
    if (!verifiedPassword) {
      return res.json({ message: "Mật khẩu cũ không đúng" });
    } else {
      const UpdatedPassword = await Users.findOneAndUpdate(
        { username: username },
        { password: await argon2.hash(new_pass.toString()) }
      );
      if (UpdatedPassword) {
        res.json({ message: "Thay đổi mật khẩu thành công" });
      } else {
        res.json({ message: "Thay đổi mật khẩu thất bại" });
      }
    }
  } catch (error) {
    res.status(500).json({ message: "Server error ~ changePassword" });
  }
};
