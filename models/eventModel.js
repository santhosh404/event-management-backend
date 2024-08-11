import mongoose from "mongoose";

const eventSchema = new mongoose.Schema({
    posterImage: {
        type: String,
        required: true,
    },
    title: {
        type: String,
        required: true,
        trim: true,
    },
    description: {
        type: String,
        required: true
    },
    date: {
        type: Date,
        required: true,
    },
    time: {
        type: String,
        required: true,
    },
    location: {
        type: String,
        required: true,
    },
    organizerCompany: {
        type: String,
        required: true,
    },
    capacity: {
        type: Number,
        required: true,
    },
    price: {
        type: String,
        required: true,
    },
    tag: {
        type: String,
        enum: ['music', 'standup comedy']
    },
    bookings: [{
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Booking',
    }],
    status: {
        type: String,
        enum: ['upcoming', 'cancelled', 'finished'],
        default: 'upcoming',
    },
}, {
    timestamps: true,
})

export const Event = mongoose.model("Event", eventSchema);