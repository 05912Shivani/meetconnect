const express = require("express");
const { getBlogs, addBlog } = require("../controllers/blogController");

const router = express.Router();

router.get("/", getBlogs);  // Fetch blogs with pagination
router.post("/", addBlog);  // Add new blog (Admin only)

module.exports = router;
