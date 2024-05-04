import React, { Component } from "react";
import CallApi from "../../API/CallApi";

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
        const { students, loading, error } = this.state;

        if (loading) {
            return <div>Loading...</div>;
        }

        if (error) {
            return <div>Error: {error.message}</div>;
        }

        return (
            <div>
                <h2>Danh sách sinh viên</h2>
                <table>
                    <thead>
                        <tr>
                            <th>STT</th>
                            <th>MSSV</th>
                            <th>Họ và Tên</th>
                            <th>Ngày Sinh</th>
                            <th>Giới Tính</th>
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
            </div>
        );
    }
}

export default InfoClassStudent;
