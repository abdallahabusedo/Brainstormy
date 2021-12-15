import React, { Component } from "react";
import Logo from "./../assets/logo.png";

export default class WelcomeBody extends Component {
  render() {
    let id = localStorage.getItem("accessToken");
    let a = id == "" ? false : true;
    return (
      <div className="WelcomeBody">
        <main>
          <div class="position-relative overflow-hidden p-3 p-md-5 m-md-3 text-center bg-light">
            <div class="col-md-5 p-lg-5 mx-auto my-5">
              <img
                src={Logo}
                alt=""
                width="200"
                height="180"
                className="d-inline-block align-text-top"
              ></img>
              <h1 class="fw-normal">BrainStormy</h1>
              <p class="lead fw-normal">
                A Website for Brainstorming and think
              </p>
              <p class="lead fw-normal">
                learn more think more gain more skills
              </p>
              <a
                class="btn btn-outline-secondary"
                href={a ? "/courses" : "/signup"}
              >
                {a ? "See Courses" : "join us"}
              </a>
            </div>
          </div>
        </main>
      </div>
    );
  }
}
