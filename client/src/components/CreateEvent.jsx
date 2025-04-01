
import React, { useState } from 'react';
import { Form, Button, Container } from 'react-bootstrap';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import Navbar from "./Navbar";
import Footer from "./Footer";

const CreateEvent = () => {
    const [title, setTitle] = useState('');
    const [description, setDescription] = useState('');
    const [date, setDate] = useState('');
    const [location, setLocation] = useState('');
    const [ticketsAvailable, setTicketsAvailable] = useState('');
    const [price, setPrice] = useState('');
    const [image, setImage] = useState(null); // Change to File object
    const navigate = useNavigate();
    const API_BASE_URL=import.meta.env.VITE_API_BASE_URL;

    // Handle Image File Upload
    const handleImageChange = (e) => {
        setImage(e.target.files[0]); // Store the file object
    };

    const handleCreateEvent = async (e) => {
        e.preventDefault();
    
        // Create FormData object
        const formData = new FormData();
        formData.append("title", title);
        formData.append("description", description);
        formData.append("date", date);
        formData.append("location", location);
        formData.append("ticketsAvailable", ticketsAvailable);
        formData.append("price", price);
        formData.append("image", image); // Append the file object
    
        try {
            const response = await axios.post(`${API_BASE_URL}/events`, 
                formData, 
                { headers: { "Content-Type": "multipart/form-data" } }
            );
    
            alert(response.data.message);
            navigate('/admin/events');

        } catch (error) {
            console.error("Error creating event:", error);
            alert(error.response?.data?.message || "Failed to create event");
        }
    };
    
    return (
        <>
        <Navbar/>
        <Container className="mt-4">
            <h2>Create Event</h2>
            <Form onSubmit={handleCreateEvent}>
                <Form.Group className="mb-3">
                    <Form.Label>Title</Form.Label>
                    <Form.Control 
                        type="text" 
                        value={title} 
                        onChange={(e) => setTitle(e.target.value)} 
                        required 
                    />
                </Form.Group>
                <Form.Group className="mb-3">
                    <Form.Label>Description</Form.Label>
                    <Form.Control 
                        as="textarea" 
                        rows={3} 
                        value={description} 
                        onChange={(e) => setDescription(e.target.value)} 
                        required 
                    />
                </Form.Group>
                <Form.Group className="mb-3">
                    <Form.Label>Date</Form.Label>
                    <Form.Control 
                        type="date" 
                        value={date} 
                        onChange={(e) => setDate(e.target.value)} 
                        required 
                    />
                </Form.Group>
                <Form.Group className="mb-3">
                    <Form.Label>Location</Form.Label>
                    <Form.Control 
                        type="text" 
                        value={location} 
                        onChange={(e) => setLocation(e.target.value)} 
                        required 
                    />
                </Form.Group>
                <Form.Group className="mb-3">
                    <Form.Label>Tickets Available</Form.Label>
                    <Form.Control 
                        type="number" 
                        value={ticketsAvailable} 
                        onChange={(e) => setTicketsAvailable(e.target.value)} 
                        required 
                    />
                </Form.Group>
                <Form.Group className="mb-3">
                    <Form.Label>Price </Form.Label>
                    <Form.Control 
                        type="number" 
                        value={price} 
                        onChange={(e) => setPrice(e.target.value)} 
                        required 
                    />
                </Form.Group>
                
                <Form.Group className="mb-3">
                    <Form.Label>Event Image</Form.Label>
                    <Form.Control 
                        type="file" 
                        accept="image/*"
                        onChange={handleImageChange} 
                        required 
                    />
                </Form.Group>
                <Button type="submit" variant="primary">Create Event</Button>
            </Form>
        </Container>
        <Footer/>
        </>
    );
};

export default CreateEvent;
