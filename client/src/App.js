import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import HomePage from "./components/HomePage";
import AboutPage from "./components/AboutPage";
import PatientPortal from "./components/Patient/PatientPortal";
import RegistrationPage from "./components/RegistrationPage";
import StaffPortal from "./components/Staff/StaffPortal";

import "bootstrap/dist/css/bootstrap.min.css";

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/about" element={<AboutPage />} />
        <Route path="/patient-portal" element={<PatientPortal />} />
        <Route path="/staff-portal" element={<StaffPortal />} />
        <Route path="/register" element={<RegistrationPage />} />
        {/* You can add more routes here as needed */}
      </Routes>
    </Router>
  );
}

export default App;
