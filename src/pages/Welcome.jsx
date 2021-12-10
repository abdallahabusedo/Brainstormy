import React, { Component } from "react";
import WelcomeBody from "../components/WelcomeBody";
import Header from "./../components/Header";
class Welcome extends Component {
  render() {
    return (
      <div>
        <Header />
        <WelcomeBody />
      </div>
    );
  }
}
export default Welcome;
