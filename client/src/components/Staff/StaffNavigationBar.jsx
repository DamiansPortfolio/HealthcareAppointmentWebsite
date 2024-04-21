import React, { useState } from "react";
import logo from "../images/logo_v2.png"; // Make sure the path is correct

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
        <a href="/staff-portal" aria-label="Home">
          <img src={logo} alt="Company Logo" height="60" />{" "}
          {/* Adjust logo height as needed */}
        </a>
      </div>
      <div className="nav-contents">
        <nav className="cs-nav" role="navigation">
          <ul id="cs-expanded" className="cs-ul" aria-expanded={ariaExpanded}>
            <li className="cs-li">
              <a href="/staff-portal" className="cs-li-link">
                Dashboard
              </a>
            </li>
            <li className="cs-li">
              <a href="/staff-portal" className="cs-li-link">
                Appointments
              </a>
            </li>
            <li className="cs-li">
              <a href="/staff-portal" className="cs-li-link">
                Patients
              </a>
            </li>
            <li className="cs-li">
              <a href="/staff-portal" className="cs-li-link">
                Schedule
              </a>
            </li>
            <li className="cs-li">
              <a href="/staff-portal" className="cs-li-link">
                Messages
              </a>
            </li>
            <li className="cs-li">
              <a href="/staff-portal" className="cs-li-link">
                Help
              </a>
            </li>
            <li className="cs-li">
              <a href="/staff-portal" className="cs-li-link">
                Settings
              </a>
            </li>
            <li className="cs-li">
              <a href="/" className="cs-li-link">
                Logout
              </a>
            </li>
          </ul>
        </nav>
      </div>
    </header>
  );
};

export default Navigation;
