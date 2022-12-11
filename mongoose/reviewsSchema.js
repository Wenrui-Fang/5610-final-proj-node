import mongoose from 'mongoose';

const reviewsSchema = new mongoose.Schema({
    businessId: String,
    text: String,
    star: Number,
    reviewByUserId: String,
    reviewTime: Date
}, {collection: 'reviews'});

export default reviewsSchema;



