


import React, { useState } from "react";
import { Form, Button, Container, Card, Alert } from "react-bootstrap";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import Navbar from "./Navbar";
import Footer from "./Footer";

const Login = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const navigate = useNavigate();
  const API_BASE_URL=import.meta.env.VITE_API_BASE_URL;
  console.log(API_BASE_URL);


const handleLogin = async (e) => {
    e.preventDefault();
    try {
        const response = await axios.post(`${API_BASE_URL}/auth/login`, { email, password });
        alert(response.data.message);
        localStorage.setItem('token', response.data.token); // Store token
        localStorage.setItem('role', response.data.role); // Store role
        localStorage.setItem("user", JSON.stringify(response.data.user));


       

        if (response.data.role === 'admin') {
            navigate('/admin-dashboard'); // Redirect admin to dashboard
        } else {
            navigate('/events'); // Redirect user to event list
        }
    } catch (error) {
        alert(error.response?.data?.message || 'Login failed');
    }
};


  return (
    <>
    <Navbar/>
    <Container className="d-flex justify-content-center align-items-center min-vh-100">
      <Card className="p-4 shadow" style={{ width: "400px" }}>
        <h3 className="text-center">Login</h3>
        {error && <Alert variant="danger">{error}</Alert>}
        <Form onSubmit={handleLogin}>
          <Form.Group className="mb-3">
            <Form.Label>Email address</Form.Label>
            <Form.Control
              type="email"
              placeholder="Enter email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
            />
          </Form.Group>
          <Form.Group className="mb-3">
            <Form.Label>Password</Form.Label>
            <Form.Control
              type="password"
              placeholder="Enter password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
            />
          </Form.Group>
          <Button variant="primary" type="submit" className="w-100">
            Sign In
          </Button>
        </Form>
        <div className="text-center mt-3">
          <p>Don't have an account? <a href="/register">Register</a></p>
        </div>
      </Card>
    </Container>
    <Footer/>
    </>
  );
};

export default Login;






