import React from "react";
import { Navbar, Container, Nav, Button } from "react-bootstrap";
import { Link } from "react-router-dom"; // Ensure Link is imported for routing
import { IoMdMap } from "react-icons/io"; // This icon is for the directions link

import "../App.css";

const BottomNavbar = () => {
  return (
    <Navbar bg="light" variant="light" className="mt-auto bottom-navbar">
      <Container>
        <Nav className="me-auto">
          <Nav.Link as={Link} to="/services">
            Services
          </Nav.Link>
          <Nav.Link as={Link} to="/locations">
            Locations
          </Nav.Link>
          <Nav.Link as={Link} to="/about">
            About
          </Nav.Link>
          <Nav.Link as={Link} to="/contact-us">
            Contact Us
          </Nav.Link>
        </Nav>
        <Nav>
          <Nav.Link as={Link} to="/directions">
            <IoMdMap /> Directions
          </Nav.Link>
          <Button variant="outline-success" as={Link} to="/book-appointment">
            Book an Appointment
          </Button>
        </Nav>
      </Container>
    </Navbar>
  );
};

export default BottomNavbar;
