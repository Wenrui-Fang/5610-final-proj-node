import mongoose from 'mongoose';

const reviewsSchema = new mongoose.Schema({
    restaurant: String,
    text: String,
    star: Number,
}, {collection: 'reviews'});

export default reviewsSchema;



