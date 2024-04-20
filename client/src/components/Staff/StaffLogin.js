import React from "react";
import { Container, Row, Col } from "react-bootstrap";
import StaffLoginHandler from "./StaffLoginHandler";
import "../styles/UserLogin.css"; // Import custom CSS for user login

// LoginPage.js

function StaffLogin() {
  return (
    <Container fluid className="login-page">
      <Row className="flex-grow-1">
        <Col md={12} className="login-image-column">
          {/* Background image */}
          <div className="login-image"></div>
          {/* Login form */}
          <div className="login-section">
            <StaffLoginHandler />
          </div>
        </Col>
      </Row>
    </Container>
  );
}

export default StaffLogin;
