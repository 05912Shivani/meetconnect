const Blog = require("../models/Blog");

// Fetch blogs with pagination
const getBlogs = async (req, res) => {
    try {
        const { category, page = 1, limit = 5 } = req.query;
        let filter = {};

        if (category) {
            filter.category = { $regex: new RegExp(category, "i") }; // Case-insensitive search
        }

        const pageNumber = parseInt(page);
        const limitNumber = parseInt(limit);

        const blogs = await Blog.find(filter)
            .sort({ createdAt: -1 }) // Latest blogs first
            .skip((pageNumber - 1) * limitNumber)
            .limit(limitNumber);

        const total = await Blog.countDocuments(filter);

        res.status(200).json({
            success: true,
            total,
            page: pageNumber,
            limit: limitNumber,
            blogs
        });
    } catch (error) {
        res.status(500).json({ success: false, message: "Error fetching blogs", error });
    }
};


// Add a new blog post (Admin only)
const addBlog = async (req, res) => {
    try {
        const { title, content, category, author } = req.body;

        if (!title || !content || !category || !author) {
            return res.status(400).json({ success: false, message: "All fields are required" });
        }

        const newBlog = new Blog({ title, content, category, author });
        await newBlog.save();

        res.status(201).json({ success: true, message: "Blog added successfully", newBlog });
    } catch (error) {
        res.status(500).json({ success: false, message: "Error adding blog", error });
    }
};

module.exports = { getBlogs, addBlog };
