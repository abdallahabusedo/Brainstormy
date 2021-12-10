import React, { Component } from "react";
import Header from "../components/Header";
import "./../style/courses.css";
import cardImg from "./../assets/logo.png";
class Courses extends Component {
  render() {
    return (
      <div>
        <Header />
        <div>
          <h1 className="m-5 p-5">Courses</h1>
        </div>
        <div className="card-group justify-content-center align-items-center ">
          <div className="card card_de m-3">
            <img className="card-img-top" src={cardImg} alt="Card image cap" />
            <div className="card-body">
              <p className="card-text">
                Some quick example text to build on the card title and make up
                the bulk of the card's content.
              </p>
              <a href="/courseid">
                <button type="button" className="btn btn-warning">
                  View Course
                </button>
              </a>
            </div>
          </div>
          <div className="card card_de m-3">
            <img className="card-img-top" src={cardImg} alt="Card image cap" />
            <div className="card-body">
              <p className="card-text">
                Some quick example text to build on the card title and make up
                the bulk of the card's content.
              </p>
              <a href="/courseid">
                <button type="button" className="btn btn-warning">
                  View Course
                </button>
              </a>
            </div>
          </div>
          <div className="card card_de m-3">
            <img className="card-img-top" src={cardImg} alt="Card image cap" />
            <div className="card-body">
              <p className="card-text">
                Some quick example text to build on the card title and make up
                the bulk of the card's content.
              </p>
              <a href="/courseid">
                <button type="button" className="btn btn-warning">
                  View Course
                </button>
              </a>
            </div>
          </div>
          <div className="card card_de m-3">
            <img className="card-img-top" src={cardImg} alt="Card image cap" />
            <div className="card-body">
              <p className="card-text">
                Some quick example text to build on the card title and make up
                the bulk of the card's content.
              </p>
              <a href="/courseid">
                <button type="button" className="btn btn-warning">
                  View Course
                </button>
              </a>
            </div>
          </div>
          <div className="card card_de m-3">
            <img className="card-img-top" src={cardImg} alt="Card image cap" />
            <div className="card-body">
              <p className="card-text">
                Some quick example text to build on the card title and make up
                the bulk of the card's content.
              </p>
              <a href="/courseid">
                <button type="button" className="btn btn-warning">
                  View Course
                </button>
              </a>
            </div>
          </div>
          <div className="card card_de m-3">
            <img className="card-img-top" src={cardImg} alt="Card image cap" />
            <div className="card-body">
              <p className="card-text">
                Some quick example text to build on the card title and make up
                the bulk of the card's content.
              </p>
              <a href="/courseid">
                <button type="button" className="btn btn-warning">
                  View Course
                </button>
              </a>
            </div>
          </div>
          <div className="card card_de m-3">
            <img className="card-img-top" src={cardImg} alt="Card image cap" />
            <div className="card-body">
              <p className="card-text">
                Some quick example text to build on the card title and make up
                the bulk of the card's content.
              </p>
              <a href="/courseid">
                <button type="button" className="btn btn-warning">
                  View Course
                </button>
              </a>
            </div>
          </div>
        </div>
      </div>
    );
  }
}

export default Courses;
