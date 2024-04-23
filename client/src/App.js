import React, { useState } from "react"; // Correct this line to avoid duplicate React imports

import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import HomePage from "./components/homepage-things/HomePage";
import PatientPortal from "./components/Patient/PatientPortal";
import RegistrationPage from "./components/RegistrationPage";
import StaffPortal from "./components/Staff/StaffPortal";
import AboutPage from "./components/about-us-page/AboutPage";
import UserContext from "./components/UserContext";

import "bootstrap/dist/css/bootstrap.min.css";

function App() {
  const [user, setUser] = useState(null);

  return (
    <Router>
      <UserContext.Provider value={{ user, setUser }}>
        <Routes>
          <Route path="/" element={<HomePage />} />
          <Route path="/patient-portal" element={<PatientPortal />} />
          <Route path="/staff-portal" element={<StaffPortal />} />
          <Route path="/register" element={<RegistrationPage />} />
          <Route path="/about-us" element={<AboutPage />} />
          {/* You can add more routes here as needed */}
        </Routes>
      </UserContext.Provider>
    </Router>
  );
}

export default App;
