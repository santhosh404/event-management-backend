import { Event } from "../models/eventModel";


// Create event handler
export const createEventHandler = async (req, res) => {

    const { posterImage, title, description, date, time, location, organizerCompany, capacity, price } = req.body;

    try {

        if (!posterImage || !title || !description || !date || !time || !location || !capacity || !organizerCompany || !price) {
            return res.status(400).json({
                status: "Error",
                message: "Create Event Failed!",
                data: {
                    error: "Missing required fields 'posterImage', 'title', 'description', 'date', 'time', 'location', 'organizerCompany', 'capacity', 'price'"
                }
            });
        }

        const newEvent = new Event({
            posterImage,
            title,
            description,
            date,
            time,
            location,
            organizerCompany,
            capacity,
            price
        })

        await newEvent.save();

        return res.status(201).json({
            status: "Success",
            message: "Event created successfully!",
            data: newEvent
        });


    } catch (err) {
        return res.status(500).json({
            status: "Error",
            message: "Internal Server Error!",
            data: {
                error: err.message
            }
        });
    }
}

// Get event handler
export const getEventsHandler = async (req, res) => {
    try {
        const events = await Event.find();
        return res.status(200).json({
            status: "Success",
            message: "Events fetched successfully!",
            data: events
        });
    } catch (err) {
        return res.status(500).json({
            status: "Error",
            message: "Internal Server Error!",
            data: {
                error: err.message
            }
        });
    }
}

// Update event handler
export const updateEventHandler = async (req, res) => {
    const { id } = req.params;
    const { posterImage, title, description, date, time, location, organizerCompany, capacity, price } = req.body;
    try {
        const event = await Event.findByIdAndUpdate(
            id, 
            { 
                posterImage, 
                title, 
                description, 
                date, 
                time, 
                location, 
                organizerCompany, 
                capacity,
                price
            }, 
            { 
                new: true 
            }
        );
        if (!event) {
            return res.status(404).json({
                status: "Error",
                message: "Update Event Failed!",
                data: {
                    error: `Event with id ${id} not found!`
                }
            });
        }
        return res.status(200).json({
            status: "Success",
            message: "Event updated successfully!",
            data: event
        });
    } catch (err) {
        return res.status(500).json({
            status: "Error",
            message: "Internal Server Error!",
            data: {
                error: err.message
            }
        });
    }
}

//Delete event handler
export const deleteEventHandler = async (req, res) => {
    const { id } = req.params;
    try {
        const event = await Event.findByIdAndDelete(id);
        if (!event) {
            return res.status(404).json({
                status: "Error",
                message: "Delete Event Failed!",
                data: {
                    error: `Event with id ${id} not found!`
                }
            });
        }
        return res.status(200).json({
            status: "Success",
            message: "Event deleted successfully!",
            data: event
        });
    } catch (err) {
        return res.status(500).json({
            status: "Error",
            message: "Internal Server Error!",
            data: {
                error: err.message
            }
        });
    }
}