import React from "react";
import { Container, Row, Col } from "react-bootstrap";
import NavBar from "./NavigationBar";
import BottomNav from "./BottomNavbar";
import UserLoginHandler from "./UserLoginHandler";

import "./styles/HomePage.css"; // Ensure this path is correct
import "../App.css";

const HomePage = () => {
  return (
    <Container fluid className="home-page">
      <NavBar />
      <Row className="justify-content-start my-4">
        {" "}
        {/* Changed to 'justify-content-start' */}
        <Col xs={12} md={6} lg={4} className="login-area">
          <UserLoginHandler /> {/* This is the user login form */}
        </Col>
        <Col md={6} lg={8} className="main-area">
          {/* Optional: Other content here */}
        </Col>
      </Row>
      <BottomNav />
    </Container>
  );
};

export default HomePage;
