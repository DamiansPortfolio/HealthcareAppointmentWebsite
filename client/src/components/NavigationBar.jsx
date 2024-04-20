import React, { useState } from "react";
import "./Navigation.css";
import logo from "./images/logo_v2.png"; // Make sure the path is correct

const Navigation = () => {
  const [isActive, setIsActive] = useState(false);

  const toggleClass = () => {
    setIsActive(!isActive);
    document.body.classList.toggle("cs-open");
  };

  const ariaExpanded = isActive ? "true" : "false";

  return (
    <header
      id="cs-navigation"
      className={`cs-container ${isActive ? "cs-active" : ""}`}
    >
      <div className="nav-logo">
        <a href="/" aria-label="Home">
          <img src={logo} alt="Company Logo" height="60" />{" "}
          {/* Adjust logo height as needed */}
        </a>
      </div>
      <div className="nav-contents">
        <nav className="cs-nav" role="navigation">
          <ul id="cs-expanded" className="cs-ul" aria-expanded={ariaExpanded}>
            <li className="cs-li">
              <a href="/" className="cs-li-link cs-active">
                Home
              </a>
            </li>
            <li className="cs-li">
              <a href="/about" className="cs-li-link">
                Locations
              </a>
            </li>
            <li className="cs-li">
              <a href="/services" className="cs-li-link">
                Services
              </a>
            </li>
            <li className="cs-li">
              <a href="/about-us" className="cs-li-link">
                About Us
              </a>
            </li>
            <li className="cs-li">
              <a href="/faq" className="cs-li-link">
                FAQ
              </a>
            </li>
          </ul>
        </nav>
      </div>
      <div className="nav-button">
        <a href="/contact" className="cs-button-solid cs-nav-button">
          Book Appointment
        </a>
      </div>
    </header>
  );
};

export default Navigation;
