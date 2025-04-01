const express = require("express");
const Review = require("../models/Review");
const Event = require("../models/Event");
const User = require("../models/User");
const router = express.Router();

// Post a review for an event
router.post("/:eventId/review", async (req, res) => {
  const { userId, rating, comment } = req.body;
  const eventId = req.params.eventId;

  try {
    // Check if the event exists
    const event = await Event.findById(eventId);
    if (!event) {
      return res.status(404).json({ message: "Event not found" });
    }

    // Check if the user exists
    const user = await User.findById(userId);
    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }

    // Check if user has already reviewed the event
    const existingReview = await Review.findOne({ userId, eventId });
    if (existingReview) {
      return res.status(400).json({ message: "User has already reviewed this event" });
    }

    // Create the new review
    const newReview = new Review({
      userId,
      eventId,
      rating,
      comment,
    });

    // Save the review to the database
    await newReview.save();

    // Return the created review
    res.status(201).json(newReview);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

// Get all reviews for an event
router.get("/:eventId/reviews", async (req, res) => {
  const eventId = req.params.eventId;

  try {
    // Get all reviews for the event
    const reviews = await Review.find({ eventId }).populate("userId", "username");

    // Return reviews
    res.status(200).json(reviews);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

module.exports = router;
