import React from "react";
import NavBar from "../homepage-things/NavigationBar";
import { Container, Row, Col } from "react-bootstrap";
import Accordion from "react-bootstrap/Accordion";
import ListGroup from "react-bootstrap/ListGroup";

import wound from "../images/wound-care.jpg";
import minimalinvasive from "../images/minimal-invasive.jpg";
import surgery from "../images/surgery.jpg";
import "./Services.css";

function ServicesPage() {
  return (
    <div className="services-container">
      <NavBar />
      <Container fluid>
        <Row className="row-1">
          <Col md={6} lg={4} className="col-1">
            <img src={wound} alt="Wound Care" />
          </Col>
          <Col md={6} lg={8} className="col-2">
            <h2 style={{ textAlign: "center" }}>Wound Care</h2>
            <Accordion defaultActiveKey="0" flush>
              <Accordion.Item eventKey="0">
                <Accordion.Header>
                  What is a Chronic or Non-Healing Wound?
                </Accordion.Header>
                <Accordion.Body>
                  Wound Care Treatment is performed by accredited wound care
                  specialists trained in the care and treatment of all types of
                  wounds, acute and chronic. An acute wound is an injury to the
                  skin that occurs suddenly rather than over time. It heals at a
                  predictable and expected rate according to the normal wound
                  healing process. Acute wounds can happen anywhere on the body
                  and vary from superficial scratches to deep wounds damaging
                  blood vessels, nerves, muscles or other body parts. A chronic
                  wound develops when any acute wound fails to heal in the
                  expected time frame for that type of wound, which might be a
                  couple of weeks or up to six weeks in some cases. Non-healing
                  wounds or Chronic wounds require specialized wound care
                  treatment.
                </Accordion.Body>
              </Accordion.Item>
              <Accordion.Item eventKey="1">
                <Accordion.Header>Types of Chronic Wounds</Accordion.Header>
                <Accordion.Body>
                  <Accordion flush>
                    <Accordion.Item eventKey="0">
                      <Accordion.Header>Arterial Ulcers</Accordion.Header>
                      <Accordion.Body>
                        These can occur from hypertension, atherosclerosis
                        (plugging) and thrombosis (clotting), where the reduced
                        blood supply leads to an ischemic state.
                      </Accordion.Body>
                    </Accordion.Item>
                    <Accordion.Item eventKey="1">
                      <Accordion.Header>Infectious wounds</Accordion.Header>
                      <Accordion.Body>
                        Whether it is bacterial, fungal, or viral, if the cause
                        of the infection is not treated with the proper
                        medication, the wound will not heal properly in the
                        expected time.
                      </Accordion.Body>
                    </Accordion.Item>
                    <Accordion.Item eventKey="2">
                      <Accordion.Header>Inflammatory Wounds</Accordion.Header>
                      <Accordion.Body>
                        Wounds that may develop as a manifestation of a variety
                        of different diseases or may result from some
                        non-disease phenomena. Most of these wounds correlates
                        to autoimmune or connective tissue disease.
                      </Accordion.Body>
                    </Accordion.Item>
                    <Accordion.Item eventKey="3">
                      <Accordion.Header>Surgical Wounds</Accordion.Header>
                      <Accordion.Body>
                        Wounds caused by incisions made during surgery can
                        progress to chronic wounds if the blood supply to the
                        surgery area was accidentally damaged or if wound care
                        was inadequate. Both can delay the healing time of a
                        wound.
                      </Accordion.Body>
                    </Accordion.Item>
                  </Accordion>
                </Accordion.Body>
              </Accordion.Item>
            </Accordion>
          </Col>
        </Row>
        <Row className="row-1">
          <Col md={6} lg={4} className="col-1">
            <img src={minimalinvasive} alt="Wound Care" />
          </Col>
          <Col md={6} lg={8} className="col-2">
            <h2 style={{ textAlign: "center" }}>
              Minimally Invasive Outpatient Vascular Treatments
            </h2>
            <Accordion defaultActiveKey="0" flush>
              <Accordion.Item eventKey="0">
                <Accordion.Header>
                  Experience Advanced Vascular Treatments in Comfort and
                  Convenience
                </Accordion.Header>
                <Accordion.Body>
                  We warmly welcome you to our top-tier outpatient facilities,
                  where we combine cutting-edge technology with exceptional
                  patient care. Our services include arterial treatments for
                  Peripheral Arterial Disease (P.A.D) and minimally invasive
                  procedures for venous conditions. Our facilities are designed
                  with your comfort in mind, featuring private preparation and
                  recovery rooms, easy parking, and a straightforward billing
                  process with multiple payment options. We accept most major
                  insurance plans and collaborate with your referring physician
                  to ensure a seamless experience.
                </Accordion.Body>
              </Accordion.Item>
              <Accordion.Item eventKey="1">
                <Accordion.Header>Procedures That We Perform</Accordion.Header>
                <Accordion.Body>
                  <Row>
                    <Col>
                      <ListGroup variant="flush">
                        <ListGroup.Item>
                          Peripheral Artery Disease (PAD) Treatement
                        </ListGroup.Item>
                        <ListGroup.Item>
                          Catheter Angiography (Peripheral Angiogram)
                        </ListGroup.Item>
                        <ListGroup.Item>
                          Atherectomy for Peripheral Vascular Disease
                        </ListGroup.Item>
                        <ListGroup.Item>Renal Artery Stenting</ListGroup.Item>
                        <ListGroup.Item>
                          Baloon Angioplasty & Intravascular Stents
                        </ListGroup.Item>
                      </ListGroup>
                    </Col>
                    <Col>
                      <ListGroup variant="flush">
                        <ListGroup.Item>
                          Endovenous Laster Therapy (EVLT)
                        </ListGroup.Item>
                        <ListGroup.Item>VNUS Closure</ListGroup.Item>
                      </ListGroup>
                    </Col>
                  </Row>
                </Accordion.Body>
              </Accordion.Item>
            </Accordion>
          </Col>
        </Row>
        <Row className="row-1">
          <Col md={6} lg={4} className="col-1">
            <img src={surgery} alt="Wound Care" />
          </Col>
          <Col md={6} lg={8} className="col-2">
            <h2 style={{ textAlign: "center" }}>
              Comprehensive Open Vascular Surgery for Critical Care
            </h2>
            <Accordion defaultActiveKey="0" flush>
              <Accordion.Item eventKey="0">
                <Accordion.Header>
                  Experience Advanced Vascular Treatments in Comfort and
                  Convenience
                </Accordion.Header>
                <Accordion.Body>
                  At our clinic, we provide expert open vascular surgery
                  procedures tailored to address complex vascular conditions
                  with precision and care. Our dedicated team specializes in a
                  wide range of surgeries, including aortic aneurysm repair,
                  carotid endarterectomy, and limb salvage operations. Our
                  surgical suites are equipped with the latest in medical
                  technology to ensure the highest standards of safety and
                  efficacy. Patient comfort and care are paramount in our
                  practice. From pre-operative consultations to post-surgery
                  recovery, our staff supports you every step of the way. We
                  offer spacious recovery rooms, personalized care plans, and a
                  comprehensive follow-up program to monitor your health
                  progress. Understanding the challenges of navigating
                  healthcare options, we provide clear communication about
                  procedures and costs and accept a variety of insurance plans.
                  Trust us to prioritize your health and recovery in every
                  procedure we perform.
                </Accordion.Body>
              </Accordion.Item>
              <Accordion.Item eventKey="1">
                <Accordion.Header>Procedures That We Perform</Accordion.Header>
                <Accordion.Body>
                  <Row>
                    <Col>
                      <ListGroup variant="flush">
                        <ListGroup.Item>Arterial Graft</ListGroup.Item>
                        <ListGroup.Item>Carotid Endarterectomy </ListGroup.Item>
                        <ListGroup.Item>
                          Treatement & Surgical Aneurysm Repair
                        </ListGroup.Item>
                        <ListGroup.Item>
                          Abdominal Aortic Aneurysm Treatement
                        </ListGroup.Item>
                        <ListGroup.Item>Dialysis Access</ListGroup.Item>
                      </ListGroup>
                    </Col>
                  </Row>
                </Accordion.Body>
              </Accordion.Item>
            </Accordion>
          </Col>
        </Row>
      </Container>
      <Container fluid></Container>
    </div>
  );
}

export default ServicesPage;
