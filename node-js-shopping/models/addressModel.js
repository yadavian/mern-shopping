import mongoose from 'mongoose'


const addressSchema = new mongoose.Schema({
    roomNo: {
        type: String,
    },
    buildingName: {
        type: String,
        required: true,
    },
    town: {
        type: String,
        required: true,
    },
    city: {
        type: String,
        required: true,
    },
    pincode: {
        type: Number,
        required: true,
    },
    state: {
        type: String,
        required: true,
    },
    country: {
        type: String,
        required: true,
    },
    userId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User',
        required: true,
    },

}, { timestamps: true })


export default mongoose.model("Address", addressSchema)