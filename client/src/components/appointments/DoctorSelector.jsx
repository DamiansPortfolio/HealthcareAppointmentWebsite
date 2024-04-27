import React, { useState, useEffect } from "react";
import axios from "axios";
import { Form } from "react-bootstrap";

const DoctorSelector = ({ departmentId, onDoctorSelect }) => {
  const [doctors, setDoctors] = useState([]);
  const [selectedDoctor, setSelectedDoctor] = useState("");

  useEffect(() => {
    if (departmentId) {
      axios
        .get(`/api/departments/${departmentId}/doctors`)
        .then((response) => {
          console.log("Doctors Data fetched:", response.data);
          setDoctors(response.data);
          if (response.data.length > 0) {
            setSelectedDoctor(response.data[0].doctor_ssn);
            onDoctorSelect(response.data[0].doctor_ssn);
          } else {
            setSelectedDoctor("");
            onDoctorSelect("");
          }
        })
        .catch((error) => {
          console.error("Error fetching doctors:", error);
          setSelectedDoctor("");
          onDoctorSelect("");
        });
    } else {
      setDoctors([]);
      setSelectedDoctor("");
      onDoctorSelect("");
    }
  }, [departmentId, onDoctorSelect]);

  const handleChange = (event) => {
    setSelectedDoctor(event.target.value);
    onDoctorSelect(event.target.value);
  };

  return (
    <Form.Group>
      <Form.Label>Select a Doctor</Form.Label>
      <Form.Control
        as="select"
        value={selectedDoctor || ""}
        onChange={handleChange}
      >
        <option value="">Choose...</option>
        {doctors.map((doctor) => (
          <option key={doctor.doctor_ssn} value={doctor.doctor_ssn}>
            {doctor.name}
          </option>
        ))}
      </Form.Control>
    </Form.Group>
  );
};

export default DoctorSelector;
