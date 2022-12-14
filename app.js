import express from 'express';
import cors from 'cors';
import session from 'express-session';
import mongoose from 'mongoose';
import BookmarkController from './controller/bookmarkController.js';
import UsersController from './controller/usersController.js';
import SessionController from './controller/sessionController.js';
import AuthController from './controller/authController.js';
import YelpAPIController from "./controller/yelpAPIController.js";
import FollowController from './controller/followController.js';
import ReviewsController from "./controller/reviewsController.js";
import YelpAPIController from "./controller/yelpAPIController.js";

const CONNECTION_STRING = 'mongodb://localhost:27017/yelp'
    || 'mongodb+srv://kimrine:kimrine123@cluster0.nsulus5.mongodb.net/?retryWrites=true&w=majority'
mongoose.connect('mongodb+srv://kimrine:kimrine123@cluster0.nsulus5.mongodb.net/?retryWrites=true&w=majority')

const app = express();
app.use(cors({
    credentials: true,
    //origin: true
    origin: 'http://localhost:3000'
}));

YelpAPIController(app);

const SECRET = 'process.env.SECRET';
let sess = {
    secret: SECRET,
    saveUninitialized: true,
    resave: true,
    cookie: {
        secure: false
    }
}

if (process.env.NODE_ENV === 'production') {
    app.set('trust proxy', 1) // trust first proxy
}

app.use(session(sess))
app.use(express.json({limit: '10mb'}));

UsersController(app);
FollowController(app);
BookmarkController(app);

app.get('/hello', (req, res) => {
    res.send('Life is good!')
})
app.get('/', (req, res) => {
    res.send('Welcome to Full Stack Development!')
})

SessionController(app);
AuthController(app);
ReviewsController(app)


app.listen(process.env.PORT || 4000);