import React, { Component } from "react";
import Header from "../components/Header";
import swal from "@sweetalert/with-react";
import axiosClient from "../common/client";

export default class AdminPanel extends Component {
  constructor(props) {
    super(props);
    this.state = {
      users: [],
    };
  }
  Promote = (id, type) => {
    let token = localStorage.getItem("accessToken");
    console.log("object", type);
    if (type !== 2) {
      axiosClient.post(`/user/promote?userId=${id}`)
        .then(function (response) {
          console.log(JSON.stringify(response.data));
          window.location.reload();
        })
        .catch(function (error) {
          console.log(error);
          swal({
            title: "Can't Promote an Admin 1",
            icon: "error",
          });
        });
    } else
      swal({
        title: "Can't Promote an Admin 1 or Instructor 2",
        icon: "error",
      });
  };
  componentDidMount = () => {
    var FormData = require("form-data");

    axiosClient.get('/users?page=1&limit=100')
      .then(
        (response) => {
          this.setState({ users: response.data.items });
          console.log(this.state.users);
        },
        () => {}
      )
      .catch(function (error) {
        console.log(error);
      });
  };
  render() {
    return (
      <div>
        <Header />
        <div className="mt-5 pt-3">
          <table className="table">
            <thead>
              <tr>
                <th scope="col">#</th>
                <th scope="col">first_name</th>
                <th scope="col">last_name</th>
                <th scope="col">username</th>
                <th scope="col">email</th>
                <th scope="col">Role</th>
                <th scope="col">Edit</th>
              </tr>
            </thead>
            <tbody>
              {this.state.users.map((item) => (
                <tr>
                  <td>{item.id}</td>
                  <td>{item.firstName}</td>
                  <td>{item.lastName}</td>
                  <td>{item.username}</td>
                  <td>{item.email}</td>
                  <td>{item.role}</td>
                  <td>
                    <button
                      className="btn btn-warning btn-sm btn-block"
                      onClick={() => {
                        this.Promote(item.id, item.role);
                      }}
                    >
                      Promote
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    );
  }
}
