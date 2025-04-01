


import React, { useEffect, useState } from 'react';
import { useParams, Link } from 'react-router-dom';
import axios from 'axios';
import { Card, Container, Button, Spinner } from 'react-bootstrap';
import Navbar from "./Navbar";
import Footer from "./Footer";

const EventDetails = () => {
    const { id } = useParams();
    const [event, setEvent] = useState(null);
    const API_BASE_URL=import.meta.env.VITE_API_BASE_URL;

    useEffect(() => {
        const fetchEvent = async () => {
            try {
                const response = await axios.get(`${API_BASE_URL}/events/${id}`);
                setEvent(response.data);
            } catch (error) {
                console.error('Error fetching event details:', error);
            }
        };
        fetchEvent();
    }, [id]);

    if (!event) {
        return (
            <Container className="text-center mt-5">
                <Spinner animation="border" variant="primary" />
                <p>Loading event details...</p>
            </Container>
        );
    }

    return (
        <>
            <Navbar />
            <Container className="mt-4 d-flex justify-content-center">
                <Card className="shadow-lg rounded event-card">
                    <Card.Img 
                        variant="top" 
                        src={event.image || 'default-image.jpg'} 
                        className="event-image"
                    />
                    <Card.Body className="text-center">
                        <Card.Title className="event-title">{event.title}</Card.Title>
                        <Card.Text className="event-description">
                            <strong>Description:</strong> {event.description}
                        </Card.Text>
                        <Card.Text><strong>Date:</strong> {new Date(event.date).toLocaleDateString()}</Card.Text>
                        <Card.Text><strong>Location:</strong> {event.location}</Card.Text>
                        <Card.Text><strong>Tickets Available:</strong> {event.ticketsAvailable}</Card.Text>
                        <Card.Text><strong>Price:</strong> {event.price}</Card.Text>
                        
                        <Link to={`/tickets/${id}`}>
                            <Button variant="primary" className="w-100 mt-3">Get Your Ticket</Button>
                        </Link>
                    </Card.Body>
                </Card>
            </Container>
            <Footer />
        </>
    );
};

export default EventDetails;
