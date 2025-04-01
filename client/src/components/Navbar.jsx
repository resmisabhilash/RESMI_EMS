


import React from "react";
import { Navbar, Nav, Button, Container } from "react-bootstrap";
import { Link, useNavigate } from "react-router-dom";
import axios from "axios";

const NavigationBar = () => {
    const navigate = useNavigate();
    const isAuthenticated = !!localStorage.getItem("token"); // Check if user is logged in
    const API_BASE_URL=import.meta.env.VITE_API_BASE_URL;
    const handleSignOut = async () => {
        try {
            // Call the logout API to clear the session
            await axios.post(`${API_BASE_URL}/logout`, {}, { withCredentials: true });

            // Remove token from localStorage
            localStorage.removeItem("token");

            // Redirect to login page
            navigate("/login");

            // Reload the page to update state
            window.location.reload();
        } catch (error) {
            console.error("Logout failed:", error);
        }
    };

    return (
           <Navbar bg="success" variant="dark" expand="lg"  >
             <Container>
               <Navbar.Brand as={Link} to="/">EVENTEASE</Navbar.Brand>
               <Navbar.Toggle aria-controls="basic-navbar-nav" />
               <Navbar.Collapse id="basic-navbar-nav">
                <Nav className="ms-auto d-flex gap-3"> 
                <Nav.Link as={Link} to="/" className="text-light">Home</Nav.Link>
                        
                        
                    </Nav>

                    {/* Show Sign Out button only if user is logged in */}
                    {isAuthenticated ? (
                        <Button variant="danger" onClick={handleSignOut}>
                            Sign Out
                        </Button>
                    ) : (
                        <Button  className="button d-flex justify-content-end  "variant="primary" as={Link} to="/login">
                            Login
                        </Button>
                    )}
                </Navbar.Collapse>
            </Container>
        </Navbar>
    );
};

export default NavigationBar;
