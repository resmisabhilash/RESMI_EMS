import React, { useState } from "react";
import axios from "axios";
import { useNavigate,useParams } from "react-router-dom";
import { Form, Button, Container, Row, Col, Alert } from "react-bootstrap";

const CreateTicket = () => {
    const navigate = useNavigate();
    const { eventId } = useParams();
    // Define state for form inputs
    const [normalTickets, setNormalTickets] = useState("");
    const [vipTickets, setVipTickets] = useState("");
    const [normalPrice, setNormalPrice] = useState("");
    const [vipPrice, setVipPrice] = useState("");
    const [error, setError] = useState(null);
    const API_BASE_URL=import.meta.env.VITE_API_BASE_URL;
    const handleCreate = async (e) => {
        e.preventDefault();

        if (!eventId || !normalTickets || !vipTickets || !normalPrice || !vipPrice) {
            setError("All fields are required!");
            return;
        }

        try {
            const response = await axios.post(`${API_BASE_URL}/tickets/create`, {
                eventId,
                normalTickets: Number(normalTickets),
                vipTickets: Number(vipTickets),
                normalPrice: Number(normalPrice),
                vipPrice: Number(vipPrice),
            });

            alert("Tickets created successfully!");
            navigate("/admin/manage-tickets");
        } catch (error) {
            setError(error.response?.data?.message || "Failed to create ticket");
        }
    };

    return (
        <Container className="mt-5">
            <Row className="justify-content-md-center">
                <Col md={6}>
                    <h2 className="text-center mb-4">Create Tickets</h2>
                    {error && <Alert variant="danger">{error}</Alert>}
                    <Form onSubmit={handleCreate}>
                        <Form.Group className="mb-3">
                            <Form.Label>Normal Tickets</Form.Label>
                            <Form.Control 
                                type="number" 
                                value={normalTickets} 
                                onChange={(e) => setNormalTickets(e.target.value)} 
                                required 
                            />
                        </Form.Group>

                        <Form.Group className="mb-3">
                            <Form.Label>VIP Tickets</Form.Label>
                            <Form.Control 
                                type="number" 
                                value={vipTickets} 
                                onChange={(e) => setVipTickets(e.target.value)} 
                                required 
                            />
                        </Form.Group>

                        <Form.Group className="mb-3">
                            <Form.Label>Normal Ticket Price</Form.Label>
                            <Form.Control 
                                type="number" 
                                value={normalPrice} 
                                onChange={(e) => setNormalPrice(e.target.value)} 
                                required 
                            />
                        </Form.Group>

                        <Form.Group className="mb-3">
                            <Form.Label>VIP Ticket Price</Form.Label>
                            <Form.Control 
                                type="number" 
                                value={vipPrice} 
                                onChange={(e) => setVipPrice(e.target.value)} 
                                required 
                            />
                        </Form.Group>

                        <Button variant="primary" type="submit" className="w-100">
                            Create Tickets
                        </Button>
                    </Form>
                </Col>
            </Row>
        </Container>
    );
};

export default CreateTicket;
