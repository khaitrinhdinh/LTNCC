import { 
  readCollection, 
  readDocument,
  createDocumentWithId, 
  deleteDocument,
  updateDocument,
} from "../scripts/firestore.js";
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
    const { name, birthday, gender, phone, email, address } = req.body;
    const updatedTeacher = await updateDocument(`Teachers`, req.params.id, req.body);
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
    console.log(req.body);
    const { id, ...dataWithoutId } = req.body;
    const createTc = await createDocumentWithId(`Teachers`, id, dataWithoutId);
    res.json({message: "Create teacher successfull"});
  } catch (error) {
    res.status(500).json({ message: "Server error ~ createTeacher" });
  }
};

export const deleteTeacher = async (req, res) => {
  console.log(req.params.id);
  try { 
    const deleteTeacher = await deleteDocument('Teachers', req.params.id);
    if (deleteTeacher) {
      res.json({ success: true, message: "Deleted successfully!" });
    } else {
      res.status(404).json({ success: false, message: "Deleted fail!" });
    }
  } catch (error) {
    res.status(500).json({ message: "Server error ~ delete teacher" });
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
