import mongoose from "mongoose";
const Schema = mongoose.Schema;
const teacherSchema = new mongoose.Schema({
  ID: {
    type: String,
    required: true,
  },
  name: {
    type: String,
    required: true,
  },
  birthday: {
    type: Date,
    required: true,
  },
  gender: {
    type: String,
    enum: ["Nam", "Nữ"],
    default: "Nam",
    required: true,
  },
  phone: {
    type: String,
    required: true,
  },
  email: {
    type: String,
    required: true,
  },
  address: {
    type: String,
    required: true,
  },
  lop: {
    type: String,
    required: true,
  },
});
//export collection name 'student' storing student info
const Teacher = mongoose.model("teachers", teacherSchema);
export default Teacher;
