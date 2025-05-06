import React from "react";
import ScheduleInterviewForm from "../components/ScheduleInterviewForm"; 

const ScheduleInterview = () => {
  return (
    <div className="min-h-screen bg-gray-100 flex items-center justify-center p-4">
      <div className="bg-white p-8 rounded-lg shadow-lg w-full max-w-2xl">
        <h1 className="text-3xl font-bold text-center mb-6">Schedule an Interview</h1>
        <ScheduleInterviewForm /> {/* Use the form inside this page */}
      </div>
    </div>
  );
};

export default ScheduleInterview; // Exporting the page
