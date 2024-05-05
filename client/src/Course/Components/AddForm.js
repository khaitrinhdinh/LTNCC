import React, { Component } from "react";
import { Link } from "react-router-dom";
import CallApi from "../../API/CallApi";

class AddForm4 extends Component {
    constructor(props) {
        super(props);
        this.state = {
            tenmonhoc: "",
            mamonhoc: "",
            lop: "",
        };
    }

    onChange = (event) => {
        console.log(event.target.value);
        this.setState({
            [event.target.name]: event.target.value
        });
    }

    onSubmit = async (event) => {
        const userId = sessionStorage.getItem("userId")
        console.log(userId);
        event.preventDefault();
        try{
            const resultCAPI  = CallApi(`admin/create-Course/${userId}`, "POST",{
                    tenmonhoc: this.state.tenmonhoc,
                    mamonhoc: this.state.mamonhoc,
                    lop: this.state.lop,
                })
            if(resultCAPI.status === 200){
                alert("Thêm giảng viên thành công!");
            }else{
                throw new Error("Failed to create course ");
            }
        }catch{
            
        }
    }

    render() {
        const { tenmonhoc, mamonhoc, lop } = this.state;
        return (
            <div>
                <h2>Thêm Môn Học</h2>
                <form onSubmit={this.onSubmit}>
                    <div>
                        <label>Tên Môn Học:</label>
                        <input type="text" name="tenmonhoc" value={tenmonhoc} onChange={this.onChange} />
                    </div>
                    <div>
                        <label>Mã Môn Học:</label>
                        <input type="text" name="mamonhoc" value={mamonhoc} onChange={this.onChange} />
                    </div>
                    <div>
                        <label>Lớp:</label>
                        <input type="text" name="lop" value={lop} onChange={this.onChange} />
                    </div>
                    <button type="submit">Submit</button>
                </form>
            </div>
        );
    }
}

export default AddForm4;
