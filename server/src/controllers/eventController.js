const Event = require('../models/Event');
const mongoose = require('mongoose');
// const cloudinary = require('../config/cloudinaryConfig');
const multer = require('multer');
// const uploadToCloudinary = require('../utils/imageUpload');


//code today
          


const { v2: cloudinary } = require("cloudinary");
const fs = require("fs");

// Configure Cloudinary
cloudinary.config({
  cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
  api_key: process.env.CLOUDINARY_API_KEY,
  api_secret: process.env.CLOUDINARY_API_SECRET,
});

// Function to upload image to Cloudinary
const uploadToCloudinary = async (filePath) => {
  try {
    const result = await cloudinary.uploader.upload(filePath, { folder: "event-images" });
    fs.unlinkSync(filePath); // Delete local file after upload
    return result.secure_url; // Return the image URL
  } catch (error) {
    console.error("Cloudinary upload error:", error);
    throw error;
  }
};

















const createEvent = async (req, res) => {
  try {
    const { title, description, date, location,ticketsAvailable,price } = req.body;
    // let imageUrl = '';

    // Upload image to Cloudinary if an image is provided
if(!req.file){
  return res.status(400).json({error:'image not found'})
}
const cloudinaryRes= await uploadToCloudinary(req.file.path)
console.log(cloudinaryRes,"image uploaded by cloudinary")



   
    const newEvent = new Event({
      title,
      description,
      date,
      location,
      ticketsAvailable,
      price,
      image: cloudinaryRes,
    });

    await newEvent.save();
    res.status(201).json({
      message: 'Event created successfully',
      event: newEvent,
    });
  } catch (error) {
    res.status(500).json({ message: 'Error creating event', error: error.message });
  }
};

// update events

const updateEvent = async (req, res) => {
  try {
    const eventId = req.params.id;
    const updatedData = req.body;

    // Find and update the event by ID
    const event = await Event.findByIdAndUpdate(eventId, updatedData, {
      new: true,
      runValidators: true
    });

    if (!event) {
      return res.status(404).json({ message: 'Event not found' });
    }

    res.status(200).json({message: 'updated successfully',event});
     // Return the updated event
    
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: 'Server Error' });
  }
};

// Controller for getting all events
const getAllEvents = async (req, res) => {
  try {
    const events = await Event.find(); // Find all events from the database
    res.status(200).json(events); // Send a successful response with events data
  } catch (error) {
    res.status(500).json({
      message: "Error fetching events",
      error: error.message
    }); // Send an error response if fetching fails
  }
};



module.exports = {createEvent ,updateEvent,getAllEvents};
