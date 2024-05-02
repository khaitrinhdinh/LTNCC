import Teacher from "../models/teacher.model.js";
import { 
  readCollection, 
  readDocument,
  createDocumentWithId, 
} from "../scripts/firestore.js";
const headers = {
  "PRIVATE-KEY": "14bf1d3f-a86c-4b1b-ad74-9675722ee4f8",
};
export const getAllTeacher = async (req,res) => {
  try {
    const ListTeachers = await readCollection('Teachers');

    res.json({ success: true, ListTeachers });
  } catch (error) {
    res
      .status(500)
      .json({ success: false, message: "Server error ~ getAllTeacher" });
  }
};

export const updateTeacher = async (req, res) => {
  try {
    console.log(req.body);
    const { name, birthday, gender, phone, email, address } = req.body;
    const updatedTeacher = await Teacher.findByIdAndUpdate(
      { _id: req.params.id },
      { name, birthday, gender, phone, email, address }
    );
    if (updatedTeacher) {
      res.json({ message: "Update successfully" });
    } else {
      res.json({ message: "Update fail" });
    }
  } catch (error) {
    res.status(500).json({ message: "Server error ~ updateTeacher" });
  }
};

export const createTeacher = async (req, res) => {
  try {
    const { id, ...dataWithoutId } = req.body;
    const createTc = await createDocumentWithId(`Teachers`, id, dataWithoutId);
    res.json({message: "Create teacher successfull"});
  } catch (error) {
    res.status(500).json({ message: "Server error ~ createTeacher" });
  }
};

export const deleteTeacher = async (req, res) => {
  // const userID = req.params.id;
  try {
    const deletedTeacher = await Teacher.findOneAndDelete({
      _id: req.params.id,
    });
    if (deletedTeacher) {
      res.json({ success: true, message: "Deleted successfully!" });
    } else {
      res.status(404).json({ success: false, message: "Deleted fail!" });
    }
  } catch (error) {
    res.status(500).json({ message: "Server error ~ deleteTeacher" });
  }
};


export const getTeacherDetail = async (req, res) => {
  try {
    const { data, error } = await readDocument('Teachers', req.params.id);
    if (error) {
      res.status(500).json({ success: false, message: "Server error ~ getStudentDetail" });
    } else if (data) {
      res.json({ TeacherDetail : data });
    } else {
      res.status(404).json({ success: false, message: "Teacher not found" });
    }
  } catch (error) {
    res.status(500).json({ success: false, message: "Server error ~ getAdminDetail" });
  }
};
