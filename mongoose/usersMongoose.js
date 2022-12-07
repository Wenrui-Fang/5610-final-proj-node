import mongoose from "mongoose";
const userSchema = new mongoose.Schema({
    username: {type: String, required: true},
    password: {type: String, required: true},
    firstName: String,
    lastName: String,
    email: {type: String, required: true},
    zipcode: String,
    accountType: {
        type:String,
        enum: ['PERSONAL','ADMIN','BUSSINESS']
    },
    dateOfBirth: Date,
    joined: Date,
    followings: Number,
    followers: Number,
    thingsILove: String,
}, {collection: 'users'});

export default userSchema;
