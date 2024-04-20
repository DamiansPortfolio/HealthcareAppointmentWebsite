import React from "react";
import { Container, Row, Col, Button } from "react-bootstrap";
import { Link } from "react-router-dom";
import BottomNav from "./BottomNavbar"; // Assuming you have this component

import "./styles/HomePage.css"; // Ensure this CSS file is correctly linked
import "../App.css";
import HomeNavBar from "./HomeNavBar";

const HomePage = () => {
  return (
    <Container fluid className="home-page">
      <HomeNavBar />
      <Row className="flex-grow-1">
        <Col md={8} className="main-area">
          MAIN AREA {/* Placeholder for main content */}
        </Col>
      </Row>
      <BottomNav /> {/* Ensure BottomNav is correctly implemented */}
    </Container>
  );
};

export default HomePage;
