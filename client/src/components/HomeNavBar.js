import React from "react";
import { Navbar, Nav, Container, NavDropdown } from "react-bootstrap";
import { Link } from "react-router-dom";
import logo from "./images/AD-HEALTH-LOGO.png"; // Make sure the path is correct
import "./styles/HomeNavbar.css"; // Ensure correct path to CSS file

class TopNavbar extends React.Component {
  render() {
    return (
      <Navbar expand="lg" className="navbar-mainbg" variant="dark">
        <Container fluid>
          <Navbar.Brand as={Link} to="/" className="navbar-brand">
            <img
              src={logo}
              alt="AD-HEALTH Logo"
              className="d-inline-block align-top logo-img" // Use logo-img class for styling
            />
          </Navbar.Brand>
          <Navbar.Toggle aria-controls="basic-navbar-nav" />
          <Navbar.Collapse
            id="basic-navbar-nav"
            className="justify-content-end"
          >
            <Nav>
              <NavDropdown title="User Login" id="portal-nav-dropdown">
                <NavDropdown.Item as={Link} to="/patient-login-page">
                  Patient Login
                </NavDropdown.Item>
                <NavDropdown.Item as={Link} to="/staff-login-page">
                  Staff Login
                </NavDropdown.Item>
              </NavDropdown>
              <NavDropdown title="Locations" id="locations-nav-dropdown">
                {/* Placeholder for locations */}
              </NavDropdown>
              <Nav.Link as={Link} to="/register">
                Register
              </Nav.Link>
            </Nav>
          </Navbar.Collapse>
        </Container>
      </Navbar>
    );
  }
}

export default TopNavbar;
