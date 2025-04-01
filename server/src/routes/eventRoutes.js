const express = require('express');
const { createEvent} = require('../controllers/eventController');
const { updateEvent } = require('../controllers/eventController');
const {getAllEvents}=require('../controllers/eventController')
const { auth, adminOnly } = require('../middlewares/auth');
const Event = require('../models/Event');  
const { getEventById } = require('../controllers/eventController');
const router = express.Router();

const multer = require('multer');
const eventController = require('../controllers/eventController');
const upload= require('../middlewares/multer')



router.post('/events', upload.single("image"), createEvent);



// get events by id
router.get('/events/:id', (req, res) => {
  const eventId = req.params.id; // Ensure that this ID is a valid ObjectId
  Event.findById(eventId) // This expects an ObjectId, not a string like "events"
    .then(event => {
      if (!event) {
        return res.status(404).json({ message: 'Event not found' });
      }
      res.json(event);
    })
    .catch(error => {
      console.error(error);
      res.status(500).json({ message: 'Error retrieving event' });
    });
});

router.put('/events/:id', updateEvent, auth, adminOnly);

// Route to get all events
router.get('/events', getAllEvents); // Route for GET /api/events

// DELETE an event by ID
router.delete('/events/:id', async (req, res) => {
  try {
      const eventId = req.params.id;
      
      const event = await Event.findByIdAndDelete(eventId);

      if (!event) {
          return res.status(404).json({ msg: 'Event not found' });
      }

      res.json({ msg: 'Event deleted successfully' });
  } catch (err) {
      console.error(err.message);
      res.status(500).send('Server error');
  }
});

module.exports = router;
