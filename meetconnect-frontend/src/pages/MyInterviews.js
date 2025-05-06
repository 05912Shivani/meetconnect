import React, { useEffect, useState, useMemo } from "react";
import { useDispatch, useSelector } from "react-redux";
import { fetchInterviews } from "../redux/actions/interviewActions";
import { submitFeedback } from "../redux/actions/feedbackActions";

const MyInterviews = () => {
  const dispatch = useDispatch();
  const interviewState = useSelector((state) => state.interviewsState);

  const interviews = useMemo(() => (
    Array.isArray(interviewState?.interviews) ? interviewState.interviews : []
  ), [interviewState]);

  const loading = interviewState?.loading || false;
  const error = interviewState?.error || null;

  const [filter, setFilter] = useState("upcoming");
  const [sortType, setSortType] = useState("");
  const [feedbackInputs, setFeedbackInputs] = useState({});
  const [selectedRating, setSelectedRating] = useState({});
  const [localFeedback, setLocalFeedback] = useState({});

  useEffect(() => {
    dispatch(fetchInterviews(filter));
  }, [dispatch, filter]);

  const formatDate = (dateStr) =>
    new Date(dateStr).toLocaleDateString("en-US", { year: "numeric", month: "long", day: "numeric" });

  const formatTime = (timeStr) => {
    if (!timeStr) return "N/A";
    const [hours, minutes] = timeStr.split(":").map(Number);
    const ampm = hours >= 12 ? "PM" : "AM";
    const formattedHours = hours % 12 || 12;
    return `${formattedHours}:${String(minutes).padStart(2, "0")} ${ampm}`;
  };

  const filteredInterviews = useMemo(() => (
    interviews.filter((interview) => {
      const interviewDate = new Date(interview.date);
      const today = new Date();
      today.setHours(0, 0, 0, 0);
      return filter === "completed" ? interviewDate < today : interviewDate >= today;
    })
  ), [interviews, filter]);

  const finalInterviews = useMemo(() => {
    let sortedData = [...filteredInterviews];
    if (sortType) {
      sortedData = sortedData.filter((interview) =>
        interview.type.toLowerCase() === sortType.toLowerCase()
      );
    }
    return sortedData;
  }, [filteredInterviews, sortType]);

  const handleFeedbackChange = (interviewId, value) => {
    setFeedbackInputs((prev) => ({ ...prev, [interviewId]: value }));
  };

  const handleRatingChange = (interviewId, value) => {
    setSelectedRating((prev) => ({ ...prev, [interviewId]: Number(value) }));
  };

  const handleSubmitFeedback = async (interviewId) => {
    if (!interviewId) {
      console.error("❌ No interview selected!");
      return;
    }

    const feedbackText = feedbackInputs[interviewId] || "";
    const rating = selectedRating[interviewId] ?? 0;

    const feedbackData = { interviewId, feedbackText, rating };

    console.log("🚀 Sending Feedback Data:", feedbackData);
    await dispatch(submitFeedback(feedbackData));

    // Optimistically update UI before fetching new data
    setLocalFeedback((prev) => ({
      ...prev,
      [interviewId]: { feedback: feedbackText, rating },
    }));

    // Clear Input Fields after successful submission
    setFeedbackInputs((prev) => ({ ...prev, [interviewId]: "" }));
    setSelectedRating((prev) => ({ ...prev, [interviewId]: "" }));

    // Show success alert
    alert("Feedback submitted successfully!");

    // Fetch updated interviews from backend
    setTimeout(() => {
      dispatch(fetchInterviews("completed"));
    }, 500);
  };

  return (
    <div className="my-interviews p-6 bg-gray-50 min-h-screen">
      <h2 className="text-2xl font-bold mb-4">My Interviews</h2>

      <div className="flex gap-4 my-4">
        <select
          className="border p-2 rounded-md w-1/3"
          onChange={(e) => setFilter(e.target.value)}
          value={filter}
        >
          <option value="upcoming">Upcoming Interviews</option>
          <option value="completed">Completed Interviews</option>
        </select>

        <select
          className="border p-2 rounded-md w-1/3"
          onChange={(e) => setSortType(e.target.value)}
          value={sortType}
        >
          <option value="">Sort by Interview Type</option>
          <option value="Behavioral">Behavioral Interview</option>
          <option value="DSA">DSA Interview</option>
          <option value="Frontend">Frontend Interview</option>
          <option value="Backend">Backend Interview</option>
          <option value="Full-stack">Full-stack Interview</option>
        </select>
      </div>

      {loading && <p className="text-center text-gray-500">Loading interviews...</p>}
      {error && <p className="text-center text-red-500">{error}</p>}

      <div className="interview-cards grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {finalInterviews.length > 0 ? (
          finalInterviews.map((interview) => {
            const localData = localFeedback[interview._id] || {};
            const feedbackText = localData.feedback || interview.feedback || "No feedback yet";
            const rating = localData.rating || interview.rating || "Pending";

            return (
              <div key={interview._id || interview._id} className="border p-4 rounded-lg shadow-md bg-white">
                <h3 className="text-lg font-semibold">{interview.type} Interview</h3>
                <p className="text-gray-600">{formatDate(interview.date)} | {formatTime(interview.time)}</p>
                <p className="text-gray-500">Interviewer: {interview.interviewer}</p>

                {filter === "upcoming" && interview.resources?.length > 0 && (
                  <div className="mt-3">
                    <h4 className="font-semibold">Resources:</h4>
                    <ul className="list-disc ml-6">
                      {interview.resources.map((res, index) => (
                        <li key={index}>
                          <a href={res.link} target="_blank" rel="noopener noreferrer" className="text-blue-500 hover:underline">
                            {res.title}
                          </a>
                        </li>
                      ))}
                    </ul>
                  </div>
                )}

                {filter === "completed" && (
                  <div className="mt-3">
                    <p><strong>Feedback:</strong> {feedbackText}</p>
                    <p><strong>Rating:</strong> {rating}</p>

                    {!interview.feedback && !localData.feedback && (
                      <div className="mt-4">
                        <textarea
                          className="border p-2 w-full rounded-md"
                          rows="3"
                          placeholder="Write your feedback here..."
                          value={feedbackInputs[interview._id] || ""}
                          onChange={(e) => handleFeedbackChange(interview._id, e.target.value)}
                        />

                        <input
                          type="number"
                          min="1"
                          max="5"
                          className="border p-2 w-full mt-2 rounded-md"
                          placeholder="Rating (1-5)"
                          value={selectedRating[interview._id] || ""}
                          onChange={(e) => handleRatingChange(interview._id, e.target.value)}
                        />

                        <button
                          className="bg-blue-500 text-white p-2 rounded-md mt-3 hover:bg-blue-600"
                          onClick={() => handleSubmitFeedback(interview._id)}
                        >
                          Submit Feedback
                        </button>
                      </div>
                    )}
                  </div>
                )}
              </div>
            );
          })
        ) : (
          <p className="text-center text-gray-500">No interviews found.</p>
        )}
      </div>
    </div>
  );
};

export default MyInterviews;
