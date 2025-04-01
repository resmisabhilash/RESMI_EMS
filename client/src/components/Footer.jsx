import React from "react";
import { Container, Row, Col } from "react-bootstrap";

const Footer = () => {
  return (
    <footer className="bg-success mt-5 text-light py-3">
      <Container>
        <Row>
          <Col md={6} className="text-center text-md-start ">
            <p>&copy; {new Date().getFullYear()} EVENTEASE. All rights reserved.</p>
          </Col>
          <Col md={6} className="text-center text-md-end">
            <a href="/privacy-policy" className="text-light me-3">Privacy Policy</a>
            <a href="/terms" className="text-light">Terms & Conditions</a>
          </Col>
        </Row>
      </Container>
    </footer>
  );
};

export default Footer;
