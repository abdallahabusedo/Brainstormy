import React, { Component } from "react";
import Header from "../components/Header";
const axios = require("axios").default;

class Profile extends Component {
  constructor(props) {
    super(props);
    this.state = {
      firstName: "",
      lastName: "",
      username: "",
      email: "",
      birthDate: "",
      year: "",
      month: "",
      day: "",
      type: "",
      readOnly: true,
    };
  }
  handleChange = (e) => {
    let target = e.target;
    let value = target.type === "checkbox" ? target.checked : target.value;
    let name = target.name;
    this.setState({
      [name]: value,
    });
  };
  componentDidMount = () => {
    let id = localStorage.getItem("accessToken");
    let a = id == "" ? false : true;
    if (a) {
      let userId = localStorage.getItem("accessToken");
      axios.get(`http://localhost:2000/user?id=${userId}`).then((response) => {
        this.setState({
          firstName: response.data[0].firstName,
          lastName: response.data[0].lastName,
          username: response.data[0].username,
          email: response.data[0].email,
          birthDate: response.data[0].birthDate,
          type: response.data[0].type,
        });
        localStorage.setItem("type", response.data[0].type);
      });
    } else {
      window.location = "/signup";
    }
  };
  EditForm = () => {
    this.setState({ readOnly: false });
  };
  SubmitEdit = (e) => {
    e.preventDefault();
    let userId = localStorage.getItem("accessToken");
    const toUpdate = {
      firstName: this.state.firstName,
      lastName: this.state.lastName,
      username: this.state.username,
      email: this.state.email,
      birthDate: this.state.birthDate,
      type: this.state.type,
    };

    this.setState({ readOnly: true });
    /* todo: */
    axios
      .put(`http://localhost:2000/user/${userId}`, toUpdate)
      .then((response) => {
        console.log(response);
      })
      .catch((e) => {
        console.log("error edit", e);
      });
  };
  render() {
    return (
      <div>
        <Header />
        <section className="vh-100">
          <div className="container py-5 h-100">
            <div className="row d-flex justify-content-center align-items-center h-100">
              <div className="col-md-0 col-xl-8">
                <div className="card">
                  <div className="card-body text-center">
                    <div className="mt-0 mb-0">
                      <img
                        src="https://mdbcdn.b-cdn.net/img/Photos/new-templates/bootstrap-chat/ava2-bg.png"
                        className="rounded-circle img-fluid"
                      />
                    </div>
                    <h1 className="mb-2 mt-4"> {this.state.username} </h1>
                    <h4 className="mb-2"> {this.state.type} </h4>
                    {this.firstName()}
                    {this.lastName()}
                    {this.userName()}
                    {this.email()}
                    {this.password()}
                    {this.Submit()}
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>
      </div>
    );
  }

  Submit() {
    return (
      <div className="pt-1 mb-4">
        <button
          className={`${
            this.state.readOnly ? "" : "d-none"
          } btn btn-warning btn-lg btn-block`}
          type="button"
          onClick={this.EditForm}
        >
          Edit
        </button>
        <button
          className={`${
            this.state.readOnly ? "d-none" : ""
          } btn btn-warning btn-lg btn-block`}
          type="button"
          onClick={this.SubmitEdit}
        >
          Save
        </button>
      </div>
    );
  }

  password() {
    return (
      <div className="form-outline mb-4">
        <input
          type="date"
          id="form2Example27"
          className="form-control form-control-lg"
          readOnly={this.state.readOnly}
          defaultValue={this.state.birthDate}
          onChange={this.handleChange}
        />
      </div>
    );
  }

  email() {
    return (
      <div className="form-outline mb-4">
        <input
          type="email"
          id="form2Example17"
          className="form-control form-control-lg"
          readOnly={this.state.readOnly}
          placeholder="Email address"
          defaultValue={this.state.email}
          onChange={this.handleChange}
        />
      </div>
    );
  }

  userName() {
    return (
      <div className="form-outline mb-4">
        <input
          type="text"
          id="form2Example37"
          className="form-control form-control-lg"
          readOnly={this.state.readOnly}
          placeholder="User Name"
          defaultValue={this.state.username}
          onChange={this.handleChange}
        />
      </div>
    );
  }

  lastName() {
    return (
      <div className="form-outline mb-4">
        <input
          type="text"
          id="form2Example37"
          className="form-control form-control-lg"
          readOnly={this.state.readOnly}
          placeholder="Last Name"
          defaultValue={this.state.lastName}
          onChange={this.handleChange}
        />
      </div>
    );
  }

  firstName() {
    return (
      <div className="form-outline mb-4">
        <input
          type="text"
          id="form2Example37"
          className="form-control form-control-lg"
          placeholder="First Name"
          readOnly={this.state.readOnly}
          defaultValue={this.state.firstName}
          onChange={this.handleChange}
        />
      </div>
    );
  }
}

export default Profile;