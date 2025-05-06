import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { scheduleInterview, fetchInterviews } from "../redux/actions/interviewActions";

const ScheduleInterviewForm = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate(); // Initialize navigation

  // Get authentication state from Redux
  const isAuthenticated = useSelector((state) => !!state.auth.user);

  const [interviewData, setInterviewData] = useState({
    type: "",
    date: "",
    time: "",
    interviewer: "",
    resources: [],
  });

  const [resourceTitle, setResourceTitle] = useState("");
  const [resourceLink, setResourceLink] = useState("");
  const [error, setError] = useState("");

  const handleChange = (e) => {
    setInterviewData({ ...interviewData, [e.target.name]: e.target.value });
  };

  const addResource = () => {
    if (resourceTitle.trim() && resourceLink.trim()) {
      setInterviewData({
        ...interviewData,
        resources: [...interviewData.resources, { title: resourceTitle, link: resourceLink }],
      });
      setResourceTitle("");
      setResourceLink("");
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!interviewData.type || !interviewData.date || !interviewData.time || !interviewData.interviewer) {
      setError("All fields are required!");
      return;
    }

    try {
      await dispatch(scheduleInterview(interviewData));
      dispatch(fetchInterviews()); // Immediately refetch interviews
      // Show alert on success
      alert("Interview scheduled successfully!");
      navigate("/my-interviews");
    } catch (error) {
      console.error("Error scheduling interview:", error);
      setError("Failed to schedule interview. Please try again.");
    }
  };

  return (
    <div className="max-w-lg mx-auto p-6 bg-white shadow-md rounded-md">
      <h2 className="text-xl font-bold mb-4 text-center">Schedule an Interview</h2>

      {error && <p className="text-red-500 text-center">{error}</p>}

      <form onSubmit={handleSubmit} className="space-y-4">
        <div>
          <label className="block font-medium">Interview Type:</label>
          <select
            name="type"
            onChange={handleChange}
            required
            className="border p-2 w-full rounded-md"
          >
            <option value="">Select Type</option>
            <option value="Behavioral">Behavioral</option>
            <option value="Full-stack">Full-stack</option>
            <option value="Frontend">Frontend</option>
            <option value="Backend">Backend</option>
            <option value="DSA">DSA</option>
          </select>
        </div>

        <div>
          <label className="block font-medium">Date:</label>
          <input
            type="date"
            name="date"
            onChange={handleChange}
            required
            className="border p-2 w-full rounded-md"
          />
        </div>

        <div>
          <label className="block font-medium">Time:</label>
          <input
            type="time"
            name="time"
            onChange={handleChange}
            required
            className="border p-2 w-full rounded-md"
          />
        </div>

        <div>
          <label className="block font-medium">Choose Interviewer:</label>
          <input
            type="text"
            name="interviewer"
            onChange={handleChange}
            required
            className="border p-2 w-full rounded-md"
          />
        </div>

        {/* Resources Input Fields */}
        <div className="mt-4">
          <h3 className="text-lg font-semibold mb-2">Add Resources (Optional):</h3>

          <div>
            <label className="block font-medium">Resource Title:</label>
            <input
              type="text"
              value={resourceTitle}
              onChange={(e) => setResourceTitle(e.target.value)}
              className="border p-2 w-full rounded-md"
            />
          </div>

          <div>
            <label className="block font-medium">Resource Link:</label>
            <input
              type="url"
              value={resourceLink}
              onChange={(e) => setResourceLink(e.target.value)}
              className="border p-2 w-full rounded-md"
            />
          </div>

          <button
            type="button"
            onClick={addResource}
            className="bg-blue-500 text-white px-4 py-2 mt-2 rounded-md hover:bg-blue-600"
          >
            Add Resource
          </button>
        </div>

        {/* Display Added Resources */}
        {interviewData.resources.length > 0 && (
          <ul className="mt-4 list-disc pl-5">
            {interviewData.resources.map((res, index) => (
              <li key={index} className="text-blue-500">
                {res.title} -{" "}
                <a
                  href={res.link}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="underline"
                >
                  {res.link}
                </a>
              </li>
            ))}
          </ul>
        )}

        <button
          type="submit"
          className={`px-4 py-2 rounded w-full ${isAuthenticated ? "bg-green-500 text-white" : "bg-gray-400"}`}
          onClick={(e) => {
            if (!isAuthenticated) {
              e.preventDefault(); // Prevent form submission
              alert("Please log in to schedule an interview.");
              navigate("/login"); //  Redirect to login
            }
          }}
        >
          Schedule Interview
        </button>
      </form>
    </div>
  );
};

export default ScheduleInterviewForm;
