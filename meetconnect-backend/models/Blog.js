const mongoose = require("mongoose");

const BlogSchema = new mongoose.Schema({
    title: { type: String, required: true },
    content: { type: String, required: true },
    category: { type: String, required: true, enum: ["Behavioral", "Full-stack", "Frontend", "Backend", "DSA"] },
    author: { type: String, required: true },
    createdAt: { type: Date, default: Date.now }
});

const Blog = mongoose.model("Blog", BlogSchema);

module.exports = Blog;
