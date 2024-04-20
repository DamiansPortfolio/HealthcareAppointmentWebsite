import React, { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css"; // Ensure the DatePicker CSS is imported

import "./RegistrationPage.css";

function RegistrationPage() {
  const [formData, setFormData] = useState({
    first_name: "",
    middle_name: "",
    last_name: "",
    ssn: "",
    sex: "",
    date_of_birth: new Date(), // This will now be a Date object
    phone_number: "",
    street: "",
    city: "",
    state: "",
    zip_code: "",
    email: "",
    facility_number: "",
    user_type_id: "",
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
    <div className="formbold-main-wrapper">
      <div className="formbold-form-wrapper">
        <form onSubmit={handleSubmit}>
          <div className="formbold-form-title">
            <h2 className="">Register now</h2>
          </div>

          <div className="formbold-input-flex">
            <div>
              <label htmlFor="first_name" className="formbold-form-label">
                First name
              </label>
              <input
                type="text"
                name="first_name"
                id="first_name"
                className="formbold-form-input"
                value={formData.first_name}
                onChange={handleChange}
                required
              />
            </div>
            <div>
              <label htmlFor="middle_name" className="formbold-form-label">
                Middle name
              </label>
              <input
                type="text"
                name="middle_name"
                id="middle_name"
                className="formbold-form-input"
                value={formData.middle_name}
                onChange={handleChange}
              />
            </div>
            <div>
              <label htmlFor="last_name" className="formbold-form-label">
                Last name
              </label>
              <input
                type="text"
                name="last_name"
                id="last_name"
                className="formbold-form-input"
                value={formData.last_name}
                onChange={handleChange}
                required
              />
            </div>
          </div>

          <div className="formbold-mb-3">
            <label htmlFor="ssn" className="formbold-form-label">
              SSN
            </label>
            <input
              type="text"
              name="ssn"
              id="ssn"
              className="formbold-form-input"
              value={formData.ssn}
              onChange={handleChange}
              required
            />
          </div>

          <div className="formbold-input-flex">
            <div>
              <label htmlFor="sex" className="formbold-form-label">
                Sex
              </label>
              <input
                type="text"
                name="sex"
                id="sex"
                className="formbold-form-input"
                value={formData.sex}
                onChange={handleChange}
                required
              />
            </div>
            <div>
              <label htmlFor="date_of_birth" className="formbold-form-label">
                Date of Birth
              </label>
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
            </div>
          </div>

          <div className="formbold-input-flex">
            <div>
              <label htmlFor="phone_number" className="formbold-form-label">
                Phone number
              </label>
              <input
                type="text"
                name="phone_number"
                id="phone_number"
                className="formbold-form-input"
                value={formData.phone_number}
                onChange={handleChange}
                required
              />
            </div>
            <div>
              <label htmlFor="street" className="formbold-form-label">
                Street
              </label>
              <input
                type="text"
                name="street"
                id="street"
                className="formbold-form-input"
                value={formData.street}
                onChange={handleChange}
                required
              />
            </div>
          </div>

          <div className="formbold-input-flex">
            <div>
              <label htmlFor="city" className="formbold-form-label">
                City
              </label>
              <input
                type="text"
                name="city"
                id="city"
                className="formbold-form-input"
                value={formData.city}
                onChange={handleChange}
                required
              />
            </div>
            <div>
              <label htmlFor="state" className="formbold-form-label">
                State
              </label>
              <input
                type="text"
                name="state"
                id="state"
                className="formbold-form-input"
                value={formData.state}
                onChange={handleChange}
                maxLength="2"
                required
              />
            </div>
            <div>
              <label htmlFor="zip_code" className="formbold-form-label">
                Zip Code
              </label>
              <input
                type="text"
                name="zip_code"
                id="zip_code"
                className="formbold-form-input"
                value={formData.zip_code}
                onChange={handleChange}
                maxLength="5"
                required
              />
            </div>
          </div>

          <div className="formbold-mb-3">
            <label htmlFor="email" className="formbold-form-label">
              Email
            </label>
            <input
              type="email"
              name="email"
              id="email"
              className="formbold-form-input"
              value={formData.email}
              onChange={handleChange}
              required
            />
          </div>

          <div className="formbold-mb-3">
            <label htmlFor="facility_number" className="formbold-form-label">
              Facility Number
            </label>
            <input
              type="text"
              name="facility_number"
              id="facility_number"
              className="formbold-form-input"
              value={formData.facility_number}
              onChange={handleChange}
              required
            />
          </div>

          <div className="formbold-mb-3">
            <label htmlFor="username" className="formbold-form-label">
              Username
            </label>
            <input
              type="text"
              name="username"
              id="username"
              className="formbold-form-input"
              value={formData.username}
              onChange={handleChange}
              required
            />
          </div>

          <div className="formbold-mb-3">
            <label htmlFor="password" className="formbold-form-label">
              Password
            </label>
            <input
              type="text"
              name="password"
              id="password"
              className="formbold-form-input"
              value={formData.password}
              onChange={handleChange}
              required
            />
          </div>

          <div className="formbold-mb-3">
            <label htmlFor="user_type_id" className="formbold-form-label">
              User Type
            </label>
            <input
              type="text"
              name="user_type_id"
              id="user_type_id"
              className="formbold-form-input"
              value={formData.user_type_id}
              onChange={handleChange}
              required
            />
          </div>

          <div className="formbold-checkbox-wrapper">
            <label
              htmlFor="supportCheckbox"
              className="formbold-checkbox-label"
            >
              <div className="formbold-relative">
                <input
                  type="checkbox"
                  id="supportCheckbox"
                  className="formbold-input-checkbox"
                  required
                />
                <div className="formbold-checkbox-inner">
                  <span className="formbold-opacity-0">
                    <svg
                      width="11"
                      height="8"
                      viewBox="0 0 11 8"
                      fill="none"
                      className="formbold-stroke-current"
                    >
                      <path
                        d="M10.0915 0.951972L10.0867 0.946075L10.0813 0.940568C9.90076 0.753564 9.61034 0.753146 9.42927 0.939309L4.16201 6.22962L1.58507 3.63469C1.40401 3.44841 1.11351 3.44879 0.932892 3.63584C0.755703 3.81933 0.755703 4.10875 0.932892 4.29224L0.932878 4.29225L0.934851 4.29424L3.58046 6.95832C3.73676 7.11955 3.94983 7.2 4.1473 7.2C4.36196 7.2 4.55963 7.11773 4.71406 6.9584L10.0468 1.60234C10.2436 1.4199 10.2421 1.1339 10.0915 0.951972ZM4.2327 6.30081L4.2317 6.2998C4.23206 6.30015 4.23237 6.30049 4.23269 6.30082L4.2327 6.30081Z"
                        strokeWidth="0.4"
                      ></path>
                    </svg>
                  </span>
                </div>
              </div>
              I agree to the defined
              <a href="#">terms, conditions, and policies</a>
            </label>
          </div>

          <button className="formbold-btn" type="submit">
            Register Now
          </button>
        </form>
      </div>
    </div>
  );
}

export default RegistrationPage;
