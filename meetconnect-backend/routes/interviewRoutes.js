const express = require('express');
const { scheduleInterview, getInterviews,deleteInterview } = require('../controllers/interviewController');
const authMiddleware = require('../middleware/authMiddleware');

const router = express.Router();

// Schedule an interview (requires authentication)
// Change "/schedule" to "/"
router.post('/', authMiddleware, scheduleInterview);


// Get all interviews (requires authentication)
router.get('/', authMiddleware, getInterviews);

// DELETE interview by ID
router.delete("/:id", authMiddleware, deleteInterview);

module.exports = router;



