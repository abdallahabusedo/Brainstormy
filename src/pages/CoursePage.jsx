import React, { Component } from "react";
import Header from "../components/Header";
import courseImg from "./../assets/logo.png";
export default class CoursePage extends Component {
  render() {
    return (
      <div>
        <Header />
        <div>
          <div>
            <section className="vh-100">
              <div className="container py-5 h-100">
                <div className="row d-flex justify-content-center align-items-center h-100">
                  <div className="col-md-0 col-xl-8">
                    <div className="card">
                      <div className="card-body text-center">
                        <div className="mt-0 mb-0">
                          <img
                            src={courseImg}
                            className="rounded-circle img-fluid"
                            width="200px"
                          />
                        </div>
                        <h4 className="mb-2">Course Name</h4>
                        <h4 className="mb-2">Instructor</h4>
                        <p className=" h5 card-text">
                          overview Lorem ipsum dolor sit amet consectetur,
                          adipisicing elit. Et minus cum aspernatur libero
                          voluptatem ex illo eum magni corrupti, debitis sequi
                          ad reprehenderit dicta veritatis! Officiis assumenda
                          adipisci accusamus totam?
                        </p>
                        <button className="btn btn-warning btn-lg btn-block ">
                          Enrol
                        </button>
                        <h2 className="h2">content</h2>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </section>
          </div>
        </div>
      </div>
    );
  }
}
