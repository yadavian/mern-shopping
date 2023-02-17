import mongoose from "mongoose"

const productSchema = new mongoose.Schema({
    productName: {
        type: String,
        required: true,
        unique: true
    },
    productDescription: {
        type: String,
        required: true,
    },
    productImages: {
        type: Array,
        required: true,
    },
    categories: {
        type: Array,
        required : true
    },
    size: {
        type: String,
    },
    color: {
        type: String,
    },
    prize: {
        type: Number,
        required: true
    },
    ratings: {
        type: Number
    },
    discount: {
        type: Number
    },
    productStock: {
        type: Number
    }
}, { timestamps: true })

export default mongoose.model("Product", productSchema)