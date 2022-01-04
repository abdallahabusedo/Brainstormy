import React, { Component } from "react";
import Logo from "./../assets/logo.png";
import "./../style/signup.css";
import swal from "@sweetalert/with-react";
import axiosClient from "../common/client";

class Signup extends Component {
  constructor(props) {
    super(props);
    this.state = {
      firstName: "",
      lastName: "",
      username: "",
      email: "",
      password: "",
      birthdate: "",
      type: "",
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
  handleSubmit = (e) => {
    e.preventDefault();
    var data = JSON.stringify({
      username: this.state.username,
      first_name: this.state.firstName,
      last_name: this.state.lastName,
      email: this.state.email,
      password: this.state.password,
      birthdate: this.state.birthdate,
    });
    console.log(data);
    axiosClient.post('/register', data)
      .then(function (response) {
        console.log(JSON.stringify(response.data));
        window.location = "/login";
      })
      .catch(function (error) {
        console.log(error);
        swal({
          title: "Email or Username are incorrect",
          icon: "error",
        });
      });
  };
  componentDidMount = () => {
    let id = localStorage.getItem("accessToken");
    let a = id === "" ? false : true;
    if (a) {
      window.location = "/profile";
    }
  };
  render() {
    return (
      <div>
        <div className="container py-5 h-100">
          <div className="row d-flex justify-content-center align-items-center h-100">
            <div className="col col-xl-8 ">
              <div className="card">
                <div className="row g-0 ">
                  <div className=" d-none d-md-block " />
                  <div className=" align-items-center">
                    <div className="card-body p-4 p-lg-5 text-black ">
                      <form>
                        <div className="d-flex align-items-center  ">
                          <i className="fas fa-cubes "></i>
                          {this.LogoSection()}
                        </div>

                        <h3 className="fw-normal mt-5 pb-3">
                          Sign into your account
                        </h3>
                        {this.FirstName()}
                        {this.LastName()}
                        {this.UserName()}
                        {this.Email()}
                        {this.Password()}
                        {this.Date()}
                        {this.Submit()}
                        <p className="mb-5 pb-lg-2">
                          Do have an account?
                          <a href="/Login"> Log In here</a>
                        </p>
                      </form>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }

  Submit() {
    return (
      <div className="pt-1 mb-4">
        <button
          className="btn btn-warning btn-lg btn-block"
          type="submit"
          name="submit"
          onClick={this.handleSubmit}
        >
          Register
        </button>
      </div>
    );
  }

  Date() {
    return (
      <div className="form-outline mb-4">
        <input
          type="date"
          id="form2Example27"
          className="form-control form-control-lg"
          onChange={this.handleChange}
          name="birthdate"
          required
        />
      </div>
    );
  }

  UserType() {
    return (
      <div className="form-outline mb-4">
        <select
          className="form-select"
          onChange={this.handleChange}
          aria-label="Default select example"
          required
          name="type"
        >
          <option defaultValue>Pick your User Type</option>
          <option value="Instructor">Instructor</option>
          <option value="Student">Student</option>
        </select>
      </div>
    );
  }

  Password() {
    return (
      <div className="form-outline mb-4">
        <input
          type="password"
          id="form2Example27"
          className="form-control form-control-lg"
          placeholder="Password"
          onChange={this.handleChange}
          required
          name="password"
        />
      </div>
    );
  }

  Email() {
    return (
      <div className="form-outline mb-4">
        <input
          type="email"
          id="form2Example17"
          className="form-control form-control-lg"
          placeholder="Email address"
          onChange={this.handleChange}
          required
          name="email"
        />
      </div>
    );
  }

  UserName() {
    return (
      <div className="form-outline mb-4">
        <input
          type="text"
          id="form2Example37"
          className="form-control form-control-lg"
          placeholder="User Name"
          onChange={this.handleChange}
          required
          name="username"
        />
      </div>
    );
  }

  LastName() {
    return (
      <div className="form-outline mb-4">
        <input
          type="text"
          id="form2Example37"
          className="form-control form-control-lg"
          placeholder="Last Name"
          onChange={this.handleChange}
          required
          name="lastName"
        />
      </div>
    );
  }

  FirstName() {
    return (
      <div className="form-outline mb-4">
        <input
          type="text"
          id="form2Example37"
          className="form-control form-control-lg"
          placeholder="First Name"
          name="firstName"
          required
          onChange={this.handleChange}
        />
      </div>
    );
  }

  LogoSection() {
    return (
      <div className="h1 fw-bold">
        <img
          src={Logo}
          alt=""
          width="80"
          height="70"
          onChange={this.handleChange}
          required
          className=" align-text-top "
        ></img>
        <span> </span>
        BrainStormy
      </div>
    );
  }
}

export default Signup;
