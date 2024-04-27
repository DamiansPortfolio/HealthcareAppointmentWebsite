// DepartmentSelector.js
import React, { useState, useEffect } from "react";
import axios from "axios";
import { Form } from "react-bootstrap";

const DepartmentSelector = ({ facilityId, onDepartmentSelect }) => {
  const [departments, setDepartments] = useState([]);

  useEffect(() => {
    if (facilityId) {
      axios
        .get(`/api/facilities/${facilityId}/departments`)
        .then((response) => {
          console.log("Departments Data:", response.data);
          setDepartments(response.data);
        })
        .catch((error) => console.error("Error fetching departments:", error));
    }
  }, [facilityId]); // Removed onDepartmentSelect from the dependency array

  const handleChange = (event) => {
    onDepartmentSelect(event.target.value);
  };

  return (
    <Form.Group>
      <Form.Label>Select a Department</Form.Label>
      <Form.Control as="select" onChange={handleChange}>
        <option value="">Choose...</option>
        {departments.map((department) => (
          <option
            key={department.department_id}
            value={department.department_id}
          >
            {department.department_name}
          </option>
        ))}
      </Form.Control>
    </Form.Group>
  );
};

export default DepartmentSelector;
