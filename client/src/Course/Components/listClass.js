import React, { Component } from "react";
import CallApi from "../../API/CallApi";
import styled from "styled-components";
import { Link } from "react-router-dom";
import "../Course.css";

const Title = styled.h2`
  text-align: center;
  font-family: Verdana, Geneva, Tahoma, sans-serif;
  text-shadow: 2px 7px 5px rgba(0, 0, 0, 0.3);
  font-size: 5rem;
  font-weight: bolder;
  margin-top: 5%;
  color: #1f692f;
`;
const Infor_site = styled.div`
  background-color: white;
  padding: 2rem;
  width: 100%;
  border-radius: 10px;
  background-color: whitesmoke;
`;
const Btn_site = styled.div`
  position: static;
  margin-top: 5vh;
  text-align: center;
`;
const Container = styled.div``;

class InfoClassStudent extends Component {
    constructor(props) {
        super(props);
        this.state = {
            students: [],
            loading: true,
            error: null
        };
    }
    
    componentDidMount() {
        const { match } = this.props;
        const { mamonhoc, lop } = match.params;

        CallApi(`student/class/${mamonhoc}/${lop}`, "GET", null)
            .then((res) => {
                const studentMSSVs = Object.keys(res.data.class.SINHVIEN);
                return Promise.all(
                    studentMSSVs.map((studentMSSV) =>
                        CallApi(`student/mssv/${studentMSSV}`, "GET", null)
                    )
                );
            })
            .then((responses) => {
                const students = responses.map((response) => response.data.studentData);
                this.setState({ students: students, loading: false });
            })
            .catch((error) => {
                console.error("Error fetching data:", error);
                this.setState({ error: error, loading: false });
            });
    }

    render() {
        const { students, index,  loading, error } = this.state;

        if (loading) {
            return <div>Loading...</div>;
        }

        if (error) {
            return <div>Error: {error.message}</div>;
        }

        return (
            <div className="Container">
                <Title>Danh sách sinh viên</Title>
                <Infor_site>
                <table className="table table-bordered table-hover">
                    <thead>
                        <tr>
                            <th >STT</th>
                            <th>MSSV</th>
                            <th >Họ và Tên</th>
                            <th >Ngày Sinh</th>
                            <th >Giới Tính</th>
                        </tr>
                    </thead>
                    <tbody>
                        {students.map((student, index) => (
                            <tr key={student.mssv}>
                                <td>{index + 1}</td>
                                <td>{student.mssv}</td>
                                <td>{student.name}</td>
                                <td>{student.birthday}</td>
                                <td>{student.gender}</td>
                            </tr>
                        ))}
                    </tbody>
                </table>
                </Infor_site>
         <Btn_site>
          <Link
            to='/home/manage-courses'
            className='goback btn btn-danger'
            style={{ marginRight: "20px" }}>
            <span className='fa fa-arrow-left'></span> &nbsp; Quay lại
          </Link>
        </Btn_site>
            </div>
        );
    }
}

export default InfoClassStudent;
