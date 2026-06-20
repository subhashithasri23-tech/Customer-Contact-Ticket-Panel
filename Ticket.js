const mongoose = require("mongoose");


const messageSchema = new mongoose.Schema({
    sender: {
        type: String,
        required: true
    },

    text: {
        type: String,
        required: true
    },

    createdAt: {
        type: Date,
        default: Date.now
    }
});


const ticketSchema = new mongoose.Schema({

    ticketId: {
        type: String,
        required: true,
        unique: true
    },


    customerName: {
        type: String,
        required: true
    },


    messages: [messageSchema]

});


module.exports = mongoose.model("Ticket", ticketSchema);