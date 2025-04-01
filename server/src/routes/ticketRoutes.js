
const express = require('express');
const Ticket = require('../models/Ticket');  // Adjust to your model's location
const router = express.Router();
const { createTicketsForEvent } = require('../controllers/ticketController');
const { getTicketsForEvent } = require('../controllers/ticketController'); 
const { auth, adminOnly } = require('../middlewares/auth');

router.post('/tickets/create', createTicketsForEvent,auth, adminOnly);

// Get all tickets
router.get('/tickets', async (req, res) => {
  try {
    const tickets = await Ticket.find();  // Fetch all tickets from the database
    res.status(200).json({
      message: 'Tickets are retrieved successfully',
      tickets
    });
  } catch (error) {
    res.status(400).json({ message: 'Error retrieving tickets', error: error.message });
  }
});


router.get('/tickets/:eventId', getTicketsForEvent);


// UPDATE a ticket
router.put('/tickets/:ticketId', async (req, res) => {
  try {
      const { ticketId } = req.params;
      const { type, price } = req.body;

      const ticket = await Ticket.findById(ticketId);
      if (!ticket) return res.status(404).json({ message: "Ticket not found" });

      ticket.type = type;
      ticket.price = price;
      await ticket.save();

      res.json({ message: "Ticket updated successfully", ticket });
  } catch (error) {
      console.error("Error updating ticket:", error);
      res.status(500).json({ message: "Server error", error });
  }
});

// DELETE a ticket
router.delete("/tickets/:ticketId", async (req, res) => {
  try {
      await Ticket.findByIdAndDelete(req.params.ticketId);
      res.json({ message: "Ticket deleted successfully" });
  } catch (error) {
      res.status(500).json({ message: "Error deleting ticket" });
  }
});


module.exports = router;






