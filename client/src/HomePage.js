import React from "react";
import { Container, Row, Col, Button, Card } from "react-bootstrap";
import "./HomePage.css"; // Ensure this path is correct and the file exists

function HomePage() {
  return (
    <Container className="home-container">
      <Row className="justify-content-md-center">
        <Col md={8}>
          <Card className="home-card mb-4 shadow-sm">
            <Card.Body>
              <Card.Title className="home-title">
                Welcome to the Healthcare Appointment Management System
              </Card.Title>
              <Card.Text className="home-text">
                Your health matters. Book an appointment with us today and get
                the care you deserve!
              </Card.Text>
              <Button variant="primary" href="#book">
                Book Appointment
              </Button>
            </Card.Body>
          </Card>
        </Col>
      </Row>
    </Container>
  );
}

export default HomePage;
