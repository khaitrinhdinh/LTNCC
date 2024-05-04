import React, { Component } from "react";
import { Link } from "react-router-dom";
import CallApi from "../../API/CallApi";

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
            <div>
                <h2>Thông tin chi tiết môn học</h2>
                <p>Mã môn học: {mamonhoc}</p>
                <p>Lớp: {lop}</p>
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
                <hr style={{ width: "100%", marginTop: "20px", marginBottom: "20px" }} />
                {/* Phần danh sách sinh viên */}
                <div>
                <Link to={`/home/class/student/${mamonhoc}/${lop}`}>
                    <h3>Danh sách sinh viên</h3>
                </Link>

                </div>
                <hr style={{ width: "100%", marginTop: "20px", marginBottom: "20px" }} />
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
            </div>
            
        );
    }
}

export default InfoCourse;
