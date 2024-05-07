import React, { useState, useContext } from "react";
import {
  Form,
  Button,
  Container,
  Row,
  Col,
  Card,
  Spinner,
} from "react-bootstrap";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { useUser } from "./UserContext"; // Adjust import if you are using a custom hook or keep useContext if not
import { Link } from "react-router-dom";

import "bootstrap/dist/css/bootstrap.min.css";
import icon from "./images/icon.webp";

import "./homepage-things/HomePage.css";

const UserLoginHandler = () => {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const navigate = useNavigate();
  const { setUser } = useUser(); // Change to useUser if you've created a custom hook, or keep useContext(UserContext) if directly using context
  const [loading, setLoading] = useState(false); // State to manage loading

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true); // Start loading before the API call

    try {
      const response = await axios.post(
        "/api/login",
        { username, password },
        { withCredentials: true }
      );
      console.log(response.data); // Log the full response data
      if (response.data.success) {
        setUser({
          username: response.data.username,
          user_type_id: response.data.user_type_id,
          ssn: response.data.ssn, // This assumes the response contains the 'ssn'
        });
        navigateBasedOnUserType(response.data.user_type_id);
      } else {
        alert(response.data.message); // Display login error message
      }
    } catch (error) {
      const message = error.response
        ? error.response.data.message
        : "Login failed with network or server error.";
      alert(message); // Display network or server error message
    }
    setLoading(false); // End loading after the API call
  };

  // Helper function to navigate based on user type
  const navigateBasedOnUserType = (userType) => {
    switch (parseInt(userType, 10)) {
      case 1:
        navigate("/patient-portal"); // Modify as necessary
        break;
      case 2:
        navigate("/staff-portal"); // Assuming this for normal users
        break;
      case 3:
        navigate("/"); // Assuming this for admin users
        break;
      default:
        alert("Invalid user type: " + userType); // Alert invalid user type
    }
  };

  return (
    <div>
      <Card bg="dark" text="white">
        <Card.Header>
          <strong className="text-light">User Login</strong>
        </Card.Header>
        <Card.Body>
          <Form onSubmit={handleSubmit}>
            <Form.Group controlId="username" className="mb-3">
              <Form.Label>Username</Form.Label>
              <Form.Control
                type="text"
                placeholder="Enter username"
                value={username}
                onChange={(e) => setUsername(e.target.value)}
              />
            </Form.Group>
            <Form.Group controlId="password">
              <Form.Label>Password</Form.Label>
              <Form.Control
                type="password"
                placeholder="Password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
              />
            </Form.Group>
            <Button variant="primary" type="submit" className="mt-3">
              {loading ? (
                <Spinner
                  as="span"
                  animation="border"
                  size="sm"
                  role="status"
                  aria-hidden="true"
                />
              ) : (
                "Login"
              )}
            </Button>
          </Form>
        </Card.Body>
      </Card>

      <Card bg="dark" text="white" className="mt-3">
        <Card.Header>
          <strong className="text-light">New to us?</strong>
        </Card.Header>
        <Card.Body>
          <Card.Img src={icon} style={{ width: "40%" }} />
          <p>Sign up now to explore our amazing features and services.</p>
          <Button variant="primary" as={Link} to="/register">
            Register
          </Button>
        </Card.Body>
      </Card>
    </div>
  );
};

export default UserLoginHandler;
