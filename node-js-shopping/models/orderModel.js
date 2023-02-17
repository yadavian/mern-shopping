import mongoose, { Schema } from "mongoose";

const orderSchema = new mongoose.Schema({
    userId: {
        type: String,
        required: true
    },
    products: [
        {
            productId: {
                type: mongoose.Schema.ObjectId,
                ref: 'Product',
                required: false,
                maxlength: [255, 'PRODUCT NOT EXIST.'],
                unique: false
            },
            quantity: {
                type: Number,
                required: [true, "PLEASE ADD QUANTITY."],
                default: 1
            },
            productTotalPrice: {
                type: Number,
                required: [true, "PLEASE ADD TOTAL PRODUCT PRICE."],
                default: 0
            }
        }
    ],
    // products: [
    //     {
    //         productId: {
    //             type: String
    //         },
    //         quantity: {
    //             type: Number,
    //             default: 1
    //         },
    //         // productImages: {
    //         //     type: Array,
    //         //     required: true,
    //         // },
    //     }
    // ],
    amount: {
        type: Number,
        required: true
    },
    address: {
        type: Object,
        required: true
    },
    status: {
        type: String,
        default: "pending"
    }
}, { timestamps: true })

export default mongoose.model("Order", orderSchema)