const Ticket = require('../models/Ticket');
const Event = require('../models/Event');

// Create Multiple Tickets for an Event
const createTicketsForEvent = async (req, res) => {
  const { eventId, normalTickets, vipTickets, normalPrice, vipPrice } = req.body;

  try {
      const eventExists = await Event.findById(eventId);
      if (!eventExists) {
          return res.status(404).json({ message: 'Event not found' });
      }

      const tickets = [];

      // Create Normal Tickets
      for (let i = 0; i < normalTickets; i++) {
          tickets.push({
              eventId,
              type: 'Normal',
              price: normalPrice,
              status: 'available'
          });
      }

      // Create VIP Tickets
      for (let i = 0; i < vipTickets; i++) {
          tickets.push({
              eventId,
              type: 'VIP',
              price: vipPrice,
              status: 'available'
          });
      }

      const createdTickets = await Ticket.insertMany(tickets);

      res.status(201).json({
          message: 'Tickets created successfully',
          tickets: createdTickets
      });
  } catch (error) {
      console.error(error);
      res.status(500).json({ message: 'Server error', error });
  }
};






// // Create a Ticket for an Event
// const createTicket = async (req, res) => {
//   try {
//     const { eventId,userId,type,price,status} = req.body;

//     // Create a new ticket
//     const newTicket = new Ticket({
//       eventId,userId,type,price,status
//     });

//     // Save the ticket to the database
//     await newTicket.save();

//     res.status(201).json({
//       message: 'Ticket created successfully',
//       ticket: newTicket,
//     });
//   } catch (error) {
//     console.error(error);
//     res.status(500).json({ message: 'Server error', error });
//   }
// // };

// Get All Tickets for a Specific Event
const getTicketsForEvent = async (req, res) => {
  try {
      const { eventId } = req.params;

      // Fetch Event Details
      const event = await Event.findById(eventId);
      if (!event) {
          return res.status(404).json({ message: 'Event not found' });
      }

      // Fetch Tickets for the Event
      const tickets = await Ticket.find({ eventId });
      if (!tickets || tickets.length === 0) {
          return res.status(404).json({ message: 'No tickets found for this event' });
      }

      res.status(200).json({
          message: 'Tickets retrieved successfully',
          event,          // Include event details
          tickets         // Include ticket details
      });
  } catch (error) {
      console.error(error);
      res.status(500).json({ message: 'Server error', error });
  }
};




// Get Ticket Details by Ticket ID
const getTicketDetails = async (req, res) => {
  try {
    const { ticketId } = req.params;

    // Find the ticket by ID
    const ticket = await Ticket.findById(ticketId).populate('eventId', 'title description');

    if (!ticket) {
      return res.status(404).json({ message: 'Ticket  not found' });
    }

    res.status(200).json({ ticket });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Server error', error });
  }
};
// Update Ticket Information
const updateTicket = async (req, res) => {
  try {
    const { ticketId } = req.params;
    const { price } = req.body;
    // Find and update the ticket
    const updatedTicket = await Ticket.findByIdAndUpdate(
      ticketId,
      { price },
      { new: true }
    );
    if (!updatedTicket) {
      return res.status(404).json({ message: 'Ticket not found' });
    }

    res.status(200).json({ message: 'Ticket updated successfully', updatedTicket });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Server error', error });
  }
};
// Delete a Ticket
const deleteTicket = async (req, res) => {
  try {
    const { ticketId } = req.params;

    // Delete the ticket from the database
    const deletedTicket = await Ticket.findByIdAndDelete(ticketId);

    if (!deletedTicket) {
      return res.status(404).json({ message: 'Ticket not found' });
    }

    res.status(200).json({ message: 'Ticket deleted successfully' });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Server error', error });
  }
};

module.exports = {
  createTicketsForEvent,
  getTicketsForEvent,
  getTicketDetails,
  updateTicket,
  deleteTicket,
};
