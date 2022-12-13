
import mongoose from "mongoose";
import BusinessSchema from "./BusinessSchema";

const BusinessModel = mongoose.model('BusinessModel', BusinessSchema);

export default BusinessModel;