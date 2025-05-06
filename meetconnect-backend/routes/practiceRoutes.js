const express = require("express");
const { getPracticeQuestions, addPracticeQuestion, getAllQuestions } = require("../controllers/practiceController");

const router = express.Router();

// Route to fetch practice questions with pagination
router.get("/practice-questions", getPracticeQuestions);

// Route to fetch all questions (optional without pagination)
router.get("/all-questions", getAllQuestions);

// Route to add a new practice question (Admin Use)
router.route("/practice-questions")
.get(getPracticeQuestions)  // Fetch questions (pagination + category filter)
.post(addPracticeQuestion); // Add new question (admin)
module.exports = router;
