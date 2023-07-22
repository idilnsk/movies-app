import mongoose from "mongoose";

const { Schema } = mongoose;

const questionSchema = new Schema({
  question: { type: String, required: true },
  options: [
    {
      id: { type: Number, required: true },
      text: { type: String, required: true },
      isCorrect: { type: Boolean, required: true },
    },
  ],
});

const Question = mongoose.models.Question || mongoose.model("Question", questionSchema);
export default Question;
