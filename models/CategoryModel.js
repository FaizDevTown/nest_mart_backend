import mongoose from "mongoose";

const categorySchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
    unique: true,
  },
  slug: {
    type: String,
    lowercase: true,
  },
  Image:{
    type: String,
    required: true
  },
  isDeleted:{
    type:Boolean,
    default:false
  }
});

export default mongoose.model("Category", categorySchema);
