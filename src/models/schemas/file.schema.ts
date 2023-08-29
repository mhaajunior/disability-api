import mongoose, { Schema } from "mongoose";

const fileSchema = new Schema({
  name: { type: String, required: true },
  rows: { type: Number, required: true },
  status: { type: String, required: true },
  user_id: { type: Schema.Types.ObjectId, ref: "User", required: true },
  import_date: {
    type: Date,
    default: new Date(),
  },
});

export default mongoose.model("File", fileSchema);
