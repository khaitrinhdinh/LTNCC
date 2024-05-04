import React, { Component } from "react";
import { Link } from "react-router-dom";
import CallApi from "../../API/CallApi";
import styled from "styled-components";
import "../../index.css";


const Title = styled.h2`
text-align: center;
font-family: Verdana, Geneva, Tahoma, sans-serif;
text-shadow: 2px 7px 5px rgba(0, 0, 0, 0.3);
font-size: 5rem;
font-weight: bolder;
margin-top: 5%;
color: #1f692f;
`;
const Title_infor = styled.p`
  font-size: 2.5rem;
  width: 50%;
  margin: auto;
  padding: 20px;
  text-align: center;
  font-weight: bold;
  font-family: Verdana, Geneva, Tahoma, sans-serif;
 
`;
const Btn_site = styled.div`
  position: static;
  margin-top: 5vh;
  text-align: center;
`;
const Infor_site = styled.div`
  background-color: white;
  padding: 2rem;
  width: 100%;
  border-radius: 10px;
  background-color: whitesmoke;
`;
const Container = styled.div``;
class InfoCourse extends Component {
    constructor(props) {
        super(props);
        this.state = {
            expanded: false,
            expandedIndex: -1,
            scores: {},
            studentMSSVs: [],
        };
    }

    componentDidMount() {
        const { match } = this.props;
        const mamonhoc = match.params.mamonhoc;
        const lop = sessionStorage.getItem("selectedLop");
        const mssv = sessionStorage.getItem("mssv");
        console.log(lop);
        if (match) {
            CallApi(`student/class/${mamonhoc}/${lop}`, "GET", null).then((res) => {
                console.log(res.data);
                const studentScores = res.data.class.SINHVIEN[mssv];
                const studentMSSVs = Object.keys(res.data.class.SINHVIEN);
                this.setState({
                    scores: studentScores,
                    studentMSSVs: studentMSSVs,
                });
            });            
        }
    }

    toggleExpand = (index) => {
        this.setState((prevState) => ({
            expanded: !prevState.expanded,
            expandedIndex: index
        }));
    };

    render() {
        const { match } = this.props;
        const mamonhoc = match.params.mamonhoc;
        const lop = sessionStorage.getItem("selectedLop");
        const { expanded, expandedIndex, scores ,studentMSSVs} = this.state;
        console.log(studentMSSVs);

        return (
            <Container className="container">
                <Title>Thông tin chi tiết môn học</Title>
                <Title_infor>
                <p>Mã môn học: {mamonhoc}</p>
                <p>Lớp: {lop}</p>
                </Title_infor>
                <Infor_site>
               
                <hr style={{ width: "100%", marginTop: "20px", marginBottom: "20px" }} />
                {/* Phần danh sách sinh viên */}
                <div>
                <Link to={`/home/class/student/${mamonhoc}/${lop}`}>
                    <h3>Danh sách sinh viên</h3>
                </Link>
                <hr style={{ width: "100%", marginTop: "20px", marginBottom: "20px" }} />
                <div>
                    <div style={{ display: "flex", flexDirection: "row", alignItems: "center" }} onClick={() => this.toggleExpand(0)}>
                        <div style={{ width: "20px", height: "20px", border: "1px solid black", textAlign: "center", marginRight: "10px" }}>{expanded && expandedIndex === 0 ? "-" : ">"}</div>
                        <h3>Điểm số</h3>
                    </div>
                    {expanded && expandedIndex === 0 && (
                        <div style={{ width: "400px", height: "auto", backgroundColor: "lightgray", padding: "10px", border: "1px solid black" }}>
                            {/* Kiểm tra nếu scores không tồn tại hoặc không có dữ liệu */}
                            {!scores || Object.keys(scores).length === 0 ? (
                                <p>Không có điểm số.</p>
                            ) : (
                                /* Hiển thị danh sách điểm số từ state */
                                Object.entries(scores).map(([subject, score]) => (
                                    <p key={subject} style={{ marginBottom: "5px" }}>{subject}: {score}</p>
                                ))
                            )}
                        </div>
                    )}
                </div>
                </div>
              
                <hr style={{ width: "100%", marginTop: "20px", marginBottom: "20px" }} />
                <div>
                    <div style={{ display: "flex", flexDirection: "row", alignItems: "center" }} onClick={() => this.toggleExpand(1)}>
                        <div style={{ width: "20px", height: "20px", border: "1px solid black", textAlign: "center", marginRight: "10px" }}>{expanded && expandedIndex === 1 ? "-" : ">"}</div>
                        <h3>Thông báo</h3>
                    </div>
                    {expanded && expandedIndex === 1 && (
                        <div style={{ width: "200px", height: "100px", backgroundColor: "lightgray", padding: "10px", border: "1px solid black" }}>
                            {/* Nội dung thông báo */}
                        </div>
                    )}
                </div>
               
                <hr style={{ width: "100%", marginTop: "20px", marginBottom: "20px" }} />
                <div>
                    <div style={{ display: "flex", flexDirection: "row", alignItems: "center" }} onClick={() => this.toggleExpand(2)}>
                        <div style={{ width: "20px", height: "20px", border: "1px solid black", textAlign: "center", marginRight: "10px" }}>{expanded && expandedIndex === 2 ? "-" : ">"}</div>
                        <h3>Bài giảng</h3>
                    </div>
                    {expanded && expandedIndex === 2 && (
                        <div style={{ width: "200px", height: "100px", backgroundColor: "lightgray", padding: "10px", border: "1px solid black" }}>
                            {/* Nội dung bài giảng */}
                        </div>
                    )}
                </div>
                <hr style={{ width: "100%", marginTop: "20px", marginBottom: "20px" }} />
                <div>
                    <div style={{ display: "flex", flexDirection: "row", alignItems: "center" }} onClick={() => this.toggleExpand(3)}>
                        <div style={{ width: "20px", height: "20px", border: "1px solid black", textAlign: "center", marginRight: "10px" }}>{expanded && expandedIndex === 3 ? "-" : ">"}</div>
                        <h3>Tham khảo</h3>
                    </div>
                    {expanded && expandedIndex === 3 && (
                        <div style={{ width: "200px", height: "100px", backgroundColor: "lightgray", padding: "10px", border: "1px solid black" }}>
                            {/* Nội dung tham khảo */}
                        </div>
                    )}
                </div>
                </Infor_site>
            <Btn_site>
          <Link
            to='/home/manage-courses'
            className='goback btn btn-danger'
            style={{ marginRight: "20px" }}>
            <span className='fa fa-arrow-left'></span> &nbsp; Quay lại
          </Link>
        </Btn_site>
            </Container>
            
        );
    }
}

export default InfoCourse;
