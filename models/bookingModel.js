import mongoose from "mongoose";


const bookingSchema = new mongoose.Schema({
    eventId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Event',
        required: true
    },
    bookedBy: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User',
        required: true
    },
    noOfSeats: {
        type: Number,
        required: true
    },
    bookingDate: {
        type: Date,
        required: true
    },
    paymentStatus: {
        type: Number,
        required: true,
        default: 0
    },
    paymentId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Payment'
    }
},
    {
        timestamps: true
    })

export const Booking = mongoose.model('Booking', bookingSchema);