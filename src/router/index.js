import React from "react";

import Home from "../Home";
import SignIn from "../sign/signIn";
import SignUp from "../sign/signUp";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
const Routers = () => {
  return (
    <Router>
      <Routes>
        <Route path="/welcome" element={<Home />} />
        <Route path="/" element={<SignIn />} />
        <Route path="/sign-up" element={<SignUp />} />
      </Routes>
    </Router>
  );
};

export default Routers;
