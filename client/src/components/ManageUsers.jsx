import React, { useEffect, useState } from "react";
import { Container, Table, Button } from "react-bootstrap";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import Navbar from "./Navbar";
import Footer from "./Footer";

const ManageUsers = () => {
    const [users, setUsers] = useState([]);
    const navigate = useNavigate();
    const API_BASE_URL=import.meta.env.VITE_API_BASE_URL;

    useEffect(() => {
        fetchUsers();
    }, []);

    // Fetch Users from Backend
    const fetchUsers = async () => {
        try {
            const response = await axios.get(`${API_BASE_URL}/users`, { withCredentials: true });
            setUsers(response.data);
        } catch (error) {
            console.error("Error fetching users:", error.response?.data || error);
        }
    };

    // Delete User Function
    const handleDelete = async (userId) => {
        if (!window.confirm("Are you sure you want to delete this user?")) return;
    
        try {
            const token = localStorage.getItem("token"); // Get token from local storage
    
            if (!token) {
                alert("Authentication token missing. Please log in again.");
                return;
            }
    
            const response = await axios.delete(`${API_BASE_URL}/users/${userId}`, {
                headers: { Authorization: `Bearer ${token}` }, // Send token
                withCredentials: true,
            });
    
            console.log("Delete Response:", response.data); // Debugging
    
            setUsers(users.filter(user => user._id !== userId)); // Remove from UI
            alert("User deleted successfully");
        } catch (error) {
            console.error("Error deleting user:", error.response?.data || error);
            alert(`Failed to delete user: ${error.response?.data?.message || error.message}`);
        }
    };
    
    
    

    return (
        <>
            <Navbar />
            <div className="d-flex justify-content-center mb-5">
                <Button className="button mt-5" variant="success" onClick={() => navigate("/admin-dashboard")}>
                    Go to Admin Dashboard
                </Button>
            </div>
            <Container className="mt-5">
                <h2 className="text-center mb-4">Manage Users</h2>
                
                {users.length > 0 ? (
                    <Table striped bordered hover responsive>
                        <thead>
                            <tr>
                                <th>#</th>
                                <th>Name</th>
                                <th>Email</th>
                                <th>Role</th>
                                <th>Actions</th>
                            </tr>
                        </thead>
                        <tbody>
                            {users.map((user, index) => (
                                <tr key={user._id}>
                                    <td>{index + 1}</td>
                                    <td>{user.name}</td>
                                    <td>{user.email}</td>
                                    <td>{user.role}</td>
                                    <td>
                                        <Button variant="danger" onClick={() => handleDelete(user._id)}>
                                            Delete
                                        </Button>
                                    </td>
                                </tr>
                            ))}
                        </tbody>
                    </Table>
                ) : (
                    <p className="text-center">No users available</p>
                )}
            </Container>
            
            <Footer />
        </>
    );
};

export default ManageUsers;
