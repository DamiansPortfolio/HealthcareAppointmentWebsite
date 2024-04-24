import React, { useState, useContext, useEffect } from "react";
import { Link } from "react-router-dom"; // Import useHistory directly
import UserContext from "../UserContext";
import axios from "axios";
import { useNavigate, useLocation } from "react-router-dom";

import logo from "../images/logo_v2.png"; // Make sure the path is correct
import "./Navigation.css";

import { Row, Col } from "react-bootstrap";

import Button from "react-bootstrap/Button";
import Offcanvas from "react-bootstrap/Offcanvas";
import Card from "react-bootstrap/Card";

import abingdon from "../images/Abingdon.jpg"; // Adjust the path as necessary
import belAir from "../images/BelAir.jpg"; // Adjust the path as necessary
import baltimore from "../images/Baltimore.jpg"; // Adjust the path as necessary
import columbia from "../images/Columbia.jpg"; // Adjust the path as necessary
import cockeysville from "../images/Cockeysville.jpg"; // Adjust the path as necessary
import essex from "../images/Essex.jpg"; // Adjust the path as necessary
import hanover from "../images/Hanover.jpg"; // Adjust the path as necessary
import glenBurnie from "../images/GlenBurnie.jpg"; // Adjust the path as necessary

const Navigation = () => {
  const { user, setUser } = useContext(UserContext); // Get the user state from the context
  const navigate = useNavigate();
  const location = useLocation();
  const [isActive, setIsActive] = useState(false);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    setIsLoading(true);
    axios
      .get("/api/current-user", { withCredentials: true })
      .then((response) => {
        if (response.data.success && response.data.user) {
          // Explicitly check for user_type_id presence
          if (response.data.user.user_type_id) {
            setUser(response.data.user);
          } else {
            console.error("User data is missing 'user_type_id'");
            setUser(null);
          }
        } else {
          setUser(null);
        }
      })
      .catch((error) => {
        console.error("Failed to fetch user session", error);
        setUser(null);
      })
      .finally(() => setIsLoading(false));
  }, [setUser]);

  // Add this useEffect to monitor user changes and manage loading state
  useEffect(() => {
    console.log("Current user state:", user);
    setIsLoading(false); // Update the loading state based on user state changes
  }, [user]); // Depend on user to re-trigger this effect

  const toggleClass = () => {
    setIsActive(!isActive);
    document.body.classList.toggle("cs-open");
  };

  const ariaExpanded = isActive ? "true" : "false";
  const handleLogout = async () => {
    try {
      const response = await axios.post(
        "/api/logout",
        {},
        { withCredentials: true }
      );
      if (response.data.success) {
        setUser(null);
        navigate("/");
      } else {
        alert("Logout failed: " + response.data.message);
      }
    } catch (error) {
      alert("Logout error: " + error.message);
    }
  };

  if (isLoading) return <p>Loading...</p>; // Render loading indicator while user info is fetching

  const onPatientPortal = location.pathname.includes("/patient-portal");
  const onStaffPortal = location.pathname.includes("/staff-portal");

  // Consider user type to determine navigation links
  const userType = user ? user.user_type_id : null;
  const isPatient = userType === 1;
  const isStaff = userType === 2;

  return (
    <header
      id="cs-navigation"
      className={`cs-container ${isActive ? "cs-active" : ""}`}
    >
      <div className="nav-logo">
        <Link to="/" aria-label="Home">
          <img src={logo} alt="Company Logo" height="60" />
        </Link>
      </div>
      <div className="nav-contents">
        <nav className="cs-nav" role="navigation">
          <ul className="cs-ul">
            {onPatientPortal ? (
              // Patient-specific links
              <>
                <li className="cs-li">
                  <Link to="/patient-portal" className="cs-li-link">
                    Dashboard
                  </Link>
                </li>
                <li className="cs-li">
                  <Link to="/patient-portal/schedule" className="cs-li-link">
                    Schedule Appointment
                  </Link>
                </li>
                <li className="cs-li">
                  <Link
                    to="/patient-portal/appointments"
                    className="cs-li-link"
                  >
                    My Appointments
                  </Link>
                </li>

                <li className="cs-li">
                  <Link to="/patient-portal/messages" className="cs-li-link">
                    Messages
                  </Link>
                </li>
                <li className="cs-li">
                  <Link to="/patient-portal/reminders" className="cs-li-link">
                    Reminders
                  </Link>
                </li>
                <li className="cs-li">
                  <Link to="/patient-portal/help" className="cs-li-link">
                    Help
                  </Link>
                </li>
                <li className="cs-li">
                  <Link to="/patient-portal/settings" className="cs-li-link">
                    Settings
                  </Link>
                </li>
                <li className="cs-li">
                  <Link onClick={handleLogout} className="cs-li-link">
                    Logout
                  </Link>
                </li>
              </>
            ) : onStaffPortal ? (
              // Staff-specific links
              <>
                <li className="cs-li">
                  <Link to="/staff-portal" className="cs-li-link">
                    Dashboard
                  </Link>
                </li>
                <li className="cs-li">
                  <Link to="/staff-portal/appointments" className="cs-li-link">
                    Appointments
                  </Link>
                </li>
                <li className="cs-li">
                  <Link to="/staff-portal/patients" className="cs-li-link">
                    Patients
                  </Link>
                </li>
                <li className="cs-li">
                  <Link to="/staff-portal/schedule" className="cs-li-link">
                    Schedule
                  </Link>
                </li>
                <li className="cs-li">
                  <Link to="/staff-portal/messages" className="cs-li-link">
                    Messages
                  </Link>
                </li>
                <li className="cs-li">
                  <Link to="/staff-portal/help" className="cs-li-link">
                    Help
                  </Link>
                </li>
                <li className="cs-li">
                  <Link to="/staff-portal/settings" className="cs-li-link">
                    Settings
                  </Link>
                </li>
                <li className="cs-li">
                  <Link onClick={handleLogout} className="cs-li-link">
                    Logout
                  </Link>
                </li>
              </>
            ) : (
              // General links
              <>
                <li className="cs-li">
                  <Link to="/" className="cs-li-link">
                    Home
                  </Link>
                </li>
                <li className="cs-li">
                  <Link to="/about-us" className="cs-li-link">
                    About Us
                  </Link>
                </li>
                <li className="cs-li">
                  <Link to="/services" className="cs-li-link">
                    Services
                  </Link>
                </li>
                <li className="cs-li">
                  <a className="locations-offCanvas">
                    {["Locations"].map((placement, idx) => (
                      <OffCanvasExample
                        key={idx}
                        placement={placement}
                        name={placement}
                      />
                    ))}
                  </a>
                </li>
                <li className="cs-li">
                  <Link to="/faq" className="cs-li-link">
                    FAQ
                  </Link>
                </li>
                {!isLoading && user ? (
                  <>
                    {user.user_type_id === 1 && (
                      <li className="cs-li">
                        <Link to="/patient-portal" className="cs-li-link">
                          Patient Portal
                        </Link>
                      </li>
                    )}
                    {user.user_type_id === 2 && (
                      <li className="cs-li">
                        <Link to="/staff-portal" className="cs-li-link">
                          Staff Portal
                        </Link>
                      </li>
                    )}
                    <li className="cs-li">
                      <Link onClick={handleLogout} className="cs-li-link">
                        Logout
                      </Link>
                    </li>
                  </>
                ) : (
                  <li className="cs-li">
                    <Link to="/register" className="cs-li-link">
                      Register
                    </Link>
                  </li>
                )}
              </>
            )}
          </ul>
        </nav>
      </div>
    </header>
  );
};

function OffCanvasExample({ name, ...props }) {
  const [show, setShow] = useState(false);

  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);

  return (
    <>
      <Button variant="primary" onClick={handleShow} className="me-2">
        {name}
      </Button>
      <Offcanvas
        show={show}
        onHide={handleClose}
        {...props}
        style={{ height: "100vh" }}
      >
        <Offcanvas.Header closeButton>
          <Offcanvas.Title>Locations</Offcanvas.Title>
        </Offcanvas.Header>
        <Offcanvas.Body>
          <Row md={4} className="g-4" style={{ paddingBottom: "30px" }}>
            <Col>
              <Card className="card-custom">
                <Card.Img variant="top" src={abingdon} />
                <Card.Body className="card-body-custom">
                  <Card.Title>Abingdon, MD</Card.Title>
                  <Card.Text>
                    <a
                      href="https://www.google.co.in/maps/place/3401+Box+Hill+Corporate+Center+Dr+%23204,+Abingdon,+MD+21009,+USA/@39.4699013,-76.3073882,17z/data=!3m1!4b1!4m5!3m4!1s0x89c7e7bb59f7dffd:0x91acbf32e7b2c579!8m2!3d39.4698972!4d-76.3051995"
                      style={{ textDecoration: "none", fontWeight: "bold" }}
                    >
                      3401 Box Hill Corporate Center Drive, Suite 204, Abingdon,
                      MD 21009
                    </a>
                  </Card.Text>
                </Card.Body>
              </Card>
            </Col>
            <Col>
              <Card className="card-custom">
                <Card.Img variant="top" src={belAir} />
                <Card.Body className="card-body-custom">
                  <Card.Title>Bel Air, MD</Card.Title>
                  <Card.Text>
                    <a
                      href="https://www.google.com/maps/place/510+Upper+Chesapeake+Dr+%23517,+Bel+Air,+MD+21014/@39.5192079,-76.3457562,16z/data=!4m6!3m5!1s0x89c7ddea24915ca7:0xf5587565897aef2d!8m2!3d39.5192079!4d-76.3457562!16s%2Fg%2F11nsw6bhnt?entry=ttu"
                      style={{ textDecoration: "none", fontWeight: "bold" }}
                    >
                      510 Upper Chesapeake Drive, Suite 509, Bel Air, MD 21014
                    </a>
                  </Card.Text>
                </Card.Body>
              </Card>
            </Col>
            <Col>
              <Card className="card-custom">
                <Card.Img variant="top" src={baltimore} />
                <Card.Body className="card-body-custom">
                  <Card.Title>Baltimore, MD</Card.Title>
                  <Card.Text>
                    <a
                      href="https://www.google.co.in/maps/place/540+E+Belvedere+Ave+%23204,+Baltimore,+MD+21212/@39.3645422,-76.6085421,16z/data=!3m1!4b1!4m6!3m5!1s0x89c805636eedce03:0xc289c4d63878cd36!8m2!3d39.3645422!4d-76.6085421!16s%2Fg%2F11sn00jy23?entry=ttu"
                      style={{ textDecoration: "none", fontWeight: "bold" }}
                    >
                      540 E. Belvedere Avenue, Suite 204, Baltimore, MD 21212
                    </a>
                  </Card.Text>
                </Card.Body>
              </Card>
            </Col>
            <Col>
              <Card className="card-custom">
                <Card.Img variant="top" src={columbia} />
                <Card.Body className="card-body-custom">
                  <Card.Title>Columbia, MD</Card.Title>
                  <Card.Text>
                    <a
                      href="https://www.google.co.in/maps/place/10700+Charter+Dr+%23335,+Columbia,+MD+21044,+USA/@39.2119761,-76.8841034,17z/data=!3m1!4b1!4m5!3m4!1s0x89b7df0ddc67143d:0x78f2d9c154a03f50!8m2!3d39.211972!4d-76.8819147"
                      style={{ textDecoration: "none", fontWeight: "bold" }}
                    >
                      10700 Charter Drive, Suite 335, Columbia, MD 21044
                    </a>
                  </Card.Text>
                </Card.Body>
              </Card>
            </Col>
          </Row>
          <Row md={4} className="g-4">
            <Col>
              <Card className="card-custom">
                <Card.Img variant="top" src={essex} />
                <Card.Body className="card-body-custom">
                  <Card.Title>Essex, MD</Card.Title>
                  <Card.Text>
                    <a
                      href="https://www.google.co.in/maps/place/1124+Mace+Ave,+Essex,+MD+21221/@39.3263027,-76.4714462,17z/data=!3m1!4b1!4m6!3m5!1s0x89c80791719065f3:0x90ba45da79a06c3b!8m2!3d39.3263027!4d-76.4714462!16s%2Fg%2F11b8v4949l?entry=ttu"
                      style={{ textDecoration: "none", fontWeight: "bold" }}
                    >
                      1124 Mace Avenue, Essex, MD 21221
                    </a>
                  </Card.Text>
                </Card.Body>
              </Card>
            </Col>
            <Col>
              <Card className="card-custom">
                <Card.Img variant="top" src={glenBurnie} />
                <Card.Body className="card-body-custom">
                  <Card.Title>Glen Burnie, MD</Card.Title>
                  <Card.Text>
                    <a
                      href="https://www.google.co.in/maps/place/1811+Crain+Hwy+S+Suite+C,+Glen+Burnie,+MD+21061,+USA/@39.1410879,-76.6338481,17z/data=!3m1!4b1!4m5!3m4!1s0x89b7fcb0c5b10561:0x7162e49a51fd822d!8m2!3d39.1410838!4d-76.6316594"
                      style={{ textDecoration: "none", fontWeight: "bold" }}
                    >
                      1811 S. Crain Highway, Suite C, Glen Burnie, MD 21061
                    </a>
                  </Card.Text>
                </Card.Body>
              </Card>
            </Col>
            <Col>
              <Card className="card-custom">
                <Card.Img variant="top" src={cockeysville} />
                <Card.Body className="card-body-custom">
                  <Card.Title>Cockeysville, MD</Card.Title>
                  <Card.Text>
                    <a
                      href="https://www.google.com/maps/place/110+Old+Padonia+Rd+Suite+101,+Cockeysville,+MD+21030/@39.4574839,-76.6361249,17z/data=!4m6!3m5!1s0x89c80dfea31583ab:0xc4d2c7cd76d5559e!8m2!3d39.4574839!4d-76.6361249!16s%2Fg%2F11s323qzqx?entry=ttu"
                      style={{ textDecoration: "none", fontWeight: "bold" }}
                    >
                      110 Old Padonia Road, Suite 101, Cockeysville, MD 21030
                    </a>
                  </Card.Text>
                </Card.Body>
              </Card>
            </Col>
            <Col>
              <Card className="card-custom">
                <Card.Img variant="top" src={hanover} />
                <Card.Body className="card-body-custom">
                  <Card.Title>Hanover, PA</Card.Title>
                  <Card.Text>
                    <a
                      href="https://www.google.co.in/maps/place/Maryland+Vascular+Specialists+-+Hanover/@39.6613522,-76.9376243,10z/data=!4m9!1m2!2m1!1smaryland+vascular+specialists+han!3m5!1s0x89c859833ffbf2ef:0x360ab6fc2c5f234f!8m2!3d39.8255953!4d-76.9685367!16s%2Fg%2F11c4c2tslb?entry=ttu"
                      style={{ textDecoration: "none", fontWeight: "bold" }}
                    >
                      250 Fame Avenue, Suite 201, Hanover, PA 17331
                    </a>
                  </Card.Text>
                </Card.Body>
              </Card>
            </Col>
          </Row>
        </Offcanvas.Body>
      </Offcanvas>
    </>
  );
}

export default Navigation;
