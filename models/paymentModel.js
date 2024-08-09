import mongoose from "mongoose";


const paymentSchema = new mongoose.Schema({
    paymentId: {
        type: String,
        required: true
    },
    eventId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Event",
        required: true
    },
    paidBy: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "User",
        required: true
    }
}, {
    timestamps: true
})

export const Payment = mongoose.model("Payment", paymentSchema);