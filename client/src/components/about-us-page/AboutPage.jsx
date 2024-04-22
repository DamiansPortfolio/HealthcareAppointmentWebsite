import React from "react";
import NavBar from "../homepage-things/NavigationBar";
import { Container, Row, Col } from "react-bootstrap";

import "./AboutPage.css";

function AboutPage() {
  return (
    <div className="about-us-container">
      <NavBar />
      <Container fluid></Container>
      <Container fluid></Container>
    </div>
  );
}

export default AboutPage;
