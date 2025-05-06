import React, { useState, useEffect, useCallback } from "react";
import { useSelector } from "react-redux";

const PracticeResource = () => {
  // Get the logged-in user from Redux store
  const user = useSelector((state) => state.auth.user);

  // State variables for UI and data
  const [selectedType, setSelectedType] = useState("Behavioral");
  const [questions, setQuestions] = useState([]);
  const [blogs, setBlogs] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const questionsPerPage = 10;

  // Fetch questions if user is logged in
  const fetchQuestions = useCallback(async () => {
    if (!user) return;// Exit if user not logged in
    setLoading(true);
    setError(null);
    try {
     const response = await fetch(
  `https://meet-connect-backend.onrender.com/api/practice/practice-questions?type=${selectedType}`,
  { credentials: "include" }
);
      if (!response.ok) throw new Error(`HTTP error! Status: ${response.status}`);
      const data = await response.json();
       // Filter by category
      const filteredQuestions = data.questions.filter(q => q.category === selectedType);
      setQuestions(filteredQuestions);
    } catch (error) {
      console.error("Error fetching questions:", error);
      setError("Failed to load questions. Please try again.");
    }
    setLoading(false);
  }, [selectedType, user]);

    // Fetch blogs if user is logged in
  const fetchBlogs = useCallback(async () => {
    if (!user) return;
    try {
      const response = await fetch(`https://meet-connect-backend.onrender.com/api/blogs?category=${selectedType}`);
      const data = await response.json();
      setBlogs(data.blogs || []);
    } catch (error) {
      console.error("Error fetching blogs:", error);
    }
  }, [selectedType, user]);

  useEffect(() => {
    if (user) {
      fetchQuestions();
      fetchBlogs();
    }
  }, [fetchQuestions, fetchBlogs, user]);

   // Pagination logic
  const indexOfLastQuestion = currentPage * questionsPerPage;
  const indexOfFirstQuestion = indexOfLastQuestion - questionsPerPage;
  const currentQuestions = questions.slice(indexOfFirstQuestion, indexOfLastQuestion);

  // Handle dropdown change
  const handleTypeChange = (e) => {
    if (!user) {
      alert("Please login first");
      return;
    }
    setSelectedType(e.target.value);
    setCurrentPage(1);
  };

   // Handle pagination buttons
  const handlePageChange = (direction) => {
    if (!user) {
      alert("Please login first");
      return;
    }
    setCurrentPage((prev) =>
      direction === "next"
        ? Math.min(prev + 1, Math.ceil(questions.length / questionsPerPage))
        : Math.max(prev - 1, 1)
    );
  };

  return (
    <div className="relative max-w-7xl mx-auto px-4 py-8">
      <h2 className="text-3xl font-bold text-center text-gray-800 mb-6">Practice Interview Questions</h2>

      <div className="mb-6 text-center">
        <label className="text-lg font-medium text-gray-700 mr-2">Select Interview Type:</label>
        <select
          value={selectedType}
          onChange={handleTypeChange}
          disabled={!user}
          className="px-4 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring focus:border-blue-500 disabled:opacity-50"
        >
          <option value="Frontend">Frontend Development</option>
          <option value="Backend">Backend Development</option>
          <option value="Full Stack">Full Stack Development</option>
          <option value="Behavioral">Behavioral</option>
          <option value="DSA">DSA</option>
        </select>
        {!user && (
          <p className="text-sm text-red-600 mt-2">You must be logged in to interact with this page.</p>
        )}
      </div>

      <div className="flex flex-col lg:flex-row gap-6">
        <div className="lg:w-2/3 bg-white rounded-lg shadow-md p-6">
          <h3 className="text-xl font-semibold text-gray-800 mb-4">Interview Questions</h3>
          {!user ? (
            <p className="text-red-600 font-semibold">Login to view questions.</p>
          ) : loading ? (
            <p className="text-blue-500">Loading questions...</p>
          ) : error ? (
            <p className="text-red-600 font-medium">{error}</p>
          ) : currentQuestions.length > 0 ? (
            <ul className="list-disc pl-6 space-y-2 text-gray-700">
              {currentQuestions.map((q, index) => (
                <li key={index}>
                  <strong>Q{indexOfFirstQuestion + index + 1}:</strong> {q.question}
                </li>
              ))}
            </ul>
          ) : (
            <p className="text-red-600 font-semibold">
              No questions available for "{selectedType}".
            </p>
          )}

          {user && questions.length > questionsPerPage && (
            <div className="mt-6 flex justify-center items-center gap-4">
              <button
                onClick={() => handlePageChange("prev")}
                disabled={currentPage === 1}
                className="px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600 disabled:opacity-50"
              >
                Previous
              </button>
              <span className="text-gray-600">
                Page {currentPage} of {Math.ceil(questions.length / questionsPerPage)}
              </span>
              <button
                onClick={() => handlePageChange("next")}
                disabled={currentPage === Math.ceil(questions.length / questionsPerPage)}
                className="px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600 disabled:opacity-50"
              >
                Next
              </button>
            </div>
          )}
        </div>

        <div className="lg:w-1/3 bg-white rounded-lg shadow-md p-6">
          <h3 className="text-xl font-semibold text-gray-800 mb-4">Related Blogs</h3>
          {!user ? (
            <p className="text-red-600 font-semibold">Login to view blogs.</p>
          ) : blogs.length > 0 ? (
            <ul className="list-disc pl-4 space-y-2 text-gray-700">
              {blogs.map((blog, index) => (
                <li key={index}>
                  <a
                    href={blog.url}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-blue-600 hover:underline"
                  >
                    {blog.title}
                  </a>
                </li>
              ))}
            </ul>
          ) : (
            <p className="text-red-600 font-semibold">
              No blogs available for "{selectedType}".
            </p>
          )}
        </div>
      </div>
    </div>
  );
};

export default PracticeResource;
