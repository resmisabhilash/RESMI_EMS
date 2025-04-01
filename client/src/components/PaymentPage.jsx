

import React, { useEffect, useState } from "react";
import { useLocation } from "react-router-dom";
import { loadStripe } from "@stripe/stripe-js";
import { Elements, CardElement, useStripe, useElements } from "@stripe/react-stripe-js";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import Navbar from "./Navbar";
import Footer from "./Footer";

// Load Stripe
const stripePromise = loadStripe(import.meta.env.VITE_STRIPE_PUBLIC_KEY);

const PaymentForm = () => {
    const stripe = useStripe();
    const elements = useElements();
    const { state } = useLocation();
    const [clientSecret, setClientSecret] = useState("");
    const [isProcessing, setIsProcessing] = useState(false);
    const [processing, setProcessing] = useState(false);
    const API_BASE_URL=import.meta.env.VITE_API_BASE_URL;

    const storedUser = localStorage.getItem("user");
const user = storedUser ? JSON.parse(storedUser) : null;



    useEffect(() => {
        const fetchClientSecret = async () => {
            try {
                const response = await axios.post(`${API_BASE_URL}/payments/create-payment-intent`, {
                    amount: state.quantity * (state.selectedType === "VIP" ? 1000 : 500),
                    currency: "usd",
                    userId: state.userId,
                    eventId: state.eventId,
                });
                setClientSecret(response.data.clientSecret);
            } catch (error) {
                console.error("Error fetching client secret:", error);
            }
        };

        fetchClientSecret();
    }, [state]);


    const navigate = useNavigate();

    const handleSubmit = async (e) => {
      e.preventDefault();
    
      if (!stripe || !elements || isProcessing) return; 
    
      setIsProcessing(true); // Disable button

      // Retrieve user from localStorage
  const user = JSON.parse(localStorage.getItem("user"));
  const userId = user?._id || user?.id;

  if (!userId) {
    console.error("Error: userId is undefined!");
    alert("Error: User not logged in. Please log in first.");
    setIsProcessing(false);
    return;
  }
      const result = await stripe.confirmCardPayment(clientSecret, {
        payment_method: {
          card: elements.getElement(CardElement),
        },
      });
    
      if (result.error) {
        console.error(result.error.message);
        alert("Payment failed!");
      } else {
        if (result.paymentIntent.status === "succeeded") {
          alert("Payment is successful!");
    
          const paymentData = {
            userId, 
            eventId: state?.eventId,
            amount: state?.quantity * (state?.selectedType === "VIP" ? 1000 : 500),
            paymentStatus: "completed",
          };
    
          console.log("Sending Payment Data:", paymentData); 
    
          if (!paymentData.userId || !paymentData.eventId || !paymentData.amount) {
            console.error("Missing required fields", paymentData);
            alert("Error: Missing required fields.");
            setIsProcessing(false);
            return;
          }
    
          try {
            const response = await axios.post(
              `${API_BASE_URL}/payments/save`,
              paymentData,
              {
                headers: { "Content-Type": "application/json" },
              }
            );
    
            console.log("Server Response:", response.data);
    
            if (response.data.message) {
              alert("Payment is  saved successfully and email sent!");
              window.location.href = "/payment-success"; // Redirect after success
            }
          } catch (error) {
            console.error("Error saving payment:", error.response?.data || error);
            alert("Error saving payment! Check console for details.");
          }
        }
      }
    
      setIsProcessing(false); 
    };
    
  
  if (!user || !user._id) {
    console.error("User is not defined or missing ID.");
    alert("Please log in again.");
    navigate("/login");
    return;
}

    return (
        <>
            <Navbar />
            <div className="container mt-5">
                <h1>Payment Details</h1>
                <p>Selected Ticket Type: {state.selectedType}</p>
                <p>Quantity: {state.quantity}</p>
                <form onSubmit={handleSubmit}>
                    <h2>Complete Payment</h2>
                    <CardElement />
                    <button type="submit" disabled={!stripe || isProcessing} className="btn btn-primary mt-3">
  {isProcessing ? "Processing..." : "Pay Now"}
</button>
                </form>
            </div>
            <Footer />
        </>
    );
};

const PaymentPage = () => (
    <Elements stripe={stripePromise}>
        <PaymentForm />
    </Elements>
);

export default PaymentPage;
