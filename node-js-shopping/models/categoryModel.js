import mongoose from "mongoose";

const categorySchema = new mongoose.Schema({
    categoryName: {
        type: String,
        unique: true,
        required: true
    },
    categoryImage: {
        type: String,
        required: true
    }
})

export default mongoose.model("Category", categorySchema)