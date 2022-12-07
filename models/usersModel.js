import mongoose from "mongoose";
import userSchema from "../mongoose/usersMongoose.js";
const usersModel = mongoose.model('UserModel',userSchema);
export default usersModel;