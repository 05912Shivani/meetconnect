const Feedback = require("../models/Feedback");

// Submit feedback
const submitFeedback = async (req, res) => {
  try {
    const { interviewId, feedbackText, rating } = req.body;

    if (!interviewId || !feedbackText || rating == null) {
      return res.status(400).json({ message: "Missing required fields" });
    }

    const feedback = new Feedback({
      interviewId,
      feedback: feedbackText,
      rating,
    });

    await feedback.save();

    return res.status(201).json({ message: "Feedback submitted successfully!", feedback });
  } catch (error) {
    console.error("🔥 Error in submitFeedback:", error);
    return res.status(500).json({ message: "Internal Server Error", error: error.message });
  }
};

// Fetch feedback for a single interview
const fetchFeedbackForInterview = async (req, res) => {
  try {
    const { interviewId } = req.params;
    const feedbacks = await Feedback.find({ interviewId });

    if (!feedbacks.length) {
      return res.status(404).json({ message: "No feedback found for this interview" });
    }

    return res.status(200).json({ feedbacks });
  } catch (error) {
    console.error("Error in fetchFeedbackForInterview:", error);
    return res.status(500).json({ message: "Internal Server Error", error: error.message });
  }
};

// Fetch feedback for multiple interviews
const getFeedbackByInterviews = async (req, res) => {
  try {
    const { interviewIds } = req.body; // Expecting an array of interview IDs

    if (!req.session.userId) {
      return res.status(401).json({ message: "Unauthorized. Please log in." });
    }

    const feedbacks = await Feedback.find({ interviewId: { $in: interviewIds } });

    const feedbackMap = {};
    feedbacks.forEach((fb) => {
      feedbackMap[fb.interviewId] = {
        feedback: fb.feedback,
        rating: fb.rating,
      };
    });

    res.status(200).json(feedbackMap);
  } catch (error) {
    console.error("Error in getFeedbackByInterviews:", error);
    res.status(500).json({ message: "Error fetching feedback", error });
  }
};

// Ensure all functions are exported correctly
module.exports = { submitFeedback, fetchFeedbackForInterview, getFeedbackByInterviews };

