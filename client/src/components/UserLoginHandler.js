import React, { useState } from "react";
import { Form, Button, Container, Row, Col } from "react-bootstrap";
import axios from "axios";
import { useNavigate } from "react-router-dom"; // Necessary for redirection

const UserLoginHandler = () => {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const navigate = useNavigate(); // Initialize the navigation function

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.post("/api/login", { username, password });
      console.log(response.data); // Log the full response data
      if (response.data.success) {
        const userType = parseInt(response.data.user_type_id, 10); // Ensure it's an integer
        switch (userType) {
          case 1:
            navigate("/patient-portal");
            break;
          case 2:
            navigate("/staff-portal");
            break;
          case 3:
            navigate("/manager-portal");
            break;
          default:
            alert("Invalid user type: " + response.data.user_type_id); // Alert invalid user type
        }
      } else {
        alert(response.data.message); // Display login error message
      }
    } catch (error) {
      const message = error.response
        ? error.response.data.message
        : "Login failed with network or server error.";
      alert(message); // Display network or server error message
    }
  };

  return (
    <Container>
      <Row className="justify-content-md-center">
        <Col xs={12} md={6}>
          <Form onSubmit={handleSubmit}>
            <Form.Group className="mb-3" controlId="formUsername">
              <Form.Label>Username:</Form.Label>
              <Form.Control
                type="text"
                placeholder="Enter username"
                value={username}
                onChange={(e) => setUsername(e.target.value)}
              />
            </Form.Group>

            <Form.Group className="mb-3" controlId="formPassword">
              <Form.Label>Password:</Form.Label>
              <Form.Control
                type="password"
                placeholder="Password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
              />
            </Form.Group>

            <Button variant="primary" type="submit" className="w-100">
              Login
            </Button>
          </Form>
        </Col>
      </Row>
    </Container>
  );
};

export default UserLoginHandler;
