import * as reviewsDao from '../daos/reviewsDao.js'

const createReview = async (req, res) => {
    const newReview = req.body;
    newReview.reviewTime = new Date().toLocaleString();
    const insertedReview = await reviewsDao.createReview(newReview);
    res.json(insertedReview);
}

const findReviews = async (req, res) => {
    try {
        const reviews = await reviewsDao.findReviews();
        res.json(reviews);
    } catch (err) {
        res.send(503)
    }
}

export default (app) => {
    app.post('/api/reviews', createReview);
    app.get('/api/reviews', findReviews);
}