import React, { Component } from "react";
import Logo from "./../assets/logo.png";
import Sign from "./../assets/signup.png";
import "./../style/signup.css";
class Login extends Component {
  render() {
    return (
      <div>
        <div className="container py-5 h-100">
          <div className="row d-flex justify-content-center align-items-center h-100">
            <div className="col col-xl-8 ">
              <div className="card">
                <div className="row g-0 ">
                  <div className=" d-none d-md-block "></div>
                  <div className=" align-items-center">
                    <div className="card-body p-4 p-lg-5 text-black ">
                      <form>
                        <div className="d-flex align-items-center  ">
                          <i className="fas fa-cubes "></i>
                          <div className="h1 fw-bold">
                            <img
                              src={Logo}
                              alt=""
                              width="80"
                              height="70"
                              className=" align-text-top "
                            ></img>
                            <span> </span>
                            BrainStormy
                          </div>
                        </div>

                        <h3 className="fw-normal mt-5 pb-3">
                          Login into your account
                        </h3>
                        <div className="form-outline mb-4">
                          <input
                            type="email"
                            id="form2Example17"
                            className="form-control form-control-lg"
                            placeholder="Email address"
                          />
                        </div>

                        <div className="form-outline mb-4">
                          <input
                            type="password"
                            id="form2Example27"
                            className="form-control form-control-lg"
                            placeholder="Password"
                          />
                        </div>

                        <div className="pt-1 mb-4">
                          <button
                            className="btn btn-warning btn-lg btn-block"
                            type="button"
                          >
                            Login
                          </button>
                        </div>
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
}

export default Login;
