import React, { useState, useEffect, useCallback } from "react";
import { useSelector } from "react-redux";

const PracticeResource = () => {
  const user = useSelector((state) => state.auth.user);
  const [showLoginPopup, setShowLoginPopup] = useState(false);

  const [selectedType, setSelectedType] = useState("Behavioral");
  const [questions, setQuestions] = useState([]);
  const [blogs, setBlogs] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const questionsPerPage = 10;

  const fetchQuestions = useCallback(async () => {
    if (!user) {
      setShowLoginPopup(true);
      return;
    }

    setLoading(true);
    setError(null);
    try {
      const response = await fetch(
        `http://localhost:5000/api/practice/practice-questions?type=${selectedType}`,
        { credentials: "include" }
      );
      if (!response.ok) throw new Error(`HTTP error! Status: ${response.status}`);
      const data = await response.json();
      const filteredQuestions = data.questions.filter(q => q.category === selectedType);
      setQuestions(filteredQuestions);
    } catch (error) {
      console.error("Error fetching questions:", error);
      setError("Failed to load questions. Please try again.");
    }
    setLoading(false);
  }, [selectedType, user]);

  const fetchBlogs = useCallback(async () => {
    if (!user) {
      setShowLoginPopup(true);
      return;
    }

    try {
      const response = await fetch(`http://localhost:5000/api/blogs?category=${selectedType}`);
      const data = await response.json();
      setBlogs(data.blogs || []);
    } catch (error) {
      console.error("Error fetching blogs:", error);
    }
  }, [selectedType, user]);

  useEffect(() => {
    fetchQuestions();
    fetchBlogs();
  }, [fetchQuestions, fetchBlogs]);

  const indexOfLastQuestion = currentPage * questionsPerPage;
  const indexOfFirstQuestion = indexOfLastQuestion - questionsPerPage;
  const currentQuestions = questions.slice(indexOfFirstQuestion, indexOfLastQuestion);

  return (
    <div className="relative max-w-7xl mx-auto px-4 py-8">
      {!user && showLoginPopup && (
        <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50 z-50">
          <div className="bg-white p-6 rounded-lg shadow-lg text-center">
            <p className="text-lg text-red-600 font-semibold mb-4">Please log in to access this page.</p>
            <a href="/login" className="inline-block bg-blue-500 hover:bg-blue-600 text-white px-4 py-2 rounded">
              Go to Login
            </a>
          </div>
        </div>
      )}

      <h2 className="text-3xl font-bold text-center text-gray-800 mb-6">Practice Interview Questions</h2>

      <div className="mb-6 text-center">
        <label className="text-lg font-medium text-gray-700 mr-2">Select Interview Type:</label>
        <select
          value={selectedType}
          onChange={(e) => {
            setSelectedType(e.target.value);
            setCurrentPage(1);
          }}
          className="px-4 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring focus:border-blue-500"
        >
          <option value="Frontend">Frontend Development</option>
          <option value="Backend">Backend Development</option>
          <option value="Full Stack">Full Stack Development</option>
          <option value="Behavioral">Behavioral</option>
          <option value="DSA">DSA</option>
        </select>
      </div>

      <div className="flex flex-col lg:flex-row gap-6">
        <div className="lg:w-2/3 bg-white rounded-lg shadow-md p-6">
          <h3 className="text-xl font-semibold text-gray-800 mb-4">Interview Questions</h3>
          {loading ? (
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

          {questions.length > questionsPerPage && (
            <div className="mt-6 flex justify-center items-center gap-4">
              <button
                onClick={() => setCurrentPage((prev) => Math.max(prev - 1, 1))}
                disabled={currentPage === 1}
                className="px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600 disabled:opacity-50"
              >
                Previous
              </button>
              <span className="text-gray-600">
                Page {currentPage} of {Math.ceil(questions.length / questionsPerPage)}
              </span>
              <button
                onClick={() =>
                  setCurrentPage((prev) => Math.min(prev + 1, Math.ceil(questions.length / questionsPerPage)))
                }
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
          {blogs.length > 0 ? (
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
