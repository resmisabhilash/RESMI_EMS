import React from "react";
import { Container, Card } from "react-bootstrap";
import Navbar from "./Navbar";
import Footer from "./Footer";

const PrivacyPolicy = () => {
  return (
    <>
      <Navbar />
      <Container className="mt-5">
        <Card className="shadow p-4">
          <Card.Body>
            <Card.Title className="text-center mb-4">Privacy Policy</Card.Title>

            <Card.Text>
              Welcome to EventEase. Your privacy is important to us, and we are
              committed to protecting your personal data. This Privacy Policy
              explains how we collect, use, and safeguard your information when you
              use our platform.
            </Card.Text>

            <h4 className="mt-4">Information We Collect</h4>
            <Card.Text>
              <strong>Personal Information:</strong> When you register, book tickets, or
              contact us, we may collect your name, email, phone number, and
              payment details.
              <br />
              <strong>Usage Data:</strong> We collect information on how you interact
              with our website, including IP address, browser type, and pages
              visited.
            </Card.Text>

            <h4 className="mt-4">How We Use Your Information</h4>
            <Card.Text>
              <ul>
                <li>To provide and maintain our services.</li>
                <li>To process ticket bookings and payments.</li>
                <li>To improve user experience and develop new features.</li>
                <li>To send promotional and service-related communications.</li>
              </ul>
            </Card.Text>

            <h4 className="mt-4">Data Protection</h4>
            <Card.Text>
              We implement strict security measures to ensure your personal data is
              protected against unauthorized access, alteration, or disclosure.
            </Card.Text>

            <h4 className="mt-4">Sharing of Information</h4>
            <Card.Text>
              We do not sell or trade your personal data. However, we may share it
              with trusted third-party service providers for payment processing,
              analytics, or legal compliance.
            </Card.Text>

            <h4 className="mt-4">Your Rights</h4>
            <Card.Text>
              You have the right to access, update, or delete your personal data at
              any time. You can also opt out of marketing communications.
            </Card.Text>

            <h4 className="mt-4">Updates to This Policy</h4>
            <Card.Text>
              We may update this Privacy Policy from time to time. Any changes will
              be posted on this page with an updated revision date.
            </Card.Text>

            <h4 className="mt-4">Contact Us</h4>
            <Card.Text>
              If you have any questions regarding this policy, please contact us at{" "}
              <a href="mailto:support@eventease.com">support@eventease.com</a>.
            </Card.Text>
          </Card.Body>
        </Card>
      </Container>
      <Footer />
    </>
  );
};

export default PrivacyPolicy;
