import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useParams, useNavigate } from 'react-router-dom';
import { Form, Button, Container } from 'react-bootstrap';

const EditEvent = () => {
    const { id } = useParams();
    const navigate = useNavigate();
    const API_BASE_URL=import.meta.env.VITE_API_BASE_URL;
    const [event, setEvent] = useState({
        title: '',
        description: '',
        date: '',
        location: '',
        ticketsAvailable: '',
        price: '',
    });

    useEffect(() => {
        fetchEventDetails();
    }, []);

    const fetchEventDetails = async () => {
        try {
            const response = await axios.get(`${API_BASE_URL}/events/${id}`);
            setEvent(response.data);
        } catch (error) {
            console.error('Error fetching event details:', error);
        }
    };

    const handleChange = (e) => {
        setEvent({ ...event, [e.target.name]: e.target.value });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            await axios.put(`${API_BASE_URL}/events/${id}`, event);
            alert('Event updated successfully');
            navigate('/admin/manage-events'); // Redirect to Manage Events after update
        } catch (error) {
            console.error('Error updating event:', error);
            alert('Failed to update event');
        }
    };

    return (
        <Container className="mt-4">
            <h2>Edit Event</h2>
            <Form onSubmit={handleSubmit}>
                <Form.Group className="mb-3">
                    <Form.Label>Title</Form.Label>
                    <Form.Control type="text" name="title" value={event.title} onChange={handleChange} required />
                </Form.Group>

                <Form.Group className="mb-3">
                    <Form.Label>Description</Form.Label>
                    <Form.Control as="textarea" rows={3} name="description" value={event.description} onChange={handleChange} required />
                </Form.Group>

                <Form.Group className="mb-3">
                    <Form.Label>Date</Form.Label>
                    <Form.Control type="date" name="date" value={event.date.split('T')[0]} onChange={handleChange} required />
                </Form.Group>

                <Form.Group className="mb-3">
                    <Form.Label>Location</Form.Label>
                    <Form.Control type="text" name="location" value={event.location} onChange={handleChange} required />
                </Form.Group>

                <Form.Group className="mb-3">
                    <Form.Label>Tickets Available</Form.Label>
                    <Form.Control type="number" name="ticketsAvailable" value={event.ticketsAvailable} onChange={handleChange} required />
                </Form.Group>

                <Form.Group className="mb-3">
                    <Form.Label>Price</Form.Label>
                    <Form.Control type="number" name="price" value={event.price} onChange={handleChange} required />
                </Form.Group>

                <Button variant="primary" type="submit">
                    Update Event
                </Button>
            </Form>
        </Container>
    );
};

export default EditEvent;
