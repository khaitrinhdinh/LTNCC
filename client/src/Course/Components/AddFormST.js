import React, { Component } from "react";
import CallApi from "../../API/CallApi";

class AddStudentForm extends Component {
    constructor(props) {
        super(props);
        this.state = {
            name: "",
            mssv: "",
            lop: "",
            lopOptions: [],
            loading: true,
            error: null
        };
    }

    componentDidMount() {
        // Lấy dữ liệu về lớp từ sessionStorage
        const lopString = sessionStorage.getItem("selectedLop");
        const lopOptions = lopString ? lopString.split(",") : [];
        this.setState({ lopOptions, loading: false });
        const { match } = this.props;
        const mamonhoc = match.params.mamonhoc;
    }

    handleInputChange = (event) => {
        const { name, value } = event.target;
        this.setState({ [name]: value });
    };

    handleSubmit = (event) => {
        event.preventDefault();
        const { name, mssv, lop } = this.state;
        const { match } = this.props;
        const mamonhoc = match.params.mamonhoc;
    
        CallApi(`admin/getcourse/${mamonhoc}`)
        .then((response) => {
            const courses = response.data.data;
            let isDuplicateMssv = false;
            courses.forEach((course) => {
                if (course.SINHVIEN[mssv]) {
                    isDuplicateMssv = true;
                    return;
                }
            });

            if (isDuplicateMssv) {
                alert("Sinh viên đã tồn tại trong danh sách.");
                window.location.reload();
            } else {
                CallApi(`student/create-courses/${mssv}`, "POST", {
                    mamonhoc: mamonhoc,
                    lop: lop,
                }).then((res)=>{
                    CallApi(`admin/update-courseStudent/${mamonhoc}/${lop}`, "PATCH", {
                        [mssv]:{
                            LAB: 0,
                            BTL: 0,
                            GK: 0, 
                            CK: 0,
                        }
                    })
                })
                alert("Thêm sinh viên thành công!");
                window.location.reload();
            }
        })
        .catch((error) => {
            console.error("Error fetching course data:", error);
            this.setState({ error: error });
        });
    };    

    render() {
        const { name, mssv, lop, lopOptions, loading, error } = this.state;

        if (loading) {
            return <div>Loading...</div>;
        }

        if (error) {
            return <div>Error: {error.message}</div>;
        }

        return (
            <div>
                <h2>Thêm sinh viên</h2>
                <form onSubmit={this.handleSubmit}>
                    <div>
                        <label>Name:</label>
                        <input
                            type="text"
                            name="name"
                            value={name}
                            onChange={this.handleInputChange}
                            required
                        />
                    </div>
                    <div>
                        <label>MSSV:</label>
                        <input
                            type="text"
                            name="mssv"
                            value={mssv}
                            onChange={this.handleInputChange}
                            required
                        />
                    </div>
                    <div>
                        <label>Class:</label>
                        <select
                            name="lop"
                            value={lop}
                            onChange={this.handleInputChange}
                            required
                        >
                            <option value="">-- Select Class --</option>
                            {lopOptions.map((lopOption) => (
                                <option key={lopOption} value={lopOption}>
                                    {lopOption}
                                </option>
                            ))}
                        </select>
                    </div>
                    <button type="submit">Submit</button>
                </form>
            </div>
        );
    }
}

export default AddStudentForm;
