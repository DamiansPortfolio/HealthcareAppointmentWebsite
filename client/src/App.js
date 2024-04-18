import React from "react";
import { BrowserRouter as Router, Routes, Route, Link } from "react-router-dom";
import { Navbar, Nav, Container, NavDropdown, Button } from "react-bootstrap";
import HomePage from "./HomePage";
import AboutPage from "./AboutPage";
import "./App.css"; // Make sure the path is correct

function App() {
  return (
    <Router>
      <Navbar collapseOnSelect expand="lg" variant="dark">
        <Container>
          <Navbar.Brand as={Link} to="/">
            HealthcareSystem
          </Navbar.Brand>
          <Navbar.Toggle aria-controls="responsive-navbar-nav" />
          <Navbar.Collapse id="responsive-navbar-nav">
            <Nav className="me-auto">
              <Nav.Link as={Link} to="/" className="nav-link">
                Home
              </Nav.Link>
              <Nav.Link as={Link} to="/about" className="nav-link">
                About
              </Nav.Link>
              {/* Example for using Button in Navbar for uniform styling */}
              <Button as={Link} to="/contact" variant="light" className="ms-2">
                Contact Us
              </Button>
            </Nav>
          </Navbar.Collapse>
        </Container>
      </Navbar>

      <Container style={{ marginTop: "20px" }}>
        <Routes>
          <Route path="/contact" element={<div>Contact Page</div>} />
          <Route path="/about" element={<AboutPage />} />
          <Route path="/" element={<HomePage />} />
        </Routes>
      </Container>
    </Router>
  );
}

export default App;
