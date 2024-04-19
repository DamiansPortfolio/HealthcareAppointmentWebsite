import React from "react";
import { Navbar, Container, Nav, Button } from "react-bootstrap";
import { IoMdMap } from "react-icons/io"; // This icon is for the directions link

const NavBar = () => {
  return (
    <>
      {/* Top Navigation Bar */}
      <Navbar bg="primary" variant="dark" expand="lg" sticky="top">
        <Container>
          <Navbar.Brand href="/">HealthcareSystem</Navbar.Brand>
          <Navbar.Toggle aria-controls="basic-navbar-nav" />
          <Navbar.Collapse id="basic-navbar-nav">
            <Nav className="me-auto">
              <Nav.Link href="/">Home</Nav.Link>
              <Nav.Link href="/about">About</Nav.Link>
              {/* Add more Nav.Links as needed */}
            </Nav>
          </Navbar.Collapse>
        </Container>
      </Navbar>

      {/* Bottom Navigation Bar */}
      <Navbar fixed="bottom" bg="light" variant="light">
        <Container>
          <Nav className="me-auto">
            <Nav.Link href="/services">Services</Nav.Link>
            <Nav.Link href="/locations">Locations</Nav.Link>
            <Nav.Link href="/about">About</Nav.Link>
            <Nav.Link href="/contact-us">Contact Us</Nav.Link>
          </Nav>
          <Nav>
            <Nav.Link href="/directions">
              <IoMdMap /> Directions
            </Nav.Link>
            <Button variant="outline-success" href="/book-appointment">
              Book an Appointment
            </Button>
          </Nav>
        </Container>
      </Navbar>
    </>
  );
};

export default NavBar;
