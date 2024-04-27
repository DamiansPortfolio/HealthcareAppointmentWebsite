import React, { useState, useEffect, useCallback } from "react";
import NavBar from "../homepage-things/NavigationBar";
import { Card, CardGroup, Form } from "react-bootstrap";
import FacilitySelector from "./FacilitySelector";
import DepartmentSelector from "./DepartmentSelector";
import DoctorSelector from "./DoctorSelector";
import FullCalendar from "@fullcalendar/react";
import dayGridPlugin from "@fullcalendar/daygrid";
import interactionPlugin from "@fullcalendar/interaction";
import axios from "axios";
import { useUser } from "../UserContext";

const StaffDashboard = () => {
  const [selectedFacilityId, setSelectedFacilityId] = useState("");
  const [selectedDepartmentId, setSelectedDepartmentId] = useState("");
  const [selectedDoctorId, setSelectedDoctorId] = useState("");
  const [selectedDate, setSelectedDate] = useState("");
  const [availableTimeSlots, setAvailableTimeSlots] = useState([]);

  const { user } = useUser(); // Destructure to get the user object directly from the context
  const ssn = user?.ssn; // Optional chaining to safely access SSN

  useEffect(() => {
    console.log("Effect for fetching slots:", {
      selectedDoctorId,
      selectedDate,
    });
    if (selectedDoctorId && selectedDate) {
      fetchAvailableTimeSlots(selectedDoctorId, selectedDate);
    }
  }, [selectedDoctorId, selectedDate]); // Only refetch when these values change

  const handleFacilitySelect = useCallback((facilityId) => {
    console.log("Facility selected:", facilityId);
    setSelectedFacilityId(facilityId);
    setSelectedDepartmentId(""); // Reset department when facility changes
    setSelectedDoctorId(""); // Reset doctor when facility changes
  }, []);

  const handleDepartmentSelect = useCallback((departmentId) => {
    console.log("Department selected:", departmentId);
    setSelectedDepartmentId(departmentId);
    setSelectedDoctorId(""); // Reset doctor when department changes
  }, []);

  const handleDoctorSelect = useCallback((doctorId) => {
    console.log("Doctor selected:", doctorId);
    setSelectedDoctorId(doctorId);
    setAvailableTimeSlots([]);
  }, []);

  const handleDateSelect = useCallback((event) => {
    console.log("Date selected:", event.target.value);
    setSelectedDate(event.target.value);
  }, []);

  const fetchAvailableTimeSlots = useCallback((doctorId, date) => {
    console.log("Fetching time slots for:", { doctorId, date });
    axios
      .get(`/api/doctor-availability/${doctorId}`, { params: { date: date } })
      .then((response) => {
        console.log("Available Time Slots:", response.data);
        setAvailableTimeSlots(response.data);
      })
      .catch((error) => console.error("Error fetching time slots:", error));
  }, []);

  const handleTimeSlotSelection = (event) => {
    const selectedTime = event.target.value;
    const [startTime, endTime] = selectedTime.split("-");

    if (!ssn) {
      console.error("No SSN found for the logged-in user");
      alert("No SSN found. Please log in again.");
      return; // Stop further execution if SSN is not available
    }

    axios
      .post("/api/book-appointment", {
        doctor_ssn: selectedDoctorId,
        date: selectedDate,
        start_time: startTime,
        end_time: endTime,
        department_id: selectedDepartmentId,
        patient_ssn: ssn,
      })
      .then((response) => {
        console.log("Appointment booked:", response.data);
        fetchAvailableTimeSlots(selectedDoctorId, selectedDate); // Refresh slots after booking
      })
      .catch((error) => {
        console.error("Error booking appointment:", error);
        alert("Failed to book appointment: " + error.message);
      });
  };

  return (
    <div>
      <NavBar />
      <CardGroup>
        <Card>
          <Card.Header className="card-content-center">
            <Card.Title>Schedule Appointment</Card.Title>
          </Card.Header>
          <Card.Body className="card-content-center">
            <FacilitySelector onFacilitySelect={handleFacilitySelect} />
            {selectedFacilityId && (
              <DepartmentSelector
                facilityId={selectedFacilityId}
                onDepartmentSelect={handleDepartmentSelect}
              />
            )}
            {selectedDepartmentId && (
              <DoctorSelector
                departmentId={selectedDepartmentId}
                onDoctorSelect={handleDoctorSelect}
              />
            )}
            {selectedDoctorId && (
              <Form.Group>
                <Form.Label>Select Date</Form.Label>
                <Form.Control
                  type="date"
                  value={selectedDate}
                  onChange={handleDateSelect}
                />
              </Form.Group>
            )}
            {availableTimeSlots.length > 0 && (
              <Form.Group>
                <Form.Label>Select Time Slot</Form.Label>
                <Form.Control as="select" onChange={handleTimeSlotSelection}>
                  <option value="">Choose...</option>
                  {availableTimeSlots.map((timeSlot, index) => (
                    <option
                      key={index}
                      value={`${timeSlot.start_time}-${timeSlot.end_time}`}
                    >
                      {`${timeSlot.start_time} to ${timeSlot.end_time}`}
                    </option>
                  ))}
                </Form.Control>
              </Form.Group>
            )}
          </Card.Body>
        </Card>
        <Card>
          <Card.Header className="card-content-center">
            <Card.Title>Upcoming Appointments</Card.Title>
          </Card.Header>
          <Card.Body></Card.Body>
        </Card>
        <Card>
          <Card.Header className="card-content-center">
            <Card.Title>Calendar</Card.Title>
          </Card.Header>
          <Card.Body>
            <FullCalendar
              plugins={[dayGridPlugin, interactionPlugin]}
              initialView="dayGridMonth"
            />
          </Card.Body>
        </Card>
      </CardGroup>
    </div>
  );
};

export default StaffDashboard;
