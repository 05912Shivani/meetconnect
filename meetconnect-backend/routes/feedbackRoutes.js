const express = require("express");
const { submitFeedback, fetchFeedbackForInterview, getFeedbackByInterviews } = require("../controllers/feedbackController");

const router = express.Router();

// Route to submit feedback
router.post("/create", submitFeedback);

// Route to fetch feedback for a specific interview
router.get("/fetch/:interviewId", fetchFeedbackForInterview);

// Route to fetch feedback for multiple interviews
router.post("/fetch/multiple", getFeedbackByInterviews);

module.exports = router;

