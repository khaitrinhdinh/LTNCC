import CallApi from "../API/CallApi";
import React, { useState, useEffect } from 'react';
import "./Chat.css";
export const Chat = () => {
  const [transcripts, setTranscripts] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const id = sessionStorage.getItem("userId");
        const response = await CallApi(`student/transtranscript/${id}`, "GET", null);
        response.data.forEach(transcript => {
          console.log(transcript);
      });
      setTranscripts(response.data);
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    };

    fetchData();
  }, []);
    // Tính số tín chỉ đăng ký học kỳ
    const totalCreditsRegistered = transcripts.reduce((acc, curr) => {
      return acc + curr['Danh sách môn học'].reduce((total, subject) => total + subject['SỐ TC'], 0);
    }, 0);

    // Tính số tín chỉ tích lũy học kỳ
    const totalCreditsEarnedSemester = transcripts.reduce((acc, curr) => {
      return acc + (curr['Điểm trung bình học kỳ'] > 3 ? curr['Danh sách môn học'].reduce((total, subject) => total + subject['SỐ TC'], 0) : 0);
    }, 0);

    // Tính số tín chỉ tích lũy
    const totalCreditsEarned = transcripts.reduce((acc, curr, index) => {
      let sum = 0;
      for (let i = 0; i <= index; i++) {
        sum += transcripts[i]['Danh sách môn học'].reduce((total, subject) => total + subject['SỐ TC'], 0);
      }
      return acc + sum;
    }, 0);
  
    // Tính điểm trung bình học kỳ
    const semesterGPASum = transcripts.reduce((acc, curr) => {
      let sum = 0;
      curr['Danh sách môn học'].forEach(subject => {
        sum += subject['ĐIỂM TỔNG KẾT'] * subject['SỐ TC'];
      });
      return acc + sum;
    }, 0);
  
    const totalCreditsSemester = transcripts.reduce((acc, curr) => {
      return acc + curr['Danh sách môn học'].reduce((sum, subject) => sum + subject['SỐ TC'], 0);
    }, 0);
  
      const semesterGPA = semesterGPASum / totalCreditsSemester;
  return (
    <div>
      {transcripts.map((transcript, index) => (
        <div key={index} className='Container'>
          <div className='text_center'>
            <h1 id='qlsv'>Bảng điểm sinh viên</h1>
          </div>
          <div className="border_div">
            <div className="center_div">
              <label className="lbHKy">Học kỳ {transcript['Học kỳ']}</label>
              <br></br>
              <label className="lbDateUpdate">Ngày cập nhật điểm các môn học: {transcript['Ngày cập nhật']}</label>
              <table className="tableBD">
                <thead>
                  <tr>
                    <th>MÃ MH</th>
                    <th>TÊN MÔN HỌC</th>
                    <th>NHÓM-TỔ</th>
                    <th>SỐ TC</th>
                    <th>ĐIỂM THÀNH PHẦN</th>
                    <th>ĐIỂM THI</th>
                    <th>ĐIỂM TỔNG KẾT</th>
                  </tr>
                </thead>
                <tbody>
                  {transcript['Danh sách môn học'].map((subject, index) => (
                    <tr key={index}>
                      <td>{subject['MÃ MH']}</td>
                      <td>{subject['TÊN MÔN HỌC']}</td>
                      <td>{subject['NHÓM-TỔ']}</td>
                      <td>{subject['SỐ TC']}</td>
                      <td>{subject['ĐIỂM THÀNH PHẦN']}</td>
                      <td>{subject['ĐIỂM THI']}</td>
                      <td>{subject['ĐIỂM TỔNG KẾT']}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
              <div className="sum_div">
                <label className="lbTKet">Số tín chỉ đăng ký học kỳ:</label><label className="lbTKet bold">{totalCreditsRegistered}</label><br/>
                <label className="lbTKet">Số tín chỉ tích lũy học kỳ:</label><label className="lbTKet bold">{totalCreditsEarnedSemester}</label><br/>
                <label className="lbTKet">Điểm trung bình học kỳ:</label><label className="lbTKet bold">{semesterGPA}</label><br/>
                <label className="lbTKet">Số tín chỉ tích lũy:</label><label className="lbTKet bold">{totalCreditsEarned}</label><br/>
                <label className="lbTKet">Điểm trung bình tích lũy:</label><label className="lbTKet bold">{semesterGPA}</label>
              </div>
            </div>
          </div>
        </div>
      ))}
    </div>
  );
};
