import React, { Component } from "react";
import { Link } from "react-router-dom";
import CallApi from "../../API/CallApi";
class AddForm extends Component {
  constructor(props) {
    super(props);
    this.state = {
      id: "",
      mssv: "",
      name: "",
      birthday: "",
      gender: "",
      gmail:" ",
      phone: "",
      address: "",
      sum_of_credits: 0,
      gpa: 0,
      status: "",
      khoa: "",
      nganh: "",
      lop: "",
    };
  }

  onChange = (event) => {
    var target = event.target;
    var name = target.name;
    var value = target.value;
    this.setState({
      [name]: value,
    });
  };

  onChangeKhoa = (event) => {
    const value = event.target.value;
    this.setState({
      khoa: value,
      nganh: "",
    });
  };

  onSubmit = (event) => {
    event.preventDefault();
    CallApi("create-student-account", "POST", {
        username: this.state.gmail,
        password: this.state.mssv,
        lop: this.state.lop,
    }).then((res) => {
      if(res.data.id != null){
        this.setState({
          id: res.data.id,
        },()=>{
          CallApi("student/create", "POST", {
            id: this.state.id,
            mssv: this.state.mssv,
            name: this.state.name,
            birthday: this.state.birthday,
            gender: this.state.gender,
            phone: this.state.phone,
            gmail: this.state.gmail,
            address: this.state.address,
            sum_of_credits: this.state.sum_of_credits,
            gpa: this.state.gpa,
            status: this.state.status,
            khoa: this.state.khoa,
            nganh: this.state.nganh,
            lop: this.state.lop,
          }).then(()=>{
            this.setState({
              mssv: "",
              id:"",
              name: "",
              birthday: "",
              gender: "",
              phone: "",
              address: "",
              sum_of_credits: "",
              gpa: "",
              status: "",
              khoa: "",
              nganh: "",
              lop: "",
            });
          });
        });
      }
  });
    alert("Đã thêm thành công");
  };

  render() {
    const khoaNganhList = [
      {
        khoa: "KHOA CƠ KHÍ",
        nganh: ["Kỹ thuật Cơ khí", "Công nghệ May", "Kỹ thuật Cơ điện tử", "Kỹ thuật Dệt", "Kỹ thuật Hệ thống Công nghiệp", "Logistics và Quản lý Chuỗi cung ứng", "Kỹ thuật Nhiệt"],
      },
      {
        khoa: "KHOA KỸ THUẬT ĐỊA CHẤT VÀ DẦU KHÍ",
        nganh: ["Kỹ thuật Địa chất", "Kỹ thuật Dầu khí", ],
      },
      {
        khoa: "ĐIỆN-ĐIỆN TỬ",
        nganh: ["Kỹ thuật Điều khiển và Tự động hóa", "Kỹ thuật Điện tử - Truyền thông", "Kỹ thuật Điện - Điện tử", "Song ngành: Kỹ thuật Điện tử - Viễn thông - Kỹ thuật Điện", "Song ngành: Kỹ thuật Điện tử - Viễn thông - Kỹ thuật Điều khiển và Tự động hóa", "Song ngành: Kỹ thuật Điện - Kỹ thuật Điện tử - Viễn thông", "Song ngành: Kỹ thuật Điện - Kỹ thuật Điều khiển và Tự động hóa", "Song ngành: Kỹ thuật Điều khiển và Tự động hóa - Kỹ thuật Điện tử - Viễn thông", "Song ngành: Kỹ thuật Điều khiển và Tự động hóa - Kỹ thuật Điện"]
      },
      {
        khoa: "KHOA KỸ THUẬT GIAO THÔNG",
        nganh: ["Kỹ thuật Hàng không", "Kỹ thuật Ô tô", "Kỹ thuật Tàu thủy", "Song ngành: Kỹ thuật Tàu thủy - Hàng không"]
      },
      {
        khoa: "KHOA KỸ THUẬT HÓA HỌC",
        nganh: ["Công nghệ Sinh học", "Kỹ thuật Hóa học", "Công nghệ Thực phẩm"]
      },
      {
        khoa: "KHOA MÔI TRƯỜNG VÀ TÀI NGUYÊN",
        nganh: ["	Kỹ thuật Môi trường", "Quản lý Tài nguyên và Môi trường"]
      },
      {
        khoa: "KHOA KHOA HỌC VÀ KỸ THUẬT MÁY TÍNH",
        nganh: ["Khoa học Máy tính", "Kỹ thuật máy tính", "Công nghệ Thông tin (Vừa Làm Vừa Học)"]
      }
    ];
    return (
      <div className="addForm">
        <div className="back">
          <Link to="/home/list-students" className="btn btn-danger">
            <span className="fa fa-arrow-left"></span> &nbsp; Quay lại
          </Link>
        </div>
        <div className="col-xs-5 col-sm-5 col-md-5 col-lg-5 center">
          <div className="panel panel-warning">
            <div className="panel-heading">
              <h3 className="panel-title">Thêm sinh viên</h3>
            </div>
            <div className="panel-body">
              <form onSubmit={this.onSubmit}>
                <div className="form-group">
                  <label>mssv: </label>
                  <input
                    type="text"
                    className="form-control"
                    required
                    name="mssv"
                    value={this.state.mssv}
                    onChange={this.onChange}
                  />
                  <label>Họ và tên: </label>
                  <input
                    type="text"
                    className="form-control"
                    required
                    name="name"
                    value={this.state.name}
                    onChange={this.onChange}
                  />
                  <label>Ngày sinh: </label>
                  <input
                    type="date"
                    className="form-control"
                    required
                    name="birthday"
                    value={this.state.birthday}
                    onChange={this.onChange}
                  />
                  <label>Giới tính:</label>
                  <select
                    className="form-control"
                    name="gender"
                    required
                    value={this.state.gender}
                    onChange={this.onChange}
                  >
                    <option>--Select--</option>
                    <option value="Nam">Nam</option>
                    <option value="Nữ">Nữ</option>
                  </select>
                  <label>Gmail:</label>
                  <input
                    type="email"
                    className="form-control"
                    required
                    name="gmail"
                    value={this.state.gmail}
                    onChange={this.onChange}
                  />
                  <label>Số điện thoại:</label>
                  <input
                    type="text"
                    className="form-control"
                    required
                    name="phone"
                    value={this.state.phone}
                    onChange={this.onChange}
                  />
                  <label>Địa chỉ: </label>
                  <input
                    type="text"
                    className="form-control"
                    name="address"
                    value={this.state.address}
                    onChange={this.onChange}
                  />
                  <label>Tổng số tín chỉ: </label>
                  <input
                    type="text"
                    className="form-control"
                    required
                    name="sum_of_credits"
                    value={this.state.sum_of_credits}
                    onChange={this.onChange}
                  />
                  <label>GPA: </label>
                  <input
                    type="text"
                    className="form-control"
                    required
                    name="gpa"
                    value={this.state.gpa}
                    onChange={this.onChange}
                  />
                  <label>Trạng thái: </label>
                  <select
                    className="form-control"
                    required
                    name="status"
                    value={this.state.status}
                    onChange={this.onChange}
                  >
                    <option>--Select--</option>
                    <option value="Không">Không </option>
                    <option value="Nguy cơ nghỉ học">Nguy cơ nghỉ học</option>
                    <option value="Cảnh báo học vụ">Cảnh báo học vụ</option>
                    <option value="Thiếu tín chỉ">Thiếu tín chỉ</option>
                    <option value="Thiếu học phí">Thiếu học phí</option>
                    <option value="Khen thưởng">Khen thưởng</option>
                  </select>{" "}
                  <div className="form-group">
                    <label>Khoa: </label>
                    <select
                      className="form-control"
                      name="khoa"
                      value={this.state.khoa}
                      onChange={this.onChangeKhoa}
                    >
                      <option value="">-- Chọn khoa --</option>
                      {khoaNganhList.map((item, index) => (
                        <option key={index} value={item.khoa}>{item.khoa}</option>
                      ))}
                    </select>
                  </div>
                  {this.state.khoa && (
                    <div className="form-group">
                      <label>Ngành: </label>
                      <select
                        className="form-control"
                        name="nganh"
                        value={this.state.nganh}
                        onChange={this.onChange}
                      >
                        <option value="">-- Chọn ngành --</option>
                        {khoaNganhList
                          .find((item) => item.khoa === this.state.khoa)
                          .nganh.map((nganh, index) => (
                            <option key={index} value={nganh}>{nganh}</option>
                          ))}
                      </select>
                    </div>
                  )}
                  <label>Lớp:</label>
                  <input
                    placeholder="vd: K64-CA-CLC-4"
                    type="text"
                    className="form-control"
                    required
                    name="lop"
                    value={this.state.lop}
                    onChange={this.onChange}
                  />
                  <br />
                  <div className="text_center">
                    <button
                      type="submit"
                      className="button submit btn btn-primary custom"
                      onClick={this.onSubmit}
                    >
                      <span className="fa fa-plus"></span> &nbsp;Lưu lại
                    </button>{" "}
                    &nbsp;
                    <Link
                      to="/home/list-students"
                      className="btn btn-danger"
                    >
                      <span className="fa fa-close"></span> &nbsp;Hủy bỏ
                    </Link>
                  </div>
                </div>
              </form>
            </div>
          </div>
        </div>
      </div>
    );
  }
}

export default AddForm;
