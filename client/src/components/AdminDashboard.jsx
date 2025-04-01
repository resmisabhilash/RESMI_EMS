import React from "react";
import { Link } from "react-router-dom";
import { Container, Row, Col, Card, Button } from "react-bootstrap";
import Navbar from "./Navbar";
import Footer from "./Footer";
import { useNavigate } from 'react-router-dom';



const AdminDashboard = () => {
  const navigate = useNavigate();
  return (
    <>
    <Navbar/>
    <Container className="mt-5">
      <h2 className="text-center mb-5">Admin Dashboard</h2>
      <Row className="justify-content-center">
        {/* Manage Events */}
        <Col md={4}>
          <Card className="text-center shadow">
            <Card.Body>
              <Card.Title>Manage Events</Card.Title>
              <Card.Text>Create, update, or delete events.</Card.Text>
              <Link to="/admin/events">
                <Button variant="primary">Go to Events</Button>
              </Link>
            </Card.Body>
          </Card>
        </Col>

      
        <Col md={4}>
          <Card className="text-center shadow">
            <Card.Body>
              <Card.Title>Manage Tickets</Card.Title>
              <Card.Text>Create and manage ticket types.</Card.Text>
              <Button 
    variant="success" 
    onClick={() => navigate(`/admin/manage-tickets`)}
>
    Go to Tickets
</Button>


            </Card.Body>
          </Card>
        </Col>

       
        <Col md={4}>
          <Card className="text-center shadow">
            <Card.Body>
              <Card.Title>Manage Users</Card.Title>
              <Card.Text>View, add, or remove users.</Card.Text>
              <Link to="/admin/users">
                <Button variant="danger">Go to Users</Button>
              </Link>
            </Card.Body>
          </Card>
        </Col>
      </Row>
    </Container>
    <Footer/>
    </>
  );
};

export default AdminDashboard;
