import React from "react";
import NavBar from "../homepage-things/NavigationBar";
import { Container, Row, Col, Card } from "react-bootstrap";
import Accordion from "react-bootstrap/Accordion";
import Button from "react-bootstrap/Button";

import img from "../images/img.png";
import adhealth2 from "../images/adhealth2.png";
import registernow from "../images/registernow.png";

import "./AboutPage.css";

function AboutPage() {
  return (
    <div className="about-us-container">
      <NavBar />
      <Container fluid style={{ marginBottom: "50px" }}>
        <Row className="justify-content-center">
          <Col md={10}>
            <div className="about-content text-center">
              <h1>
                <strong> About Us </strong>
              </h1>
              <p>
                Welcome to AD-HEALTH, where we are dedicated to revolutionizing
                the healthcare experience for both patients and providers.
              </p>
              <hr className="separation-line" />
            </div>

            <Row className="justify-content-center">
              <Col md={6}>
                <Card style={{ width: "100%", border: "none" }}>
                  <Card.Img variant="top" src={img} style={{ width: "100%" }} />
                  <Card.Body>
                    <Card.Title className="text-center">
                      What We Offer
                    </Card.Title>
                    <Accordion defaultActiveKey={["0", "1", "2"]} flush>
                      <Accordion.Item eventKey="0" alwaysOpen>
                        <Accordion.Header>
                          User-Friendly Platform
                        </Accordion.Header>
                        <Accordion.Body>
                          We have developed a user-friendly platform that
                          prioritizes ease of use and accessibility, ensuring
                          that both patients and providers can navigate our
                          system effortlessly.
                        </Accordion.Body>
                      </Accordion.Item>
                      <Accordion.Item eventKey="1" alwaysOpen>
                        <Accordion.Header>
                          Comprehensive Features
                        </Accordion.Header>
                        <Accordion.Body>
                          Our platform offers a comprehensive suite of features,
                          including secure registration and authentication,
                          appointment scheduling and management, real-time
                          availability updates, and robust database integration.
                        </Accordion.Body>
                      </Accordion.Item>
                      <Accordion.Item eventKey="2" alwaysOpen>
                        <Accordion.Header>
                          Commitment to Security
                        </Accordion.Header>
                        <Accordion.Body>
                          We understand the importance of protecting sensitive
                          medical information. That's why we have implemented
                          advanced security measures, including Two-Factor
                          Authentication (2FA), to safeguard user data and
                          maintain confidentiality.
                        </Accordion.Body>
                      </Accordion.Item>
                    </Accordion>
                  </Card.Body>
                </Card>
              </Col>

              <Col md={6}>
                <Card style={{ width: "100%", border: "none" }}>
                  <Card.Img
                    variant="top"
                    src={adhealth2}
                    style={{ width: "100%" }}
                  />
                  <Card.Body>
                    <Card.Title className="text-center">
                      Why Choose Us
                    </Card.Title>
                    <Accordion defaultActiveKey={["0", "1", "2"]} flush>
                      <Accordion.Item eventKey="0" alwaysOpen>
                        <Accordion.Header>Innovation</Accordion.Header>
                        <Accordion.Body>
                          We are committed to continuous innovation and
                          leveraging cutting-edge technologies to enhance the
                          healthcare experience for our users.
                        </Accordion.Body>
                      </Accordion.Item>
                      <Accordion.Item eventKey="1" alwaysOpen>
                        <Accordion.Header>Reliability</Accordion.Header>
                        <Accordion.Body>
                          We ensure that our platform delivers consistent
                          results, allowing users to rely on us for their
                          healthcare needs. Our robust infrastructure is
                          designed to handle high loads without compromising on
                          responsiveness or data integrity.
                        </Accordion.Body>
                      </Accordion.Item>
                      <Accordion.Item eventKey="2" alwaysOpen>
                        <Accordion.Header>
                          Customer Satisfaction
                        </Accordion.Header>
                        <Accordion.Body>
                          Our dedicated support team is here to assist you every
                          step of the way. We prioritize customer satisfaction
                          and strive to exceed your expectations.
                        </Accordion.Body>
                      </Accordion.Item>
                    </Accordion>
                  </Card.Body>
                </Card>
              </Col>
            </Row>
          </Col>
        </Row>
        <Card className="text-center" style={{ width: "95%" }}>
          <Card.Header className="large-header">
            <strong> Get Started Today </strong>
          </Card.Header>
          <Card.Body>
            <Card.Text className="text-left">
              Join the AD-HEALTH community today and experience the future of
              healthcare firsthand. Whether you're a patient seeking convenient
              access to healthcare services or a provider looking to streamline
              your practice, we have the solutions you need.
            </Card.Text>
            <Card.Img
              variant="top"
              src={registernow}
              style={{ width: "100%" }}
            />
            <Button
              style={{
                width: "100%",
                backgroundColor: "teal",
                borderColor: "teal",
              }}
              href="/register"
            >
              <strong> Register Now </strong>
            </Button>
          </Card.Body>
          <Card.Footer>Thank you for choosing AD-HEALTH.</Card.Footer>
        </Card>
      </Container>
    </div>
  );
}

export default AboutPage;
