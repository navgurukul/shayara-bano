import React, { Component } from "react";
import axios from "axios";
import UploadSuccessSnackbar from "../UtilComponents/Snackbar";

export default class FilesUploadComponent extends Component {
  constructor(props) {
    super(props);

    this.state = {
      imgCollection: "",
      snackbarStatus: false,
    };
  }

  onFileChange = (e) => {
    this.setState({ imgCollection: e.target.files });
  };

  onSubmit = (e) => {
    e.preventDefault();
    var formData = new FormData();
    for (const key of Object.keys(this.state.imgCollection)) {
      formData.append("waImgCollection", this.state.imgCollection[key]);
    }
    axios
      .post("/whatsapp/upload", formData, {})
      .then((res) => {
        if (res.status === 200) {
          this.setState({
            snackbarStatus: true,
          });
        }
        console.log(res.data);
      })
      .catch((err) => {
        console.log(err);
      });
  };

  componentDidUpdate() {
    if (this.state.snackbarStatus) {
      setTimeout(() => {
        this.setState({ snackbarStatus: false });
      }, 2000);
    }
  }

  render() {
    return (
      <div className="container">
        <div className="row">
          <form onSubmit={this.onSubmit}>
            <div className="form-group">
              <input
                type="file"
                accept={this.props.fileType}
                name="imgCollection"
                onChange={this.onFileChange}
                multiple
              />
            </div>
            <div className="form-group">
              <button className="btn btn-primary" type="submit">
                Upload
              </button>
            </div>
          </form>
        </div>
        {this.state.snackbarStatus ? <UploadSuccessSnackbar /> : null}
      </div>
    );
  }
}
