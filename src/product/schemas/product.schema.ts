import { Schema } from "mongoose";

export const ProductSchema = new Schema({

    name: {type: String, required: true},
    description: {type: String, required: true},
    price: Number,
    createdAt: {
        type: Date,
        default: Date.now
    }
});
