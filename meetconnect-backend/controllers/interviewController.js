const Interview = require('../models/Interview');

// Schedule a new interview (Requires Authentication)
const scheduleInterview = async (req, res) => {
  const { type, date, time, interviewer, resources = [] } = req.body; 

  try {
    if (!req.session.userId) {
      return res.status(401).json({ message: 'Unauthorized. Please log in.' });
    }

    const interview = new Interview({
      userId: req.session.userId,
      type,
      date,
      time, 
      interviewer,
      resources: Array.isArray(resources) ? resources : [], // Ensure it's always an array
    });

    await interview.save();
    res.status(201).json({ message: 'Interview scheduled successfully', interview });
  } catch (error) {
    res.status(500).json({ message: 'Error scheduling interview', error: error.message });
  }
};

// Get all interviews for the logged-in user
const getInterviews = async (req, res) => {
  try {
    const { status } = req.query;
    let filter = { userId: req.session.userId };

    const today = new Date().toISOString().split("T")[0]; // Get current date in YYYY-MM-DD

    if (status === "upcoming") {
      filter.date = { $gte: today }; // Upcoming interviews (future dates)
    } else if (status === "completed") {
      filter.date = { $lt: today }; // Completed interviews (past dates)
    }

    const interviews = await Interview.find(filter);
    res.json(interviews);
  } catch (error) {
    console.error("Error fetching interviews:", error);
    res.status(500).json({ message: "Server error" });
  }
};

// Delete an interview by ID
const deleteInterview = async (req, res) => {
  try {
    const interviewId = req.params.id;

    const deletedInterview = await Interview.findByIdAndDelete(interviewId);
    if (!deletedInterview) {
      return res.status(404).json({ message: "Interview not found" });
    }

    res.json({ message: "Interview deleted successfully", deletedInterview });
  } catch (error) {
    res.status(500).json({ message: "Error deleting interview", error });
  }
};


module.exports = { scheduleInterview, getInterviews,deleteInterview };
