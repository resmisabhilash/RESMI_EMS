import React, { useEffect, useState } from "react";
import { Container, Row, Col, Card, Button } from "react-bootstrap";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import Navbar from "./Navbar";
import Footer from "./Footer";

const ManageTickets = () => {
    const [events, setEvents] = useState([]);
    const navigate = useNavigate();
    const API_BASE_URL=import.meta.env.VITE_API_BASE_URL;

    useEffect(() => {
        axios.get(`${API_BASE_URL}/events`)
            .then(response => {
                setEvents(response.data);
            })
            .catch(error => console.error("Error fetching events:", error));
    }, []);

    const handleDeleteTicket = async (ticketId, eventId) => {
        try {
            await axios.delete(`${API_BASE_URL}/tickets/${ticketId}`);

            setEvents(prevEvents =>
                prevEvents.map(event => {
                    if (event._id === eventId) {
                        return {
                            ...event,
                            tickets: event.tickets ? event.tickets.filter(ticket => ticket._id !== ticketId) : []
                        };
                    }
                    return event;
                })
            );
        } catch (error) {
            console.error("Error deleting ticket:", error);
        }
    };

    return (
        <>
            <Navbar />
            <Container className="mt-5">
                <h2 className="text-center mb-4">Manage Tickets</h2>
                <Row>
                    {events.length > 0 ? (
                        events.map(event => (
                            <Col md={4} key={event._id}>
                                <Card className="mb-4 shadow">
                                    <Card.Body>
                                        <Card.Title>{event.title}</Card.Title>
                                        <Card.Text>{event.description}</Card.Text>

                                        <Button
                                            variant="primary"
                                            onClick={() => navigate(`/admin/events/${event._id}/create-ticket`)}
                                        >
                                            Create Ticket
                                        </Button>


                                    </Card.Body>
                                </Card>
                            </Col>
                        ))
                    ) : (
                        <p>No events found.</p>
                    )}
                </Row>
            </Container>

            <div className="d-flex justify-content-center mt-4">
                <Button variant="success" onClick={() => navigate("/admin-dashboard")}>
                    Go to Admin Dashboard
                </Button>
            </div>

            <Footer />
        </>
    );
};

export default ManageTickets;
