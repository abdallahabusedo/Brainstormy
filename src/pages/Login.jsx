import React, { Component } from "react";
import Logo from "./../assets/logo.png";
import "./../style/signup.css";
import axios from "axios";
import swal from "@sweetalert/with-react";
import axiosClient from "../common/client";
import { getToken, setToken } from "../services/token-service";
class Login extends Component {
  constructor(props) {
    super(props);
    this.state = {
      email: "",
      password: "",
    };
  }
  handleChange = (e) => {
    let target = e.target;
    let value = target.type === "checkbox" ? target.checked : target.value;
    let name = target.name;
    this.setState(
      {
        [name]: value,
      },
      () => {
        console.log("");
      }
    );
  };

  handelSubmit = (e) => {
    e.preventDefault();
    var data = JSON.stringify({
      email: this.state.email,
      password: this.state.password,
    });
    console.log("email", this.state.email, this.state.password);
    axiosClient.post('/login', data).then((response) => {
      setToken(response.data);
      localStorage.setItem("type", response.data.type);
      window.location = "/";
    }).catch((err) => {
      console.log(err);
      swal({ title: "Email or Password is Wrong", icon: "error" });
    });


  };
  componentDidMount = () => {
    let id = getToken();
    let a = id === "" ? false : true;
    if (a) {
      window.location = "/";
    }
  };
  render() {
    return (
      <div>
        <div className="container py-5 h-100">
          <div className="row d-flex justify-content-center align-items-center h-100">
            <div className="col col-xl-8 ">
              <div className="card">
                <div className="row g-0">
                  <div className=" d-none d-md-block "></div>
                  <div className=" align-items-center">
                    <div className="card-body p-4 p-lg-5 text-black ">
                      <form>
                        {this.logoSection()}
                        <h3 className="fw-normal mt-5 pb-3">
                          Login into your account
                        </h3>
                        {this.email()}
                        {this.password()}
                        {this.Submit()}
                        <p className="mb-5 pb-lg-2">
                          Don't have an account?
                          <a href="/signup"> Register In here</a>
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

  logoSection() {
    return (
      <div className="d-flex align-items-center  ">
        <i className="fas fa-cubes "></i>
        <div className="h1 fw-bold">
          <img
            src={Logo}
            alt="logo"
            width="80"
            height="70"
            className=" align-text-top "
          />
          <span> </span>
          BrainStormy
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
          onClick={this.handelSubmit}
        >
          Login
        </button>
      </div>
    );
  }

  password() {
    return (
      <div className="form-outline mb-4">
        <input
          type="password"
          name="password"
          id="form2Example27"
          className="form-control form-control-lg"
          placeholder="Password"
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
          name="email"
          className="form-control form-control-lg"
          placeholder="Email address"
          onChange={this.handleChange}
        />
      </div>
    );
  }
}

export default Login;
