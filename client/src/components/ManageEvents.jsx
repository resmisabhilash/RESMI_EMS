



import React, { useEffect, useState } from 'react';
import { Table, Button, Container } from 'react-bootstrap';
import axios from 'axios';
import { Link } from 'react-router-dom';
import { useNavigate } from 'react-router-dom';
import Navbar from "./Navbar";
import Footer from "./Footer";

const ManageEvents = () => {
    const [events, setEvents] = useState([]);
    const API_BASE_URL=import.meta.env.VITE_API_BASE_URL;

    useEffect(() => {
        const fetchEvents = async () => {
            try {
                const response = await axios.get(`${API_BASE_URL}/events`);
                setEvents(response.data);
            } catch (error) {
                console.error('Error fetching events:', error);
            }
        };

        fetchEvents();
    }, []);
    const navigate = useNavigate();
    const handleDelete = async (id) => {
        if (window.confirm('Are you sure you want to delete this event?')) {
            try {
                await axios.delete(`${API_BASE_URL}/events/${id}`);
                setEvents(events.filter(event => event._id !== id));
            } catch (error) {
                console.error('Error deleting event:', error);
            }
        }
    };
  //Navigate to Edit Page
    const handleEdit = (eventId) => {
        navigate(`/admin/edit-event/${eventId}`);
    };

    return (
        <><Navbar/>
        <Container className="mt-4">
            <h2>Manage Events</h2>
            <div className="d-flex mt-3">
                
            <Button variant="success" className="me-3" onClick={() => navigate('/admin/events/create')}>
     Create Event
</Button>
<Button variant="success" onClick={() => navigate('/admin-dashboard')}>
    Go back to Admin Dashboard
</Button>


            </div>
          
            <Table className='table   mt-5'striped bordered hover>
                <thead>
                    <tr>
                        <th>Title</th>
                        <th>Date</th>
                        <th>Location</th>
                        <th>Tickets Available</th>
                        <th>Price</th>
                        <th>Actions</th>
                    </tr>
                </thead>
                <tbody>
                    {events.map(event => (
                        <tr key={event._id}>
                            <td>{event.title}</td>
                            <td>{new Date(event.date).toLocaleDateString()}</td>
                            <td>{event.location}</td>
                            <td>{event.ticketsAvailable}</td>
                            <td>{event.price}</td>
                            <td>
                            <Button variant="warning" className="me-2" onClick={() => handleEdit(event._id)}>
                                    Edit
                                </Button>
                                <Button variant="danger" onClick={() => handleDelete(event._id)}>Delete</Button>
                            </td>
                        </tr>
                    ))}
                </tbody>
            </Table>
        </Container>
        <Footer/>
        </>
    );
};

export default ManageEvents;
