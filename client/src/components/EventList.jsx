import React, { useEffect, useState } from "react";
import axios from "axios";
import { Container, Row, Col, Card, Button } from "react-bootstrap";
import { Link } from "react-router-dom";
import Navbar from "./Navbar";
import Footer from "./Footer";

const EventList = () => {
  const [events, setEvents] = useState([]);
  const [loading, setLoading] = useState(true);
  const API_BASE_URL=import.meta.env.VITE_API_BASE_URL;

  useEffect(() => {
    const fetchEvents = async () => {
      try {
        const response = await axios.get(`${API_BASE_URL}/events`);
        setEvents(response.data);
      } catch (error) {
        console.error("Error fetching events:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchEvents();
  }, []);

  if (loading) return <p className="text-center mt-5">Loading events...</p>;

  return (
    <div>
      <Navbar />
      <Container className="mt-4">
        <h2 className="text-center mb-4">Upcoming Events</h2>
        <Row>
          {events.map((event) => (
            <Col key={event._id} xs={12} sm={6} md={4} lg={3} className="mb-4">
              <Card className="h-100 shadow-sm">
                {event.image && (
                  <Card.Img variant="top" src={event.image} alt={event.title} />
                )}
                <Card.Body>
                  <Card.Title>{event.title}</Card.Title>
                  <Card.Text>
                    <strong>Date:</strong> {new Date(event.date).toLocaleDateString()}
                    <br />
                    <strong>Location:</strong> {event.location}
                  </Card.Text>
                  <Link to={`/events/${event._id}`}>
                    <Button variant="primary">View Details</Button>
                  </Link>
                </Card.Body>
              </Card>
            </Col>
          ))}
        </Row>
      </Container>
      <Footer />
    </div>
  );
};

export default EventList;
