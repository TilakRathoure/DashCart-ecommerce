import mongoose from "mongoose";
const schema = new mongoose.Schema({
    name: {
        type: String,
        required: [true, "Enter Name"]
    },
    photo: {
        type: String,
        required: [true, "Enter photo"]
    },
    price: {
        type: Number,
        required: [true, "Enter price"]
    },
    stock: {
        type: Number,
        required: [true, "Enter stock"]
    },
    category: {
        type: String,
        required: [true, "Enter category"]
    },
}, {
    timestamps: true,
});
export const Product = mongoose.model("Product", schema);
