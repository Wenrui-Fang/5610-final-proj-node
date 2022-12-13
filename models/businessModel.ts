import mongoose from "mongoose";

export default interface Business {
    _id?: mongoose.Schema.Types.ObjectId;
    title: string;
    imdbID?: string;
    poster?: string;
    year?: number;
    rating?: number;
    likes?: number;
    dislikes?: number;
}