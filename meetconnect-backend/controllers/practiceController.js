const PracticeQuestion = require("../models/PracticeQuestion");

// Fetch paginated practice questions (filtered by category if provided)
const getPracticeQuestions = async (req, res) => {
    try {
        let { category, page = 1, limit = 10 } = req.query;
        page = parseInt(page);
        limit = parseInt(limit);

        const filter = category ? { category } : {}; 

        //  Always apply pagination
        const questions = await PracticeQuestion.find(filter)
            .skip((page - 1) * limit)
            .limit(limit);

        const total = await PracticeQuestion.countDocuments(filter);

        res.status(200).json({
            success: true,
            total,
            page,
            totalPages: Math.ceil(total / limit),
            limit,
            questions
        });
    } catch (error) {
        res.status(500).json({ 
            success: false, 
            message: "Error fetching practice questions", 
            error: error.message 
        });
    }
};


// Fetch all questions (optionally filtered by category)
const getAllQuestions = async (req, res) => {
    try {
        const { category } = req.query;
        let questions;

        if (category) {
            questions = await PracticeQuestion.find({ category });
        } else {
            questions = await PracticeQuestion.find();
        }

        res.status(200).json({ success: true, questions });
    } catch (error) {
        res.status(500).json({ success: false, message: "Error fetching all questions", error: error.message });
    }
};

// Add a new practice question (Admin Use)
const addPracticeQuestion = async (req, res) => {
    try {
        const { question, answer, category } = req.body;

        if (!question || !answer || !category) {
            return res.status(400).json({ success: false, message: "All fields are required" });
        }

        const newQuestion = new PracticeQuestion({ question, answer, category });
        await newQuestion.save();

        res.status(201).json({ 
            success: true, 
            message: "Practice question added successfully", 
            question: newQuestion 
        });
    } catch (error) {
        res.status(500).json({ 
            success: false, 
            message: "Error adding practice question", 
            error: error.message 
        });
    }
};

module.exports = { getPracticeQuestions, addPracticeQuestion, getAllQuestions };
