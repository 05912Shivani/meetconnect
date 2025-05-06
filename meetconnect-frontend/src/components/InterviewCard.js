import React from "react";

// InterviewCard component: Displays a single interview's details
const InterviewCard = ({ interview }) => {
  const status = interview.status?.toLowerCase(); // normalize status string

  return (
    <div className="border rounded-lg shadow-lg p-6 bg-white w-full max-w-sm mx-auto">
      <h3 className="text-xl font-semibold text-gray-800">{interview.title}</h3>
      <p className="text-gray-600 text-sm">
        {interview.date} | {interview.time}
      </p>
      <p className="text-gray-500 text-sm">Interviewer: {interview.interviewer}</p>

      {/* Status display with dynamic color */}
      <p
        className={`mt-2 font-bold ${
          status === "completed" ? "text-green-600" : "text-blue-600"
        }`}
      >
        {interview.status}
      </p>

      <div className="mt-4 flex gap-3">
        {/* Show "Join" if interview is scheduled */}
        {status === "scheduled" && (
          <button className="px-4 py-2 bg-blue-500 text-white rounded-md hover:bg-blue-600 transition duration-200">
            Join
          </button>
        )}

        {/* Show "Reschedule" for all except completed */}
        {status !== "completed" && (
          <button className="px-4 py-2 bg-gray-400 text-white rounded-md hover:bg-gray-500 transition duration-200">
            Reschedule
          </button>
        )}
      </div>
    </div>
  );
};

export default InterviewCard;
