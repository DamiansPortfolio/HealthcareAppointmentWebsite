import React from "react";
import { Container, Row, Col } from "react-bootstrap";
import LoginForm from "./components/LoginForm";
import "./HomePage.css"; // Ensure the CSS file is correctly linked

const HomePage = () => {
  return (
    <Container fluid className="home-page d-flex flex-column vh-100">
      <Row className="flex-grow-1">
        <Col md={4} className="login-section">
          <LoginForm />
        </Col>
        <Col md={8} className="main-area">
          {/* Main content goes here */}
          MAIN AREA
        </Col>
      </Row>
      <Row className="footer">
        <Col>NAVIGATION BAR CONTENT</Col>
      </Row>
    </Container>
  );
};

export default HomePage;
