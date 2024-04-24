import React, { useState, useEffect } from "react";
import axios from "axios";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import HomePage from "./components/homepage-things/HomePage";
import PatientPortal from "./components/Patient/PatientPortal";
import RegistrationPage from "./components/RegistrationPage";
import StaffPortal from "./components/Staff/StaffPortal";
import AboutPage from "./components/about-us-page/AboutPage";
import { UserProvider } from "./components/UserContext";

import "bootstrap/dist/css/bootstrap.min.css";

function App() {
  const [user, setUser] = useState(null);

  useEffect(() => {
    axios
      .get("/api/current-user", { withCredentials: true })
      .then((response) => {
        if (response.data.success) {
          setUser({
            username: response.data.user.username,
            user_type_id: response.data.user.user_type_id,
          });
        } else {
          setUser(null);
        }
      })
      .catch((error) => {
        console.error("Error fetching user session:", error);
        setUser(null);
      });
  }, []);

  return (
    <Router>
      <UserProvider value={{ user, setUser }}>
        {" "}
        <Routes>
          <Route path="/" element={<HomePage />} />
          <Route path="/patient-portal" element={<PatientPortal />} />
          <Route path="/staff-portal" element={<StaffPortal />} />
          <Route path="/register" element={<RegistrationPage />} />
          <Route path="/about-us" element={<AboutPage />} />
        </Routes>
      </UserProvider>
    </Router>
  );
}

export default App;
