const mongoose = require('mongoose');


const EventSchema = new mongoose.Schema({
    name: {
        type: String,
        required: [true, "Please provide a event name"],
        unique: false,
    },
    date: {
        type: String,
        required: [true, "Please provide a date"],
    },
    type: {
        type: String,
        required: [true, "Please assign a type to your event"],
    },
    description: {
        type: String,
        required: [true, 'Please provide an event desctiption']
    },
    organiser_id: {
        type: String,
        required: true,
    }
});

const Event = mongoose.model("Event", EventSchema);

module.exports = {Event, EventSchema};