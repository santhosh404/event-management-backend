import { Event } from "../models/eventModel.js";


// Create event handler
export const createEventHandler = async (req, res) => {

    const { posterImage, title, description, date, time, location, organizerCompany, capacity, price, tag, status } = req.body;

    try {

        if (!posterImage || !title || !description || !date || !time || !location || !capacity || !organizerCompany || !price || !tag || !status) {
            return res.status(400).json({
                status: "Error",
                message: "Create Event Failed!",
                data: {
                    error: "Missing required fields 'posterImage', 'title', 'description', 'date', 'time', 'location', 'organizerCompany', 'capacity', 'price', 'tag', 'status'"
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
            price,
            tag,
            status
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

// Get event by id handler

export const getEventByIdHandler = async (req, res) => {
    const { id } = req.params;
    try {
        const event = await Event.findById(id);
        if (!event) {
            return res.status(404).json({
                status: "Error",
                message: "Event not found!",
                data: {
                    error: `Event with id ${id} not found!`
                }
            });
        }
        return res.status(200).json({
            status: "Success",
            message: "Event fetched successfully!",
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

// Update event handler
export const updateEventHandler = async (req, res) => {
    const { id } = req.params;
    const { posterImage, title, description, date, time, location, organizerCompany, capacity, price, tag, status } = req.body;
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
                price,
                tag,
                status
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
    console.log(id)
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

// Get Event by tag name
export const getEventByTagHandler = async (req, res) => {
    try {
        const eventByTag = await Event.aggregate([
            {
                $group: {
                    _id: '$tag',
                    tagCount: { $sum: 1 }
                }
            }
        ])
        console.log(eventByTag);
        return res.status(200).json({
            status: "Success",
            message: "Events fetched successfully!",
            data: {
                tag: eventByTag
            }
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