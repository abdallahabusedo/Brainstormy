import { BrowserRouter as Router, Routes, Route, Link } from "react-router-dom";
// import ReactDOM from "react-dom";
import React from "react";
import Welcome from "./pages/Welcome";
import Signup from "./pages/Signup";
import Login from "./pages/Login";
import Profile from "./pages/Profile";
import Courses from "./pages/Courses";
import CoursePage from "./pages/course/CoursePage";
import "./App.css";

function App() {
  return (
    <>
      <Router>
        <div className="App">
          <Routes>
            <Route exact path="/"           element={<Welcome     />}></Route>
            <Route exact path="/signup"     element={<Signup      />}></Route>
            <Route exact path="/login"      element={<Login       />}></Route>
            <Route exact path="/profile"    element={<Profile     />}></Route>
            <Route exact path="/courses"    element={<Courses     />}></Route>
            <Route exact path="/course/:id" element={<CoursePage  />}></Route>
          </Routes>
        </div>
      </Router>
    </>
  );
}

export default App;
