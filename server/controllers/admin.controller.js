import { 
  readCollection,
  readDocument,
  deleteDocument,
  createDocumentWithId,
  createCollectionAtPath,
  updateDocument,
} from "../scripts/firestore.js";

export const getAllAdmin = async (req,res) => {
  try {
    const ListAdmins = await readCollection('Admins');

    res.json({ success: true, ListAdmins });
  } catch (error) {
    res
      .status(500)
      .json({ success: false, message: "Server error ~ getAllAdmin" });
  }
};


export const createAdmin = async (req, res) => {
  try {
    const { id, ...dataWithoutId } = req.body;
    console.log(id);
    const createAd = await createDocumentWithId(`Admins`, id, dataWithoutId);
    createCollectionAtPath(`Admins/${id}`, 'manage');
    res.json({message: "Create admin successfully!"});
    
  } catch (error) {
    res.status(500).json({ message: "Server error ~ createAdmin" });
  }
};
export const updateAdmin = async (req, res) => {
    try {
      console.log(req.body);
      const { name, birthday, phone, email, address } = req.body;
      const updatedAdmin = await updateDocument(`Admins`,req.params.id,req.body);
      if (!updatedAdmin.error) {
        res.json({ message: "Update successfully" });
      } else {
        res.json({ message: "Update fail" });
      }
    } catch (error) {
      res.status(500).json({ message: "Server error ~ updateAdmin" });
    }
  };

export const deleteAdmin = async (req, res) => {
  try { 
    const deletedAdmin = await deleteDocument('Admins', req.params.id);
    if (deletedAdmin) {
      res.json({ success: true, message: "Deleted successfully!" });
    } else {
      res.status(404).json({ success: false, message: "Deleted fail!" });
    }
  } catch (error) {
    res.status(500).json({ message: "Server error ~ deleteAdmin" });
  }
};

export const getAdminDetail = async (req, res) => {
  try {
    const { data, error } = await readDocument('Admins', req.params.id);
    if (error) {
      res.status(500).json({ success: false, message: "Server error ~ getStudentDetail" });
    } else if (data) {
      res.json({ AdminDetail : data });
    } else {
      res.status(404).json({ success: false, message: "Admin not found" });
    }
  } catch (error) {
    res.status(500).json({ success: false, message: "Server error ~ getAdminDetail" });
  }
};
