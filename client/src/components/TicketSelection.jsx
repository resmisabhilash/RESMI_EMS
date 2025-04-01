



import React, { useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import axios from 'axios';
import { Container, Spinner, Alert, Form, Button, Card } from 'react-bootstrap';
import Navbar from './Navbar';
import Footer from './Footer';

const TicketSelection = () => {
    const { eventId } = useParams();
    const navigate = useNavigate();
    const [event, setEvent] = useState(null);
    const [tickets, setTickets] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState('');

    // States for ticket selection
    const [selectedType, setSelectedType] = useState('');
    const [quantity, setQuantity] = useState(1);
    const API_BASE_URL=import.meta.env.VITE_API_BASE_URL;

    useEffect(() => {
        const fetchTickets = async () => {
            try {
                const response = await axios.get(`${API_BASE_URL}/tickets/${eventId}`);
                if (response.data && response.data.event) {
                    setEvent(response.data.event);
                    setTickets(response.data.tickets);
                } else {
                    setError('Event data is missing or incomplete.');
                }
            } catch (error) {
                console.error('Error fetching tickets:', error);
                setError('Failed to fetch tickets.');
            } finally {
                setLoading(false);
            }
        };

        fetchTickets();
    }, [eventId]);

    const handleProceedToPayment = () => {
        if (!selectedType || quantity < 1) {
            alert('Please select a ticket type and quantity.');
            return;
        }
        navigate('/payment', { state: { eventId, selectedType, quantity } });
    };

    if (loading) {
        return (
            <Container className="text-center mt-5">
                <Spinner animation="border" variant="primary" />
                <p>Loading...</p>
            </Container>
        );
    }

    if (error) {
        return <Alert variant="danger" className="mt-4">{error}</Alert>;
    }

    if (!event) {
        return <Alert variant="warning" className="mt-4">Event not found.</Alert>;
    }

    return (
        <>
            <Navbar />
            <Container className="mt-5">
                <Card className="shadow-lg p-4 rounded">
                    <Card.Body>
                        <Card.Title className="text-center">{event.title}</Card.Title>
                        <Card.Text className="text-center">{event.description}</Card.Text>
                        
                        <h4 className="mt-4">Select Your Ticket</h4>

                        <Form>
                            <Form.Group className="mb-3">
                                <Form.Label>Ticket Type</Form.Label>
                                <Form.Select
                                    value={selectedType}
                                    onChange={(e) => setSelectedType(e.target.value)}
                                >
                                    <option value="">-- Select Ticket Type --</option>
                                    {tickets.map((ticket) => (
                                        <option key={ticket._id} value={ticket.type}>
                                            {ticket.type} - ₹{ticket.price}
                                        </option>
                                    ))}
                                </Form.Select>
                            </Form.Group>

                            <Form.Group className="mb-3">
                                <Form.Label>Quantity</Form.Label>
                                <Form.Control
                                    type="number"
                                    value={quantity}
                                    onChange={(e) => setQuantity(Math.max(1, Number(e.target.value)))}
                                    min="1"
                                />
                            </Form.Group>

                            <Button
                                variant="primary"
                                className="w-100 mt-3"
                                onClick={handleProceedToPayment}
                            >
                                Proceed to Payment
                            </Button>
                        </Form>
                    </Card.Body>
                </Card>
            </Container>
            <Footer />
        </>
    );
};

export default TicketSelection;
