import React from "react";
import ScheduleInterviewForm from "../components/ScheduleInterviewForm"; // ✅ Correct import

const ScheduleInterview = () => {
  return (
    <div>
      <h1>Schedule an Interview</h1>
      <ScheduleInterviewForm /> {/* ✅ Use the form inside this page */}
    </div>
  );
};

export default ScheduleInterview; // ✅ Exporting the page
