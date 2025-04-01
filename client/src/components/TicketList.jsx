import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import axios from 'axios';

const TicketList = () => {
    const { eventId } = useParams(); // Retrieves eventId from URL
    const [tickets, setTickets] = useState([]);
    const [error, setError] = useState('');
    const API_BASE_URL=import.meta.env.VITE_API_BASE_URL;

    useEffect(() => {
        const fetchTickets = async () => {
            try {
                const response = await axios.get(`${API_BASE_URL}/tickets/${eventId}`);
                setTickets(response.data.tickets);
            } catch (error) {
                console.error('Error fetching tickets:', error);
                setError('Failed to fetch tickets. Please try again.');
            }
        };

        fetchTickets();
    }, [eventId]);

    if (error) return <p>{error}</p>;

    return (
        <div>
            <h1>Tickets for Event</h1>
            {tickets.map(ticket => (
                <div key={ticket._id}>
                    <p>Type: {ticket.type}</p>
                    <p>Price: ₹{ticket.price}</p>
                    <p>Status: {ticket.status}</p>
                </div>
            ))}
        </div>
    );
};

export default TicketList;
