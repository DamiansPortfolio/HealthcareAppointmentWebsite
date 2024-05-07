import React from "react";
import NavBar from "../homepage-things/NavigationBar";
import { Carousel, Button } from "react-bootstrap";
import "./PatientPortal.css";
import schedule from "../images/schedule.png";
import appts from "../images/appts.png";
import profile from "../images/profile.png";
import msg from "../images/msg.png";
import rmd from "../images/rmd.png";
import pdash from "../images/pdash.png";
import settings from "../images/settings.png";
import help from "../images/help.png";
import WelcomeMessage from "../homepage-things/WelcomeMessage";

function PatientWelcome() {
  return (
    <>
      <NavBar />
      <div style={{ textAlign: "center" }}>
        <WelcomeMessage />
      </div>
      <div className="fullscreen-carousel">
        <Carousel>
          <Carousel.Item interval={1000}>
            <img className="d-block w-100" src={pdash} />
            <Carousel.Caption>
              <h3 style={{ fontWeight: "bold", fontSize: "30px" }}>
                Dashboard
              </h3>
              <p>
                Welcome to your personalized patient dashboard, where you can
                conveniently manage your healthcare needs. View upcoming
                appointments and manage your schedule. Access your medical
                records, lab results, and prescriptions. Communicate securely
                with your healthcare providers and staff. Receive important
                reminders for appointments and medication refills. Update your
                personal information and preferences easily.
              </p>
              <Button
                className="button-spacing"
                style={{ backgroundColor: "teal", borderColor: "teal" }}
                href="/patient-portal/dashboard"
              >
                <strong> Go to Dashboard </strong>
              </Button>
            </Carousel.Caption>
          </Carousel.Item>

          <Carousel.Item interval={1000}>
            <img className="d-block w-100" src={schedule} />
            <Carousel.Caption>
              <h3 style={{ fontWeight: "bold", fontSize: "30px" }}>
                Schedule Appointment
              </h3>
              <p>
                Easily book your next appointment at your convenience. Our
                user-friendly interface allows you to select your preferred date
                and time, choose your healthcare provider, and confirm your
                appointment with just a few clicks.
              </p>
              <Button
                className="button-spacing"
                style={{ backgroundColor: "teal", borderColor: "teal" }}
                href="/patient-portal/schedule-appointment"
              >
                <strong> Go to Schedule Appointment </strong>
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
                Take control of your healthcare appointments with our
                comprehensive appointment management system. View your complete
                appointment history and access details of upcoming appointments
                at your fingertips. Easily manage your schedule, reschedule or
                cancel appointments.
              </p>
              <Button
                className="button-spacing"
                style={{ backgroundColor: "teal", borderColor: "teal" }}
                href="/patient-portal/my-appointments"
              >
                <strong> Go to My Appointments </strong>
              </Button>
            </Carousel.Caption>
          </Carousel.Item>

          <Carousel.Item interval={1000}>
            <img className="d-block w-100" src={profile} />
            <Carousel.Caption>
              <h3 style={{ fontWeight: "bold", fontSize: "30px" }}>
                Profile Management
              </h3>
              <p>
                Easily access and update your personal information, ensuring
                that your healthcare providers have the most accurate details.
                Dive deeper into your medical history and lab results,
                empowering you to stay informed about your health status and
                track your progress over time.
              </p>

              <Button
                className="button-spacing"
                style={{ backgroundColor: "teal", borderColor: "teal" }}
                href="/patient-portal/my-profile"
              >
                <strong> Go to My Profile </strong>
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
                Stay connected with your healthcare providers through our secure
                messaging feature. Communicate with confidence, knowing that
                your messages are protected and confidential. Whether you have
                questions about your treatment plan, need to request a
                prescription refill, or simply want to check in with your
                provider, our secure messaging system ensures seamless
                communication for all your healthcare needs.
              </p>
              <Button
                className="button-spacing"
                style={{ backgroundColor: "teal", borderColor: "teal" }}
                href="/patient-portal/messages"
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
                Adjust your account settings and preferences to tailor your
                portal experience according to your preferences. This includes
                changing notification settings, managing connected devices, and
                customizing your profile.
              </p>
              <Button
                className="button-spacing"
                style={{ backgroundColor: "teal", borderColor: "teal" }}
                href="/patient-portal/settings"
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
                Need assistance or guidance on using the patient portal? Our
                help section provides comprehensive resources and support to
                help you make the most out of your portal experience. From
                step-by-step guides to FAQs and troubleshooting tips, we're here
                to ensure you have a seamless and hassle-free experience with
                our platform.
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
}

export default PatientWelcome;
