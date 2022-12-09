import mongoose from "mongoose";
import reviewsSchema from "../mongoose/reviewsMongoose.js";

const reviewsModel = mongoose.model('ReviewModel', reviewsSchema);
export default reviewsModel;