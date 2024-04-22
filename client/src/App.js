import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import HomePage from "./components/homepage-things/HomePage";
import PatientPortal from "./components/Patient/PatientPortal";
import RegistrationPage from "./components/RegistrationPage";
import StaffPortal from "./components/Staff/StaffPortal";
import AboutPage from "./components/about-us-page/AboutPage";

import "bootstrap/dist/css/bootstrap.min.css";

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/patient-portal" element={<PatientPortal />} />
        <Route path="/staff-portal" element={<StaffPortal />} />
        <Route path="/register" element={<RegistrationPage />} />
        <Route path="/about-us" element={<AboutPage />} />
        {/* You can add more routes here as needed */}
      </Routes>
    </Router>
  );
}

export default App;
