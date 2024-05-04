import React, { Component } from "react";
import CallApi from "../API/CallApi";
import { Link } from "react-router-dom";
import "./Course.css";

class Course extends Component {
    constructor(props) {
        super(props);
        this.state = {
            selectedHocki: "",
            selectedMonhocs: [],
            khoahoc: [],
        };
    }

    componentDidMount() {
        var id = sessionStorage.getItem("userId");
        CallApi(`student/allcourse/${id}`, "GET", null).then((res) => {
            if (res.data.listCourse != null) {
                this.setState({
                    khoahoc: res.data.listCourse,
                });
            } else {
                this.setState({
                    khoahoc: [],          
                });
            }
            console.log(this.state.khoahoc);
        });
    }

    onChange = (event) => {
        const selectedHocki = event.target.value;
        this.setState({ selectedHocki });
        const selectedMonhocs = this.state.khoahoc.find((item) => item.id === selectedHocki);
        this.setState({ selectedMonhocs });
    };

    handleMonHocClick = (monhoc) => {
        sessionStorage.setItem("selectedLop", monhoc.lop);
    };

    render() {
        const { selectedHocki, selectedMonhocs, khoahoc } = this.state;

        return (
            <div className='course-container'>
                <div className='text_center'>
                    <h1 id='qlmh'>Quản lí môn học</h1>
                </div>
                <div>
                    <label htmlFor="hockiSelect">Chọn học kì:</label>
                    <select
                        id="hockiSelect"
                        value={selectedHocki}
                        onChange={this.onChange}
                    >
                        <option value="">-- Chọn học kì --</option>
                        {khoahoc.map((hocki) => (
                            <option key={hocki.id} value={hocki.id}>
                                {hocki.id}
                            </option>
                        ))}
                    </select>
                </div>
                <div className="monhoc-container">
                    {selectedMonhocs.MONHOC &&
                        selectedMonhocs.MONHOC.map((monhoc) => (
                            <Link
                                key={monhoc.mamonhoc}
                                className="monhoc-item"
                                to={`/monhoc/${monhoc.mamonhoc}`}
                                onClick={() => this.handleMonHocClick(monhoc)}
                            >
                                <div className="monhoc-content">
                                    <p>{monhoc.mamonhoc}</p>
                                    <p>{monhoc.lop}</p>
                                </div>
                            </Link>
                        ))}
                </div>
            </div>
        );
    }
}

export default Course;
