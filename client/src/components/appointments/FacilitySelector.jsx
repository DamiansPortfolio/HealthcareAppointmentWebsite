import React, { useState, useEffect } from "react";
import { Form } from "react-bootstrap";
import axios from "axios";

const FacilitySelector = ({ onFacilitySelect }) => {
  const [facilities, setFacilities] = useState([]);
  const [selectedFacility, setSelectedFacility] = useState("");

  useEffect(() => {
    axios
      .get("/api/facilities")
      .then((response) => {
        console.log(response.data); // Check the data in the console to ensure IDs are unique
        setFacilities(response.data);
      })
      .catch((error) => console.error("Error fetching facilities:", error));
  }, []);

  const handleSelect = (event) => {
    const selectedId = event.target.value;
    setSelectedFacility(selectedId);
    onFacilitySelect(selectedId);
  };

  return (
    <Form.Group>
      <Form.Label>Select a Facility</Form.Label>
      <Form.Control
        as="select"
        value={selectedFacility}
        onChange={handleSelect}
      >
        <option value="">Choose...</option>
        {facilities.map((facility) => (
          // Ensure `facility.id` is a unique value
          <option
            key={facility.facility_number}
            value={facility.facility_number}
          >
            {facility.facility_name}
          </option>
        ))}
      </Form.Control>
    </Form.Group>
  );
};

export default FacilitySelector;
