import { Booking } from "../models/bookingModel";


export const bookEventHandler = async (req, res) => {
    const { eventId, bookedBy, noOfSeats, bookingDate } = req.body;

    try {

        if (!eventId || !bookedBy || !noOfSeats || !bookingDate) {
            return res.status(400).json({
                status: "Error",
                message: "Booking Failed!",
                data: {
                    error: "Missing required fields 'eventId', 'bookedBy', 'noOfSeats', 'bookingDate'"
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

        const booking = new Booking({
            eventId,
            bookedBy,
            noOfSeats,
            bookingDate
        });

        await booking.save();
        await event.findOneAndUpdate({ _id: eventId }, { $inc: { noOfSeats: -noOfSeats } }); // decrementing the noOfSeats by noOfSeats

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
            data: err.message
        });
    }
}