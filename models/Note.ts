import mongoose from "mongoose";

const NoteSchema = new mongoose.Schema({
  title: String,
  content: String,

  // Link note to user
  userId: {
    type: String,
    required: true,
  },
});

export default mongoose.models.Note ||
  mongoose.model("Note", NoteSchema);