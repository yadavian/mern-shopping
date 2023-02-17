import mongoose from 'mongoose'


const cartSchema = new mongoose.Schema({
    userId: {
        type: String,
        required: true,
        unique : true
    },
    products: [
        {
            productId: {
                type: String
            },
            quantity: {
                type: Number,
                default: 1
            },
        }
    ],
}, { timestamps: true })


export default mongoose.model("Cart", cartSchema)