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
        enum: ['CUSTOMER','ADMIN','RESTURANT']
    },
    dateOfBirth: Date
}, {collection: 'users'});

export default userSchema;
