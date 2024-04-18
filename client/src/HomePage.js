import React from "react";
import { Container, Row, Col, Button } from "react-bootstrap";
import { Link } from "react-router-dom"; // Import Link from react-router-dom
import LoginForm from "./components/LoginForm";
import "./HomePage.css"; // Ensure the CSS file is correctly linked

const HomePage = () => {
  return (
    <Container fluid className="home-page d-flex flex-column vh-100">
      <Row className="flex-grow-1">
        <Col md={4} className="login-section">
          <LoginForm />
          <div className="mt-3">
            {" "}
            {/* Margin top for spacing */}
            <Link to="/register">
              {" "}
              {/* Use Link to route to the registration page */}
              <Button variant="primary">Register</Button>{" "}
              {/* Bootstrap button for styling */}
            </Link>
          </div>
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
