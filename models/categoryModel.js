import mongoose from "mongoose";

const categorySchema = new mongoose.Schema({
  name: {
    type: String,
    // required: true,
    unique: true,
  },
  slug: {
    type: String,
    lowercase: true,
  },
  onHomepage: {
    type: Boolean,
  },
});

export default mongoose.model("Category", categorySchema);
