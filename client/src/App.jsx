import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import HomePage from './components/HomePage';
import LoginPage from './components/LoginPage';
import RegisterPage from './components/RegisterPage';
import EventList from './components/EventList';
import EventDetails from './components/EventDetails'
import TicketSelection from './components/TicketSelection';
import CreateTicket from './components/CreateTicket';

import AdminDashboard from './components/AdminDashboard';
import ManageEvents from './components/ManageEvents';
import ManageTickets from './components/ManageTickets';
import ManageUsers from './components/ManageUsers';
import CreateEvent from './components/CreateEvent';
import EditEvent from './components/EditEvent';
import PrivacyPolicy from './components/PrivacyPolicy';
import TermsAndConditions from './components/TermsAndConditions';
import PaymentPage from "./components/PaymentPage";
import PaymentSuccess from './components/PaymentSuccess';

import "bootstrap/dist/css/bootstrap.min.css";


import './App.css';


const App = () => {
  return (
    <Router>
      <Routes>
      <Route path="/" element={<HomePage />} />
      <Route path="/login" element={<LoginPage />} />
      <Route path="/register" element={<RegisterPage />} />
      <Route path="/admin-dashboard" element={<AdminDashboard />} />
      <Route path="/admin/events" element={<ManageEvents />} />
      <Route path="/admin/manage-events" element={<ManageEvents />} />

      <Route path="/admin/events/create" element={<CreateEvent />} />
      <Route path="/admin/edit-event/:id" element={<EditEvent />} />
    

      <Route path="/api/tickets" element={<ManageTickets />} />
      <Route path="/admin/manage-tickets" element={<ManageTickets />} />
      <Route path="/admin/events/:eventId/create-ticket" element={<CreateTicket />} />
      
      <Route path="/payment" element={<PaymentPage />} />

      <Route path="/admin/users" element={<ManageUsers />} />
      <Route path="/events" element={<EventList />} />
      <Route path="/events/:id" element={<EventDetails />} />
      <Route path="/tickets/:eventId" element={<TicketSelection />} />
     
 


      <Route path="/privacy-policy" element={<PrivacyPolicy />} />
      <Route path="/terms" element={<TermsAndConditions />} />
      <Route path="/payment-success" element={<PaymentSuccess />} />
      
      </Routes>
    </Router>
  );
};

export default App;
