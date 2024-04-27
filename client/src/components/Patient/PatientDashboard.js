import React from "react";
import NavBar from "../homepage-things/NavigationBar";
import "./PatientPortal";
import {
  Card,
  CardGroup,
  Table,
  Form,
  Toast,
  ListGroup,
  Badge,
  Button,
} from "react-bootstrap";
import patient from "../images/patient.png";

const PatientDashboard = () => {
  return (
    <div>
      {/* NavBar */}
      <NavBar />

      {/* First CardGroup */}
      <CardGroup>
        {/* Card 1: Patient Information */}
        <Card>
          <Card.Header className="card-content-center">
            <Card.Title> Patient Profile </Card.Title>
          </Card.Header>
          <Card.Body className="card-content-center">
            <Card.Text>
              {/* Display staff user's name, profile picture, and basic information */}
              <img src={patient} style={{ width: "40%" }} />
              <p> </p>
              <p>Name: John Doe</p>
              <p>Age: 40</p>
              <p>Height (ft): 5.6</p>
              <p>Weight (lbs): 170</p>
            </Card.Text>
          </Card.Body>
        </Card>

        {/* Card 2: My Reports */}
        <Card>
          <Card.Header className="card-content-center">
            <Card.Title>
              My Reports <Badge bg="primary"> 4 </Badge>
            </Card.Title>
          </Card.Header>
          <Card.Body>
            <ListGroup variant="flush">
              <ListGroup.Item className="d-flex justify-content-between align-items-center">
                <div>
                  Glucose
                  <br />
                  <small>Test Date: March 6, 2024</small>
                  <br />
                </div>
                <Button variant="primary" size="sm">
                  View
                </Button>
              </ListGroup.Item>

              <ListGroup.Item className="d-flex justify-content-between align-items-center">
                <div>
                  Blood Test
                  <br />
                  <small>Test Date: March 5, 2024</small>
                  <br />
                </div>
                <Button variant="primary" size="sm">
                  View
                </Button>
              </ListGroup.Item>

              <ListGroup.Item className="d-flex justify-content-between align-items-center">
                <div>
                  Full body x-ray
                  <br />
                  <small>Test Date: February 18, 2024</small>
                  <br />
                </div>
                <Button variant="primary" size="sm">
                  View
                </Button>
              </ListGroup.Item>

              <ListGroup.Item className="d-flex justify-content-between align-items-center">
                <div>
                  Calcium level
                  <br />
                  <small>Test Date: January 2, 2024</small>
                  <br />
                </div>
                <Button variant="primary" size="sm">
                  View
                </Button>
              </ListGroup.Item>
            </ListGroup>
          </Card.Body>
        </Card>

        {/* Card 3: Calendar / Schedule */}
        <Card>
          <Card.Header className="card-content-center">
            <Card.Title> Doctor Appointments </Card.Title>
          </Card.Header>
          <Card.Body>
            <Card.Text>
              <p>Calendar goes here</p>
            </Card.Text>
          </Card.Body>
        </Card>
      </CardGroup>

      {/* Second CardGroup */}
      <CardGroup>
        {/* Card 4: Messages */}
        <Card>
          <Card.Header className="card-content-center">
            <Card.Title>
              New Messages <Badge bg="primary"> 2 </Badge>
            </Card.Title>
          </Card.Header>
          <Card.Body className="d-flex flex-column align-items-center gap-3">
            <Toast>
              <Toast.Header>
                <strong className="me-auto">Doctor A</strong>
                <small>20 mins ago</small>
              </Toast.Header>
              <Toast.Body>No problem!</Toast.Body>
            </Toast>
            <Toast>
              <Toast.Header>
                <strong className="me-auto">Doctor B</strong>
                <small>2 hours ago</small>
              </Toast.Header>
              <Toast.Body>See you tomorrow!</Toast.Body>
            </Toast>
          </Card.Body>
        </Card>

        {/* Card 5: To Do List */}
        <Card>
          <Card.Header className="card-content-center">
            <Card.Title> To Do List </Card.Title>
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

        {/* Card 6: Upcoming Appointments List */}
        <Card>
          <Card.Header className="card-content-center">
            <Card.Title>Upcoming </Card.Title>
          </Card.Header>
          <Card.Body>
            <Table striped bordered hover>
              <thead>
                <tr>
                  <th> ApptID </th>
                  <th> ApptType </th>
                  <th> DoctorName </th>
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
                  <td></td>
                </tr>
                <tr>
                  <td>2</td>
                  <td></td>
                  <td></td>
                  <td></td>
                  <td></td>
                </tr>
                <tr>
                  <td>3</td>
                  <td></td>
                  <td></td>
                  <td></td>
                  <td></td>
                </tr>
                <tr>
                  <td>4</td>
                  <td></td>
                  <td></td>
                  <td></td>
                  <td></td>
                </tr>
                <tr>
                  <td>5</td>
                  <td></td>
                  <td></td>
                  <td></td>
                  <td></td>
                </tr>
                <tr>
                  <td>6</td>
                  <td></td>
                  <td></td>
                  <td></td>
                  <td></td>
                </tr>
              </tbody>
            </Table>
          </Card.Body>
        </Card>
      </CardGroup>
    </div>
  );
};

export default PatientDashboard;
