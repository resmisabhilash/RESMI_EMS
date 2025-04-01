

import React, { useState } from "react";
import { Form, Button, Container, Card, Alert } from "react-bootstrap";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import Navbar from "./Navbar";
import Footer from "./Footer";
// import { axiosInstance } from "./axiosInstance";

// const API_URL = "https://rework-ems-backend.vercel.app";

const API_BASE_URL=import.meta.env.VITE_API_BASE_URL;

const Register = () => {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [role, setRole] = useState("user"); // Default role is 'user'
  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");
  const navigate = useNavigate();




  const handleRegister = async (e) => {
    e.preventDefault();
    setError("");
    setSuccess("");

    try {
      await axios.post(`${API_BASE_URL}/auth/register`, {
        name,
        email,
        password,
        role,
      });
    
      setSuccess("Registration successful! You can now login.");
      setTimeout(() => navigate("/login"), 2000);
    } catch (err) {
      setError("Error registering. Please try again.");
    }
  };

  return (
    <>
    <Navbar/>
    <Container className="d-flex justify-content-center align-items-center min-vh-100">
      <Card className="p-4 shadow" style={{ width: "400px" }}>
        <h3 className="text-center">Register</h3>
        {error && <Alert variant="danger">{error}</Alert>}
        {success && <Alert variant="success">{success}</Alert>}
        <Form onSubmit={handleRegister}>
          <Form.Group className="mb-3">
            <Form.Label>Name</Form.Label>
            <Form.Control
              type="text"
              placeholder="Enter your name"
              value={name}
              onChange={(e) => setName(e.target.value)}
              required
            />
          </Form.Group>
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
          <Form.Group className="mb-3">
            <Form.Label>Role</Form.Label>
            <Form.Select value={role} onChange={(e) => setRole(e.target.value)}>
              <option value="user">User</option>
              <option value="admin">Admin</option>
            </Form.Select>
          </Form.Group>
          <Button variant="success" type="submit" className="w-100">
            Register
          </Button>
        </Form>
        <div className="text-center mt-3">
          <p>Already have an account? <a href="/login">Login</a></p>
        </div>
      </Card>
    </Container>
    <Footer/>
    </>
  );
};

export default Register;




// import React, { useState } from "react";
// import { Form, Button, Container, Card, Alert } from "react-bootstrap";
// import { useNavigate } from "react-router-dom";
// import { axiosInstance } from "../utils/axiosinstance";
// import Navbar from "./Navbar";
// import Footer from "./Footer";

// const Register = () => {
//   const [name, setName] = useState("");
//   const [email, setEmail] = useState("");
//   const [password, setPassword] = useState("");
//   const [role, setRole] = useState("user"); // Default role is 'user'
//   const [error, setError] = useState("");
//   const [success, setSuccess] = useState("");
//   const navigate = useNavigate();

//   const handleRegister = async (e) => {
//     e.preventDefault();
//     setError("");
//     setSuccess("");

//     try {
//       const response = await axiosInstance.post("/api/auth/register", {
//         name,
//         email,
//         password,
//         role,
//       });

//       setSuccess(response.data.message || "Registration successful!");
//       setTimeout(() => navigate("/login"), 2000);
//     } catch (err) {
//       setError(err.response?.data?.message || "Error registering. Please try again.");
//     }
//   };

//   return (
//     <>
//       <Navbar />
//       <Container className="d-flex justify-content-center align-items-center min-vh-100">
//         <Card className="p-4 shadow" style={{ width: "400px" }}>
//           <h3 className="text-center">Register</h3>
//           {error && <Alert variant="danger">{error}</Alert>}
//           {success && <Alert variant="success">{success}</Alert>}
//           <Form onSubmit={handleRegister}>
//             <Form.Group className="mb-3">
//               <Form.Label>Name</Form.Label>
//               <Form.Control
//                 type="text"
//                 placeholder="Enter your name"
//                 value={name}
//                 onChange={(e) => setName(e.target.value)}
//                 required
//               />
//             </Form.Group>
//             <Form.Group className="mb-3">
//               <Form.Label>Email address</Form.Label>
//               <Form.Control
//                 type="email"
//                 placeholder="Enter email"
//                 value={email}
//                 onChange={(e) => setEmail(e.target.value)}
//                 required
//               />
//             </Form.Group>
//             <Form.Group className="mb-3">
//               <Form.Label>Password</Form.Label>
//               <Form.Control
//                 type="password"
//                 placeholder="Enter password"
//                 value={password}
//                 onChange={(e) => setPassword(e.target.value)}
//                 required
//               />
//             </Form.Group>
//             <Form.Group className="mb-3">
//               <Form.Label>Role</Form.Label>
//               <Form.Select value={role} onChange={(e) => setRole(e.target.value)}>
//                 <option value="user">User</option>
//                 <option value="admin">Admin</option>
//               </Form.Select>
//             </Form.Group>
//             <Button variant="success" type="submit" className="w-100">
//               Register
//             </Button>
//           </Form>
//           <div className="text-center mt-3">
//             <p>
//               Already have an account? <a href="/login">Login</a>
//             </p>
//           </div>
//         </Card>
//       </Container>
//       <Footer />
//     </>
//   );
// };

// export default Register;
