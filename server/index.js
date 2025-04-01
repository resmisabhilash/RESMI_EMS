const express = require('express');
const dotenv = require('dotenv');
const cors = require('cors');
const connectDB = require('./src/config/db');
const authRoutes = require('./src/routes/authRoutes');
const eventRoutes = require('./src/routes/eventRoutes');
const paymentRoutes = require('./src/routes/paymentRoutes');
const adminRoutes = require('./src/routes/adminRoutes');
const authMiddleware = require("./src/middlewares/auth");
const ticketRoutes = require('./src/routes/ticketRoutes');

const reviewRoutes = require("./src/routes/reviewRoutes");
const Ticket = require('./src/models/Ticket'); 




dotenv.config();
connectDB();

const app = express();

// app.use(cors({
//   origin: process.env.FRONTEND_URL,
//   methods: ["GET", "POST", "PUT", "DELETE"],
//   credentials: true,
// }));


app.use(cors({
  origin: [ "https://rework-ems-frontend.vercel.app","http://localhost:5173"], 
  methods: ["GET", "POST", "PUT", "DELETE"],
  credentials: true,
}));

// app.use(cors({
//   origin: "https://rework-ems-frontend.vercel.app", // Add frontend URL
//   methods: ["GET", "POST", "PUT", "DELETE"],
//   credentials: true,
// }));



app.use(express.json());


// Routes
app.use("/api", adminRoutes);
// Use the event routes
app.use('/api', eventRoutes);
app.use('/', eventRoutes);
app.use('/api/auth', authRoutes);
app.use('/api/events', eventRoutes);

app.use("/api/payments", paymentRoutes);
app.use('/api/admin', adminRoutes);
app.use('/api', authRoutes);
app.use('/api', ticketRoutes);
// Use the ticket routes
app.use("/api/tickets", ticketRoutes);
// POST route for creating a ticket
app.post('/api/tickets', async (req, res) => {
  try {
    const { eventId, userId, type, price } = req.body;

    // Validation for required fields
    if (!eventId || !userId || !type || !price) {
      return res.status(400).json({ message: 'All fields are required' });
    }

    // Create a new ticket
    const newTicket = new Ticket({
      eventId,
      userId,
      type,
      price,
    });

    await newTicket.save();

    res.status(201).json({
      message: 'Ticket created successfully',
      ticket: newTicket,
    });
  } catch (error) {
    res.status(500).json({ message: 'Error creating ticket', error: error.message });
  }
});
// Route to get all tickets
app.get('/api/tickets', async (req, res) => {
  try {
    // Fetch all tickets from the database
    const tickets = await Ticket.find();

    // Return the tickets in the response
    res.status(200).json({ tickets });
  } catch (error) {
    res.status(500).json({ message: 'Error fetching tickets', error: error.message });
  }
});


// Route to get ticket by ID
app.get('/api/tickets/:eventId', async (req, res) => {
  try {
    const { eventId } = req.params;
    

    if (!eventId || eventId.length !== 24) {
        return res.status(400).json({ message: 'Invalid event ID' });
    }

    const tickets = await Ticket.find({ eventId }); 

    if (!tickets || tickets.length === 0) {
        return res.status(404).json({ message: 'No tickets found for this event' });
    }

    res.status(200).json({ tickets });
} catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Server error', error });
}
});


app.use("/api/events", reviewRoutes);



const PORT = process.env.PORT || 5550;
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
