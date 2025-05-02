const mongoose = require("mongoose");

const PracticeQuestionSchema = new mongoose.Schema({
    question: { type: String, required: true },
    answer: { type: String, required: true },
    category: { type: String, required: true, enum: ["Behavioral", "Full-stack", "Frontend", "Backend", "DSA"] },
    createdAt: { type: Date, default: Date.now }
});

const PracticeQuestion = mongoose.model("PracticeQuestion", PracticeQuestionSchema);

module.exports = PracticeQuestion;
