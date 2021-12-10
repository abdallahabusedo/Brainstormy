import React, { Component } from "react";
import Header from "../components/Header";

class Profile extends Component {
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

                    <div className="form-outline mb-4">
                      <input
                        type="text"
                        id="form2Example37"
                        className="form-control form-control-lg"
                        placeholder="First Name"
                      />
                    </div>
                    <div className="form-outline mb-4">
                      <input
                        type="text"
                        id="form2Example37"
                        className="form-control form-control-lg"
                        placeholder="Last Name"
                      />
                    </div>
                    <div className="form-outline mb-4">
                      <input
                        type="text"
                        id="form2Example37"
                        className="form-control form-control-lg"
                        placeholder="User Name"
                      />
                    </div>
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
                        type="date"
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
                        edit | Save
                      </button>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>
      </div>
    );
  }
}

export default Profile;
