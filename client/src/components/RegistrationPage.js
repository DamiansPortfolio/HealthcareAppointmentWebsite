import React, { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css"; // Ensure the DatePicker CSS is imported

function RegistrationPage() {
  const [formData, setFormData] = useState({
    username: "",
    password: "",
    first_name: "",
    middle_name: "",
    last_name: "",
    sex: "",
    date_of_birth: new Date(), // This will now be a Date object
    phone_number: "",
    street: "",
    city: "",
    state: "",
    zip_code: "",
    email: "",
    facility_number: "",
    ssn: "", // Add this line
  });

  const navigate = useNavigate();

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleDateChange = (date) => {
    setFormData((prev) => ({
      ...prev,
      date_of_birth: date, // Directly setting Date object to state
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const submitData = {
      ...formData,
      date_of_birth: formData.date_of_birth.toISOString().slice(0, 10), // Formatting the date to 'YYYY-MM-DD'
    };
    try {
      const response = await axios.post(
        "http://localhost:5000/api/register", // Ensure this is the correct endpoint URL
        submitData
      );
      console.log(response.data); // Log the response data
      alert("Registration Successful");
      navigate("/login"); // Navigate to login page upon successful registration
    } catch (error) {
      alert(
        "Registration Failed: " +
          (error.response?.data?.message || error.message)
      ); // More detailed error handling
      console.error(error);
    }
  };

  return (
    <div>
      <h1>Register</h1>
      <form onSubmit={handleSubmit}>
        <input
          type="text"
          name="username"
          value={formData.username}
          onChange={handleChange}
          placeholder="Username"
          required
        />
        <input
          type="password"
          name="password"
          value={formData.password}
          onChange={handleChange}
          placeholder="Password"
          required
        />
        <input
          type="text"
          name="first_name"
          value={formData.first_name}
          onChange={handleChange}
          placeholder="First Name"
          required
        />
        <input
          type="text"
          name="middle_name"
          value={formData.middle_name}
          onChange={handleChange}
          placeholder="Middle Name"
        />
        <input
          type="text"
          name="last_name"
          value={formData.last_name}
          onChange={handleChange}
          placeholder="Last Name"
          required
        />
        <select
          name="sex"
          value={formData.sex}
          onChange={handleChange}
          required
        >
          <option value="">Select Sex</option>
          <option value="M">Male</option>
          <option value="F">Female</option>
          <option value="O">Other</option>
        </select>
        <DatePicker
          selected={formData.date_of_birth}
          onChange={handleDateChange}
          dateFormat="yyyy-MM-dd"
          peekNextMonth
          showMonthDropdown
          showYearDropdown
          dropdownMode="select"
          maxDate={new Date()}
          className="form-control"
        />
        <input
          type="text"
          name="phone_number"
          value={formData.phone_number}
          onChange={handleChange}
          placeholder="Phone Number"
          required
        />
        <input
          type="text"
          name="street"
          value={formData.street}
          onChange={handleChange}
          placeholder="Street"
          required
        />
        <input
          type="text"
          name="city"
          value={formData.city}
          onChange={handleChange}
          placeholder="City"
          required
        />
        <input
          type="text"
          name="state"
          value={formData.state}
          onChange={handleChange}
          placeholder="State"
          maxLength="2"
          required
        />
        <input
          type="text"
          name="zip_code"
          value={formData.zip_code}
          onChange={handleChange}
          placeholder="Zip Code"
          maxLength="5"
          required
        />
        <input
          type="email"
          name="email"
          value={formData.email}
          onChange={handleChange}
          placeholder="Email"
          required
        />
        <input
          type="text"
          name="facility_number"
          value={formData.facility_number}
          onChange={handleChange}
          placeholder="Facility Number"
          required
        />
        <input
          type="text"
          name="ssn"
          value={formData.ssn}
          onChange={handleChange}
          placeholder="SSN"
          required
        />

        <button type="submit">Register</button>
      </form>
    </div>
  );
}

export default RegistrationPage;
