import React from "react";
import { Link } from "react-router-dom";
import Navbar from "./Navbar";
import Footer from "./Footer";

const PaymentSuccess = () => {
  return (
    <>
      <Navbar />
      <div className="container mt-5 text-center">
        <h1> Payment is Successful! </h1>
        <p>Your payment has been received. Check your email for confirmation.</p>
        <Link to="/events" className="btn btn-primary">Back to Events</Link>
      </div>
      <Footer />
    </>
  );
};

export default PaymentSuccess;
