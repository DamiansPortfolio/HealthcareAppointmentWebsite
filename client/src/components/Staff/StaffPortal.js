import React from "react";
import NavBar from "../homepage-things/NavigationBar";
import { Carousel, Button } from "react-bootstrap";
import "./StaffPortal.css";
import appts from "../images/appts.png";
import profile from "../images/profile.png";
import msg from "../images/msg.png";
import sched from "../images/sched.png";
import dash from "../images/dash.png";
import settings from "../images/settings.png";
import help from "../images/help.png";
import WelcomeMessage from "../homepage-things/WelcomeMessage";

const StaffWelcome = () => {
  return (
    <>
      <NavBar />
      <div style={{ textAlign: "center" }}>
        <WelcomeMessage />
      </div>
      <div className="fullscreen-carousel">
        <Carousel>
          <Carousel.Item interval={1000}>
            <img className="d-block w-100" src={dash} />
            <Carousel.Caption>
              <h3 style={{ fontWeight: "bold", fontSize: "30px" }}>
                Dashboard
              </h3>
              <p>
                Unlock efficiency and elevate patient care with the Staff
                Dashboard. Seamlessly navigate upcoming appointments, manage
                tasks, and engage in meaningful communication. Dive into
                performance metrics to track progress and optimize workflows,
                ensuring every interaction contributes to exceptional patient
                experiences.
              </p>
              <Button
                className="button-spacing"
                style={{ backgroundColor: "teal", borderColor: "teal" }}
                href="/staff-portal/dashboard"
              >
                <strong> Go to Dashboard </strong>
              </Button>
            </Carousel.Caption>
          </Carousel.Item>

          <Carousel.Item interval={1000}>
            <img className="d-block w-100" src={appts} />
            <Carousel.Caption>
              <h3 style={{ fontWeight: "bold", fontSize: "30px" }}>
                Appointment Management
              </h3>
              <p>
                Stay organized and manage upcoming appointments effortlessly.
                View a list of scheduled appointments. Schedule new appointments
                for patients. Reschedule or cancel existing appointments. Send
                appointment reminders to patients.
              </p>
              <Button
                className="button-spacing"
                style={{ backgroundColor: "teal", borderColor: "teal" }}
                href="/staff-portal/appointments"
              >
                <strong> Go to Appointments </strong>
              </Button>
            </Carousel.Caption>
          </Carousel.Item>

          <Carousel.Item interval={1000}>
            <img className="d-block w-100" src={profile} />
            <Carousel.Caption>
              <h3 style={{ fontWeight: "bold", fontSize: "30px" }}>
                Patient Management
              </h3>
              <p>
                Easily access patient records and manage their information.
                Quickly search and find patient records. View detailed patient
                profiles and medical history. Update patient information with
                ease. Generate reports and summaries for patient care.
              </p>

              <Button
                className="button-spacing"
                style={{ backgroundColor: "teal", borderColor: "teal" }}
                href="/staff-portal/patients"
              >
                <strong> Go to Patients </strong>
              </Button>
            </Carousel.Caption>
          </Carousel.Item>

          <Carousel.Item interval={1000}>
            <img className="d-block w-100" src={sched} />
            <Carousel.Caption>
              <h3 style={{ fontWeight: "bold", fontSize: "30px" }}>
                Schedule management
              </h3>
              <p>
                Manage your availability and schedule to ensure efficient
                workflow. Update your own availability for appointments. Set
                working hours and breaks to optimize your schedule. Coordinate
                with colleagues to avoid scheduling conflicts. View and adjust
                appointments based on your availability. Receive notifications
                for new appointments and changes.
              </p>
              <Button
                className="button-spacing"
                style={{ backgroundColor: "teal", borderColor: "teal" }}
                href="/staff-portal/my-schedule"
              >
                <strong> Go to My Schedule </strong>
              </Button>
            </Carousel.Caption>
          </Carousel.Item>

          <Carousel.Item interval={1000}>
            <img className="d-block w-100" src={msg} />
            <Carousel.Caption>
              <h3 style={{ fontWeight: "bold", fontSize: "30px" }}>
                Secure Messaging
              </h3>
              <p>
                Stay connected and communicate securely with your team and
                patients.Send and receive messages with ease. Collaborate with
                your team on patient care. Provide updates and reminders to
                patients. Ensure privacy and security of sensitive information.
                Access message history for reference and follow-up.
              </p>
              <Button
                className="button-spacing"
                style={{ backgroundColor: "teal", borderColor: "teal" }}
                href="/staff-portal/messages"
              >
                <strong> Go to Messages </strong>
              </Button>
            </Carousel.Caption>
          </Carousel.Item>

          <Carousel.Item interval={1000}>
            <img className="d-block w-100" src={settings} />
            <Carousel.Caption>
              <h3 style={{ fontWeight: "bold", fontSize: "30px" }}>Settings</h3>
              <p>
                Customize your portal settings and preferences to suit your
                needs. Adjust notification preferences to stay informed. Manage
                account details and security settings. Customize the appearance
                and layout of the portal. Set up integrations with other tools
                and software. Access help resources and support options.
              </p>
              <Button
                className="button-spacing"
                style={{ backgroundColor: "teal", borderColor: "teal" }}
                href="/staff-portal/settings"
              >
                <strong> Go to Settings </strong>
              </Button>
            </Carousel.Caption>
          </Carousel.Item>

          <Carousel.Item interval={1000}>
            <img className="d-block w-100" src={help} />
            <Carousel.Caption>
              <h3 style={{ fontWeight: "bold", fontSize: "30px" }}>Help</h3>
              <p>
                Need assistance or guidance on using the staff portal? Our help
                section provides comprehensive resources and support to help you
                make the most out of your portal experience. From step-by-step
                guides to FAQs and troubleshooting tips, we're here to ensure
                you have a seamless and hassle-free experience with our
                platform.
              </p>
              <Button
                className="button-spacing"
                style={{ backgroundColor: "teal", borderColor: "teal" }}
                href="/staff-portal/help"
              >
                <strong> Go to Help </strong>
              </Button>
            </Carousel.Caption>
          </Carousel.Item>
        </Carousel>
      </div>
    </>
  );
};
export default StaffWelcome;
