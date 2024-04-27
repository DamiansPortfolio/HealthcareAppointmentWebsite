import React, {
  Container,
  Row,
  Col,
  Form,
  Button,
  Card,
} from "react-bootstrap";
import NavBar from "./NavigationBar";
import UserLoginHandler from "../UserLoginHandler";
import "./HomePage.css";
import "../../App.css";
import "./Navigation.css";
import BottomNavbar from "./BottomNavbar";

import Carousel from "react-bootstrap/Carousel";
import { Link } from "react-router-dom";
import Breadcrumb from "react-bootstrap/Breadcrumb";

import icon from "../images/icon.webp";
import welcome from "../images/welcome.png";
import loc from "../images/loc.png";
import services from "../images/services.png";
import us from "../images/us.png";

//icons
import {
  FaFacebook,
  FaInstagram,
  FaTiktok,
  FaYoutube,
  FaLinkedin,
  FaTwitter,
} from "react-icons/fa";

const HomePage = () => {
  return (
    <div>
      <NavBar />
      <Container fluid>
        <Row>
          <Col xs={3} className="d-flex flex-column justify-content-between">
            <div className="login-box">
              <UserLoginHandler />
            </div>
            <div></div> {/* Spacer */}
          </Col>
          <Col className="p-0">
            <Carousel>
              <Carousel.Item>
                <div style={{ width: "93%", margin: "auto" }}>
                  <img className="d-block w-100" src={welcome} />
                </div>
              </Carousel.Item>

              <Carousel.Item>
                <div style={{ width: "93%", margin: "auto" }}>
                  <img className="d-block w-100" src={us} />
                  <div className="button-container">
                    <Button
                      className="custom-button"
                      style={{
                        backgroundColor: "teal",
                        borderColor: "teal",
                      }}
                      href="/about-us"
                    >
                      Let's get to know more about us!
                    </Button>
                  </div>
                </div>
              </Carousel.Item>

              <Carousel.Item>
                <div style={{ width: "93%", margin: "auto" }}>
                  <img className="d-block w-100" src={services} />
                  <div className="button-container">
                    <Button
                      className="custom-button"
                      style={{
                        backgroundColor: "teal",
                        borderColor: "teal",
                      }}
                      href="/services"
                    >
                      Find out more about the services we offer!
                    </Button>
                  </div>
                </div>
              </Carousel.Item>

              <Carousel.Item>
                <div style={{ width: "93%", margin: "auto" }}>
                  <img className="d-block w-100" src={loc} />
                  <div className="button-container">
                    <Button
                      className="custom-button"
                      style={{
                        backgroundColor: "teal",
                        borderColor: "teal",
                      }}
                      href="/locations"
                    >
                      Check out our locations!
                    </Button>
                  </div>
                </div>
              </Carousel.Item>
            </Carousel>
          </Col>
        </Row>
      </Container>

      <footer className="footer bg-dark text-light pt-5 mt-5">
        <Container>
          <Row>
            <Col>
              <h5>Contact Us</h5>
              <p>
                8000 York Road, Towson, MD 21252 | contactus@adhealth.com |
                123-456-7890
              </p>
            </Col>
            <Col className="text-end">
              <h5>Follow Us</h5>
              <div className="social-icons d-flex justify-content-end">
                <Breadcrumb>
                  <Breadcrumb.Item>
                    <FaFacebook />
                  </Breadcrumb.Item>
                  <Breadcrumb.Item>
                    <FaTwitter />
                  </Breadcrumb.Item>
                  <Breadcrumb.Item>
                    <FaInstagram />
                  </Breadcrumb.Item>
                  <Breadcrumb.Item>
                    <FaTiktok />
                  </Breadcrumb.Item>
                  <Breadcrumb.Item>
                    <FaLinkedin />
                  </Breadcrumb.Item>
                  <Breadcrumb.Item>
                    <FaYoutube />
                  </Breadcrumb.Item>
                </Breadcrumb>
              </div>
            </Col>
          </Row>
          <hr className="bg-light" />
          <Row className="align-items-center">
            <Col className="text-center">
              <p>&copy; 2024 AD-HEALTH. All rights reserved.</p>
            </Col>
          </Row>
        </Container>
      </footer>
    </div>
  );
};

export default HomePage;
