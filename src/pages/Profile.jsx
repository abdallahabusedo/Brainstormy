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
    console.log(this.state.agreeTerms);
    let target = e.target;
    let value = target.type === "checkbox" ? target.checked : target.value;
    let name = target.name;
    this.setState({
      [name]: value,
    });
  };
  componentDidMount = () => {
    let userId = localStorage.getItem("accessToken");
    axios.get(`http://localhost:2000/user?id=${userId}`).then((response) => {
      console.log(response.data[0].birthDate);
      this.setState({
        firstName: response.data[0].firstName,
        lastName: response.data[0].lastName,
        username: response.data[0].username,
        email: response.data[0].email,
        birthDate: response.data[0].birthDate,
        type: response.data[0].type,
      });
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
                    <h4 className="mb-2">Username</h4>
                    <h4 className="mb-2">instructor | student</h4>
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
        <button className="btn btn-warning btn-lg btn-block" type="button">
          edit | Save
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
          value={this.state.birthDate}
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
          value={this.state.email}
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
          value={this.state.username}
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
          value={this.state.lastName}
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
          value={this.state.firstName}
        />
      </div>
    );
  }
}

export default Profile;
