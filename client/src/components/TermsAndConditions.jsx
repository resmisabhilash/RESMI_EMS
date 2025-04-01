import React from "react";
import { Container, Card } from "react-bootstrap";
import Navbar from "./Navbar";
import Footer from "./Footer";

const TermsAndConditions = () => {
  return (
    <>
      <Navbar />
      <Container className="mt-5">
        <Card className="p-4 shadow-lg">
          <h2 className="text-center mb-4">Terms and Conditions</h2>

          <h4>Introduction</h4>
          <p>
            Welcome to EventEase! By accessing or using our platform, you agree
            to comply with the following terms and conditions. Please read them
            carefully.
          </p>

          <h4>User Registration</h4>
          <p>
            To access certain features, you may need to register an account. You
            are responsible for maintaining the confidentiality of your account
            and ensuring all information provided is accurate.
          </p>

          <h4>Event Listings and Ticket Purchases</h4>
          <p>
            EventEase acts as a platform to connect event organizers and
            attendees. We do not take responsibility for the accuracy of event
            details or any changes made by the organizers.
          </p>

          <h4>Payments and Refunds</h4>
          <p>
            All payments made through EventEase are securely processed. Refunds
            are subject to the event organizer’s refund policy.
          </p>

          <h4>User Conduct</h4>
          <p>
            You agree not to misuse the platform by posting false information,
            engaging in fraudulent activities, or violating any applicable laws.
          </p>

          <h4>Privacy and Data Protection</h4>
          <p>
            Your privacy is important to us. Please review our{" "}
            <a href="/privacy-policy">Privacy Policy</a> to understand how we
            collect and use your data.
          </p>

          <h4>Limitation of Liability</h4>
          <p>
            EventEase is not responsible for any damages, losses, or injuries
            related to events listed on the platform.
          </p>

          <h4>Termination of Use</h4>
          <p>
            We reserve the right to suspend or terminate accounts that violate
            our terms and conditions.
          </p>

          <h4>Changes to Terms</h4>
          <p>
            We may update these terms at any time. Continued use of our platform
            after changes are posted constitutes acceptance of the revised terms.
          </p>

          <h4>Contact Information</h4>
          <p>
            For any questions regarding these Terms and Conditions, please
            contact us at <strong>support@eventease.com</strong>.
          </p>
        </Card>
      </Container>
      <Footer />
    </>
  );
};

export default TermsAndConditions;
