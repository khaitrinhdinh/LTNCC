import express from "express";
import mongoose from "mongoose";
import cors from "cors";
import loginRoute from "./routes/login.js";
import dotenv from "dotenv";
import Students from "./routes/student.js";
import Posts from "./routes/post.js";
import { createDocumentWithId, readCollection } from "./scripts/firestore.js";
const PORT = process.env.PORT || 5000;

dotenv.config();

const DB_URL = `mongodb+srv://${process.env.DB_USERNAME}:${process.env.DB_PASSWORD}@sinhvien.youwj.mongodb.net/student_management?retryWrites=true&w=majority`;
const app = express();

// const data = {
//   'Học kỳ': '221',
//   'Ngày cập nhật' : '20/03/2023 4:52:57 PM',
//   'Danh sách môn học':[
//     {
//       'MÃ MH': 'CO1005',
//       'TÊN MÔN HỌC': 'Nhập môn Điện toán',
//       'NHÓM-TỔ': 'L16-A',
//       'SỐ TC': 3,
//       'ĐIỂM THÀNH PHẦN': 'BT:10 BLT:10',
//       'ĐIỂM THI': 10,
//       'ĐIỂM TỔNG KẾT': 10
//     },
//     {
//       'MÃ MH': 'CO1023',
//       'TÊN MÔN HỌC': 'Hệ thống số',
//       'NHÓM-TỔ': 'L16-A',
//       'SỐ TC': 3,
//       'ĐIỂM THÀNH PHẦN': 'BT:10 BLT:10',
//       'ĐIỂM THI': 10,
//       'ĐIỂM TỔNG KẾT': 10
//     },
//     {
//       'MÃ MH': 'LA1001',
//       'TÊN MÔN HỌC': 'Anh văn Cơ bản',
//       'NHÓM-TỔ': 'L16-A',
//       'SỐ TC': 3,
//       'ĐIỂM THÀNH PHẦN': 'BT:10 BLT:10',
//       'ĐIỂM THI': 10,
//       'ĐIỂM TỔNG KẾT': 10
//     },
//     {
//       'MÃ MH': 'PH1003',
//       'TÊN MÔN HỌC': 'Vật lý 1',
//       'NHÓM-TỔ': 'L16-A',
//       'SỐ TC': 3,
//       'ĐIỂM THÀNH PHẦN': 'BT:10 BLT:10',
//       'ĐIỂM THI': 10,
//       'ĐIỂM TỔNG KẾT': 10
//     },
//   ],
// }
// const check = await createDocumentWithId( 'Students/GfdM5Tuv10bCVVKhKpJYqnort372/BANGDIEM','221', data);

// if( check.error){
//   console.log("error");
// }

app.use(cors());
app.use(express.json({ extended: true }));
app.use(express.urlencoded({ extended: true }));
mongoose
  .connect(DB_URL, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
    // useFindandModify: false
  })
  .catch((error) => console.log(error));

app.use("/", loginRoute);

app.use("/", Students);

app.use("/", Posts);

app.listen(PORT, () => console.log(`Server running on port ${PORT} `));
