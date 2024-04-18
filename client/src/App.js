import React from "react";
import { BrowserRouter as Router, Routes, Route, Link } from "react-router-dom";
import { Navbar, Nav, Container } from "react-bootstrap";
import HomePage from "./HomePage";
import AboutPage from "./AboutPage";
import "./App.css"; // Make sure the path is correct
import PatientPortal from "./components/PatientPortal";

function App() {
  return (
    <Router>
      <Navbar
        collapseOnSelect
        expand="lg"
        bg="primary"
        variant="dark"
        className="mb-3"
      >
        <Container>
          <Navbar.Brand as={Link} to="/">
            HealthcareSystem
          </Navbar.Brand>
          <Navbar.Toggle aria-controls="responsive-navbar-nav" />
          <Navbar.Collapse id="responsive-navbar-nav">
            <Nav className="me-auto">
              <Nav.Link as={Link} to="/" style={{ color: "white" }}>
                Home
              </Nav.Link>
              <Nav.Link as={Link} to="/about" style={{ color: "white" }}>
                About
              </Nav.Link>
            </Nav>
            {/* Align right for the contact button - if needed */}
            <Nav>
              <Nav.Link as={Link} to="/contact" className="btn btn-light">
                Contact Us
              </Nav.Link>
            </Nav>
          </Navbar.Collapse>
        </Container>
      </Navbar>

      <Container>
        <Routes>
          <Route path="/contact" element={<div>Contact Page</div>} />
          <Route path="/about" element={<AboutPage />} />
          <Route path="/" element={<HomePage />} />
          <Route path="/patient-portal" element={<PatientPortal />} />
        </Routes>
      </Container>
    </Router>
  );
}

export default App;
