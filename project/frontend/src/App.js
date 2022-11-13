/* Copyright © samyak. - All Rights Reserved
 * Unauthorized copying of this file, via any medium is strictly prohibited
 * Proprietary and confidential
 * Written by Samyak Ghagargunde <samyakghagargunde66@gmail.com>, November 2022
 */
import React from "react";
import "../node_modules/bootstrap/dist/css/bootstrap.min.css";
import "./App.css";

import { BrowserRouter as Router, Routes, Route, Link } from "react-router-dom";

import Home from "./components/Home/Home";
import Login from "./components/login_component";
import SignUp from "./components/signup_component";
import UserDetails from "./components/userDetails";

function App() {
  return (
    <Router>
      <nav className="navbar navbar-expand-lg navbar-light fixed-top">
          <div className="container">
            <Link className="navbar-brand" to={'/sign-in'}>
            RSquare-web-studio
            </Link>
            
            
          </div>
        </nav>

      <div>
        
            <Routes>
              <Route exact path="/" element={<Login />} />
              <Route path="/sign-in" element={<Login />} />
              <Route path="/sign-up" element={<SignUp />} />
              
            </Routes>
         
      </div>
            <Routes>
              <Route path="/home" element={<Home />} />
              <Route path="/userDetails" element={<UserDetails />} />
            </Routes>
    </Router>
  );
}

export default App;
