import React, { useState, useEffect, useCallback } from "react";

const PracticeResource = () => {
  const [selectedType, setSelectedType] = useState("Behavioral");
  const [questions, setQuestions] = useState([]);
  const [blogs, setBlogs] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const questionsPerPage = 10;

  // Fetch Questions (Filtered by selectedType)
  const fetchQuestions = useCallback(async () => {
    setLoading(true);
    setError(null);
    try {
      console.log(`Fetching questions for: ${selectedType}`);
      const response = await fetch(`http://localhost:5000/api/practice/practice-questions?type=${selectedType}`);
      if (!response.ok) throw new Error(`HTTP error! Status: ${response.status}`);

      const data = await response.json();
      console.log("Fetched questions:", data);

      // Filter questions based on selected type
      const filteredQuestions = data.questions.filter(q => q.category === selectedType);
      setQuestions(filteredQuestions.map(q => q.question));
    } catch (error) {
      console.error("Error fetching questions:", error);
      setError("Failed to load questions. Please try again.");
    }
    setLoading(false);
  }, [selectedType]);

  // Fetch Blogs related to the selected category
  const fetchBlogs = useCallback(async () => {
    try {
      console.log(`Fetching blogs for: ${selectedType}`);
      const response = await fetch(`http://localhost:5000/api/blogs?category=${selectedType}`);
      const data = await response.json();
      console.log("Fetched blogs:", data);

      setBlogs(data.blogs || []);
    } catch (error) {
      console.error("Error fetching blogs:", error);
    }
  }, [selectedType]);

  // Fetch data when `selectedType` changes
  useEffect(() => {
    fetchQuestions();
    fetchBlogs();
  }, [fetchQuestions, fetchBlogs]);

  // Pagination Logic
  const indexOfLastQuestion = currentPage * questionsPerPage;
  const indexOfFirstQuestion = indexOfLastQuestion - questionsPerPage;
  const currentQuestions = questions.slice(indexOfFirstQuestion, indexOfLastQuestion);

  return (
    <div className="practice-resource">
      <h2>Practice Interview Questions</h2>

      {/* Interview Type Selector */}
      <label>Select Interview Type:</label>
      <select value={selectedType} onChange={(e) => {
        setSelectedType(e.target.value);
        setCurrentPage(1); // Reset to first page when changing type
      }}>
        <option value="Behavioral">Behavioral</option>
        <option value="Full-stack">Full-stack</option>
        <option value="Frontend">Frontend</option>
        <option value="Backend">Backend</option>
        <option value="DSA">DSA</option>
      </select>

      {/* Questions List */}
      <div className="questions-section">
        <h3>Interview Questions</h3>
        {loading ? (
          <p>Loading questions...</p>
        ) : error ? (
          <p style={{ color: "red" }}>{error}</p>
        ) : currentQuestions.length > 0 ? (
          <ul>
            {currentQuestions.map((q, index) => <li key={index}>{q}</li>)}
          </ul>
        ) : (
          <p style={{ color: "red", fontWeight: "bold" }}> No related questions available for "{selectedType}".</p>
        )}

        {/* Pagination Controls */}
        {questions.length > questionsPerPage && (
          <div className="pagination">
            <button 
              onClick={() => setCurrentPage((prev) => Math.max(prev - 1, 1))}
              disabled={currentPage === 1}
            >
              Previous
            </button>
            <span> Page {currentPage} of {Math.ceil(questions.length / questionsPerPage)} </span>
            <button 
              onClick={() => setCurrentPage((prev) => Math.min(prev + 1, Math.ceil(questions.length / questionsPerPage)))}
              disabled={currentPage === Math.ceil(questions.length / questionsPerPage)}
            >
              Next
            </button>
          </div>
        )}
      </div>

      {/* Blogs Section */}
      <div className="blogs-section">
        <h3>Related Blogs</h3>
        {blogs.length > 0 ? (
          <ul>
            {blogs.map((blog, index) => (
              <li key={index}>
                <a href={blog.url} target="_blank" rel="noopener noreferrer">
                  {blog.title}
                </a>
              </li>
            ))}
          </ul>
        ) : (
          <p style={{ color: "red", fontWeight: "bold" }}> No related blogs available for "{selectedType}".</p>
        )}
      </div>
    </div>
  );
};

export default PracticeResource;
