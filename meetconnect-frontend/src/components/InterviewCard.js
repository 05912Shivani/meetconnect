import React from "react";

const InterviewCard = ({ interview }) => {
  return (
    <div className="border rounded-lg shadow-md p-4 bg-white w-full max-w-sm">
      <h3 className="text-lg font-semibold">{interview.title}</h3>
      <p className="text-gray-600">{interview.date} | {interview.time}</p>
      <p className="text-gray-500">Interviewer: {interview.interviewer}</p>
      <p className={`mt-2 font-bold ${interview.status === 'Completed' ? 'text-green-600' : 'text-blue-600'}`}>
        {interview.status}
      </p>
      <div className="mt-3 flex gap-2">
        {interview.status === "Scheduled" && (
          <button className="px-3 py-1 bg-blue-500 text-white rounded-md">Join</button>
        )}
        {interview.status !== "Completed" && (
          <button className="px-3 py-1 bg-gray-400 text-white rounded-md">Reschedule</button>
        )}
      </div>
    </div>
  );
};

export default InterviewCard;
