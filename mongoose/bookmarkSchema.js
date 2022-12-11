import mongoose, {Schema} from "mongoose";

const bookmarkSchema = new mongoose.Schema({
    businessId: String,
    bookmarkedBy: {type: Schema.Types.ObjectId, ref: "UserModel"},
}, {collection: 'bookmarks'});

export default followSchema;
