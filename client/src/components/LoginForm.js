import React from "react";
import { Form, Button } from "react-bootstrap";

const LoginForm = () => {
  return (
    <Form className="login-form">
      <Form.Group className="mb-3" controlId="formBasicEmail">
        <Form.Label>Username:</Form.Label>
        <Form.Control type="text" placeholder="Enter username" />
      </Form.Group>

      <Form.Group className="mb-3" controlId="formBasicPassword">
        <Form.Label>Password:</Form.Label>
        <Form.Control type="password" placeholder="Password" />
      </Form.Group>

      <Button variant="primary" type="submit">
        Submit
      </Button>

      <div className="forgot-links">
        <a href="#forgot-username">Forgot Username?</a>
        <a href="#forgot-password">Forgot Password?</a>
      </div>
    </Form>
  );
};

export default LoginForm;
