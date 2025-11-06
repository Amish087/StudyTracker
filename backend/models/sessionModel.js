import mongoose from "mongoose";

const sessionSchema = new mongoose.Schema(
  {
    subject: { type: String, required: true, trim: true },
    hours: { type: Number, required: true, min: 0 },
    date: { type: String, required: true } // ISO yyyy-mm-dd from input[type=date]
  },
  { timestamps: true }
);

export default mongoose.model("Session", sessionSchema);
