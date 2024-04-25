import NavBar from "../homepage-things/NavigationBar";
import {
  Card,
  CardGroup,
  Table,
  Form,
  Toast,
  Modal,
  Button,
} from "react-bootstrap";
import doc from "../images/doc.webp";

import axios from "axios";
import UserContext from "../UserContext"; // Import the UserContext
import React, { useState, useEffect, useContext } from "react";
import FullCalendar from "@fullcalendar/react";
import dayGridPlugin from "@fullcalendar/daygrid";
import interactionPlugin from "@fullcalendar/interaction";

const StaffDashboard = () => {
  const [events, setEvents] = useState([]);
  const { user } = useContext(UserContext);
  const [showModal, setShowModal] = useState(false);
  const [selectedDate, setSelectedDate] = useState("");

  // Fetch appointments from the backend
  useEffect(() => {
    const fetchEvents = async () => {
      try {
        const response = await axios.get(
          "http://localhost:5000/api/appointments"
        );
        const formattedEvents = response.data.map((appointment) => ({
          title: appointment.type,
          date: appointment.date,
          // Include other event properties as needed
        }));
        setEvents(formattedEvents);
      } catch (error) {
        console.error("Error fetching events:", error);
      }
    };

    fetchEvents();
  }, []);

  const handleDateClick = (info) => {
    console.log("Date clicked:", info.dateStr);

    setSelectedDate(info.dateStr);
    setShowModal(true);
  };

  const handleSaveAppointment = async (appointmentDetails) => {
    try {
      const response = await axios.post(
        "http://localhost:5000/api/appointments",
        {
          ...appointmentDetails,
          patient_ssn: user.ssn, // Assuming SSN is part of user context
        }
      );
      setEvents([
        ...events,
        { title: appointmentDetails.type, date: appointmentDetails.date },
      ]);
      setShowModal(false); // Close modal on success
      console.log("Appointment added:", response.data);
    } catch (error) {
      console.error("Error adding appointment:", error);
    }
  };

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
            <AppointmentModal
              show={showModal}
              onHide={() => setShowModal(false)}
              onSave={handleSaveAppointment}
              appointmentDate={selectedDate}
            />{" "}
            <FullCalendar
              plugins={[dayGridPlugin, interactionPlugin]}
              initialView="dayGridMonth"
              dateClick={handleDateClick} // Pass handleDateClick function here
            />
          </Card.Body>
        </Card>
      </CardGroup>
    </div>
  );
};

function AppointmentModal({ show, onHide, onSave, appointmentDate }) {
  const [type, setType] = useState("");
  const [time, setTime] = useState("");
  const [location, setLocation] = useState("");

  const handleSubmit = () => {
    onSave({ date: appointmentDate, type, time, location });
    onHide(); // Close modal after saving
  };

  return (
    <Modal show={show} onHide={onHide} centered>
      <Modal.Header closeButton>
        <Modal.Title>Add New Appointment</Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <Form>
          <Form.Group className="mb-3">
            <Form.Label>Type</Form.Label>
            <Form.Control
              type="text"
              placeholder="Enter appointment type"
              value={type}
              onChange={(e) => setType(e.target.value)}
            />
          </Form.Group>
          <Form.Group className="mb-3">
            <Form.Label>Time</Form.Label>
            <Form.Control
              type="time"
              placeholder="Appointment time"
              value={time}
              onChange={(e) => setTime(e.target.value)}
            />
          </Form.Group>
          <Form.Group className="mb-3">
            <Form.Label>Location</Form.Label>
            <Form.Control
              type="text"
              placeholder="Location"
              value={location}
              onChange={(e) => setLocation(e.target.value)}
            />
          </Form.Group>
          <Button variant="primary" onClick={handleSubmit}>
            Save Appointment
          </Button>
        </Form>
      </Modal.Body>
    </Modal>
  );
}

export default StaffDashboard;
