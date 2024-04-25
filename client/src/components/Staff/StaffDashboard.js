import React from "react";
import NavBar from "../homepage-things/NavigationBar";
import "./StaffPortal.css";
import { Card, CardGroup, Table, Form, Toast } from "react-bootstrap";
import doc from "../images/doc.webp";

const StaffDashboard = () => {
  return (
    <div>
      {/* NavBar */}
      <NavBar />

      {/* First CardGroup */}
      <CardGroup>
        {/* Card 1: Staff Information */}
        <Card>
          <Card.Header className="card-content-center">
            <Card.Title> Staff Information </Card.Title>
          </Card.Header>
          <Card.Body className="card-content-center">
            <Card.Text>
              {/* Display staff user's name, profile picture, and basic information */}
              <img src={doc} style={{ width: "40%" }} />
              <p> </p>
              <p>Name: Jane Doe</p>
              <p>Role: Doctor</p>
              <p>Department: Pediatrics</p>
            </Card.Text>
          </Card.Body>
        </Card>

        {/* Card 2: Upcoming Appointments List */}
        <Card>
          <Card.Header className="card-content-center">
            <Card.Title>Upcoming Appointments</Card.Title>
          </Card.Header>
          <Card.Body>
            <Table striped bordered hover>
              <thead>
                <tr>
                  <th> ApptID </th>
                  <th> PatientName </th>
                  <th> Date </th>
                  <th> Time </th>
                </tr>
              </thead>
              <tbody>
                <tr>
                  <td>1</td>
                  <td></td>
                  <td></td>
                  <td></td>
                </tr>
                <tr>
                  <td>2</td>
                  <td></td>
                  <td></td>
                  <td></td>
                </tr>
                <tr>
                  <td>3</td>
                  <td></td>
                  <td></td>
                  <td></td>
                </tr>
                <tr>
                  <td>4</td>
                  <td></td>
                  <td></td>
                  <td></td>
                </tr>
                <tr>
                  <td>5</td>
                  <td></td>
                  <td></td>
                  <td></td>
                </tr>
                <tr>
                  <td>6</td>
                  <td></td>
                  <td></td>
                  <td></td>
                </tr>
              </tbody>
            </Table>
          </Card.Body>
        </Card>

        {/* Card 3: Calendar / Schedule */}
        <Card>
          <Card.Header className="card-content-center">
            <Card.Title> Calendar </Card.Title>
          </Card.Header>
          <Card.Body>
            <Card.Text>
              {/* Monthly calendar view or weekly schedule layout */}
              <p>Calendar goes here</p>
            </Card.Text>
          </Card.Body>
        </Card>
      </CardGroup>

      {/* Second CardGroup */}
      <CardGroup>
        {/* Card 4: Task List */}
        <Card>
          <Card.Header className="card-content-center">
            <Card.Title> Task List </Card.Title>
          </Card.Header>
          <Card.Body>
            {/* Display the task list with checkboxes */}
            <Form>
              {/* Task 1 */}
              <div key={`task-1`} className="mb-3">
                <Form.Check type="checkbox" id={`task-1`} label={`Task 1`} />
              </div>
              {/* Task 2 */}
              <div key={`task-2`} className="mb-3">
                <Form.Check type="checkbox" id={`task-2`} label={`Task 2`} />
              </div>
              {/* Task 3 */}
              <div key={`task-3`} className="mb-3">
                <Form.Check type="checkbox" id={`task-3`} label={`Task 3`} />
              </div>
              {/* Task 4 */}
              <div key={`task-4`} className="mb-3">
                <Form.Check type="checkbox" id={`task-4`} label={`Task 4`} />
              </div>
            </Form>
          </Card.Body>
        </Card>

        {/* Card 5: Messages */}
        <Card>
          <Card.Header className="card-content-center">
            <Card.Title> Metrics </Card.Title>
          </Card.Header>
          <Card.Body>
            <Card.Text>
              {" "}
              <p>messages go here</p>
            </Card.Text>
          </Card.Body>
        </Card>

        {/* Card 6: Messages */}
        <Card>
          <Card.Header className="card-content-center">
            <Card.Title> New Messages </Card.Title>
          </Card.Header>
          <Card.Body className="d-flex flex-column align-items-center gap-3">
            <Toast>
              <Toast.Header>
                <strong className="me-auto">Patient A</strong>
                <small>2 mins ago</small>
              </Toast.Header>
              <Toast.Body>Hello doctor!</Toast.Body>
            </Toast>
            <Toast>
              <Toast.Header>
                <strong className="me-auto">Patient B</strong>
                <small>11 mins ago</small>
              </Toast.Header>
              <Toast.Body>Thank you doctor!</Toast.Body>
            </Toast>
          </Card.Body>
        </Card>
      </CardGroup>
    </div>
  );
};

export default StaffDashboard;
