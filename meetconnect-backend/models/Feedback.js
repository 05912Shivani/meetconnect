const mongoose = require("mongoose");

const FeedbackSchema = new mongoose.Schema({
  interviewId: { type: mongoose.Schema.Types.ObjectId, ref: "Interview", required: true },
  feedback: { type: String, required: true },
  rating: { type: Number, required: true, min: 1, max: 5 },
});

module.exports = mongoose.model("Feedback", FeedbackSchema);
