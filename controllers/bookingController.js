import { Booking } from "../models/bookingModel.js";
import { Event } from "../models/eventModel.js";
import { Payment } from "../models/paymentModel.js";
import { User } from "../models/userModel.js";
import { sendTicketEmailToUser } from "../services/mailServices.js";

export const bookEventHandler = async (req, res) => {
    const { paymentId, eventId, noOfSeats, bookingDate } = req.body;

    try {

        if (!eventId || !noOfSeats || !bookingDate || !paymentId) {
            return res.status(400).json({
                status: "Error",
                message: "Booking Failed!",
                data: {
                    error: "Missing required fields 'eventId', 'noOfSeats', 'bookingDate', 'paymentId'"
                }
            });
        }

        const event = await Event.findById(eventId);
        if (!event) {
            return res.status(404).json({
                status: "Error",
                message: "Event Not Found!",
                data: null
            });
        }

        if (event.seatsLeft < noOfSeats) {
            return res.status(400).json({
                status: "Error",
                message: "Booking Failed!",
                data: {
                    error: "Not enough seats available for this event"
                }
            });
        }

        // Adding payment record
        const payment = new Payment({
            paymentId,
            eventId,
            paidBy: req.user._id
        });
        await payment.save();

        // Adding booking record
        const booking = new Booking({
            eventId,
            bookedBy: req.user._id,
            noOfSeats,
            bookingDate,
            paymentStatus: 1, // Harcoding it as 1 (Which is paid)
            paymentId: payment._id
        });

        await booking.save();
        await Event.findOneAndUpdate({ _id: eventId }, { $inc: { capacity: -noOfSeats }, $push: { bookings: booking._id } }); // decrementing the noOfSeats by noOfSeats

        //Sending ticket email to user
        const user = await User.findById(req.user._id);
        await sendTicketEmailToUser(user, event, booking);

        return res.status(201).json({
            status: "Success",
            message: "Booking Successful!",
            data: booking
        });
    }

    catch (err) {
        return res.status(500).json({
            status: "Error",
            message: "Internal Server Error!",
            data: {
                error: err.message
            }
        });
    }
}