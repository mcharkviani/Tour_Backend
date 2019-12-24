import {Schema} from "mongoose";
import * as mongoose from "mongoose";

const TourSchema = new Schema({
    company: {
        type: String
    },
    email: {
        type: String
    },
    phone: {
        type: String
    },
    image: {
        type: String
    },
    address: {
        type: String
    },
    country: {
        type: String
    },
    description: {
        type: String
    },
    price: {
        type: Number
    },
    rating: {
        type: Number
    },
    created_date: {
        type: Date,
        default: Date.now
    }
});

export default mongoose.model('Tour', TourSchema);
