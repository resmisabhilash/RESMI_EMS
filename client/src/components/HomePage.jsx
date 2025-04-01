
import React,{useRef} from "react";
import { useNavigate } from "react-router-dom";
import Navbar from "./Navbar";
import Footer from "./Footer";
import { Container, Button } from "react-bootstrap";
import { Link } from "react-router-dom";
import "./HomePage.css"

const HomePage = () => {
  const navigate = useNavigate();
  const aboutUsRef = useRef(null);
  const scrollToAboutUs = () => {
    aboutUsRef.current?.scrollIntoView({ behavior: "smooth" });
};
  return (
    <>
    <Navbar/>
    <div className="homepage">
      <div className="overlay">
        
      <h1>Welcome to Event Manager</h1>
      <p>Discover and book amazing events</p>

        
      <Button variant="primary" onClick={scrollToAboutUs}>
                    Know About Us
                </Button>
      </div>
    </div>
    <Container ref={aboutUsRef} className="mt-5 p-4 bg-light rounded">
                <h2 className="about ">About Us</h2>
                <p>
                    We are a leading event management platform that helps you create, manage, and
                    participate in amazing events. Our mission is to provide a seamless experience for 
                    both event organizers and attendees.
                </p>
                <h2>Our Mission</h2>
                <p>We aim to revolutionize the event industry by providing a user-friendly platform where individuals, businesses, and organizations can create, manage, and experience events with ease.</p>
            </Container>
    <Footer/>
    </>
  );
};

export default HomePage;
