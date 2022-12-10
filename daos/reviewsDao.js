import reviewsModel from '../models/reviewsModel.js';

export const findReviews = () => reviewsModel.find();
export const createReview = (review) => reviewsModel.create(review);
