import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { UserProvider } from "./components/UserContext";
import HomePage from "./components/homepage-things/HomePage";
import PatientPortal from "./components/Patient/PatientPortal";
import StaffPortal from "./components/Staff/StaffPortal";
import RegistrationPage from "./components/RegistrationPage";
import AboutPage from "./components/about-us-page/AboutPage";
import ServicesPage from "./components/homepage-things/ServicesPage";
import StaffDashboard from "./components/Staff/StaffDashboard";
import AppointmentsPage from "./components/appointments/AppointmentsPage";
import PatientDashboard from "./components/Patient/PatientDashboard";

function App() {
  return (
    <Router>
      <UserProvider>
        <Routes>
          <Route
            path="/patient-portal/dashboard"
            element={<PatientDashboard />}
          />
          <Route path="/" element={<HomePage />} />
          <Route path="/patient-portal" element={<PatientPortal />} />
          <Route path="/staff-portal" element={<StaffPortal />} />
          <Route path="/register" element={<RegistrationPage />} />
          <Route path="/about-us" element={<AboutPage />} />
          <Route path="/services" element={<ServicesPage />} />
          <Route path="/staff-portal/dashboard" element={<StaffDashboard />} />
          <Route
            path="/patient-portal/appointments"
            element={<AppointmentsPage />}
          />
        </Routes>
      </UserProvider>
    </Router>
  );
}

export default App;
