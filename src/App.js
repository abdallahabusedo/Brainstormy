import { BrowserRouter as Router, Routes, Route, Link } from "react-router-dom";
import ReactDOM from "react-dom";
import React, { Component } from "react";
import Welcome from "./pages/Welcome";
import Signup from "./pages/Signup";
import Login from "./pages/Login";
import "./App.css";

function App() {
  return (
    // <div className="App">
    //   <Welcome />
    // </div>
    <Router>
      <div className="App">
        <Routes>
          <Route exact path="/" element={<Welcome />}></Route>
          <Route exact path="/signup" element={<Signup />}></Route>
          <Route exact path="/login" element={<Login />}></Route>
        </Routes>
      </div>
    </Router>
  );
}

export default App;
