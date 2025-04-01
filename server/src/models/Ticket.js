const mongoose = require('mongoose');

const ticketSchema = new mongoose.Schema({
    eventId: { 
        type: mongoose.Schema.Types.ObjectId, 
        ref: 'Event', 
        required: true 
    },
    type: { 
        type: String, 
        enum: ['Normal', 'VIP'], 
        required: true 
    },
    price: { 
        type: Number, 
        required: true 
    },
    status: { 
        type: String, 
        default: 'available' 
    }
});

module.exports = mongoose.model('Ticket', ticketSchema);
