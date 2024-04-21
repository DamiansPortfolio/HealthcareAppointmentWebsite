import React from "react";
import { Container, Row, Col } from "react-bootstrap";
import NavBar from "./NavigationBar";
import UserLoginHandler from "../UserLoginHandler";
import "./HomePage.css";
import "../../App.css";
import "./Navigation.css";
import BottomNavbar from "./BottomNavbar";

const HomePage = () => {
  return (
    <div className="site-container">
      <NavBar />
      <Container fluid>
        {" "}
        {/* Ensures the container is fluid across all device widths */}
        <main className="homepage-main">
          <Row className="user-login-section">
            <Col md={6} className="login-handler">
              {" "}
              {/* Only takes up half the width */}
              <UserLoginHandler />
            </Col>
            <Col md={6} className="services-info">
              <h2>Services</h2>
              <p>Details about services and offerings can go here.</p>
            </Col>
            <Col md={6} className="images-section">
              <h2>Image Information</h2>
              <p>Details about other services and offerings can go here.</p>
            </Col>
            <Col md={6} className="images-section-2">
              <h2>Image Information</h2>
              <p>Details about other services and offerings can go here.</p>
            </Col>
          </Row>
          <Row className="additional-info-section">
            <Col md={6} className="more-info">
              <h2>More Information</h2>
              <p>Details about other services and offerings can go here.</p>
            </Col>
            <Col md={6} className="more-info-2">
              <h2>More Information</h2>
              <p>Details about other services and offerings can go here.</p>
            </Col>
          </Row>
        </main>
      </Container>
      <footer className="homepage-footer">
        <p>Copyright © 2024 My Website</p>
        <BottomNavbar />
      </footer>
    </div>
  );
};

export default HomePage;
