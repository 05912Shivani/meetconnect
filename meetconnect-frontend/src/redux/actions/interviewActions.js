export const fetchInterviews = () => async (dispatch) => {
  dispatch({ type: "FETCH_INTERVIEWS_REQUEST" });

  try {
    const response = await fetch("https://meet-connect-backend.onrender.com/api/interviews"
, {
      method: "GET",
      credentials: "include", // Ensures session authentication
    });

    const data = await response.json();
    console.log("Fetched Interviews:", data); 

    dispatch({ type: "FETCH_INTERVIEWS_SUCCESS", payload: data });
  } catch (error) {
    dispatch({ type: "FETCH_INTERVIEWS_FAILURE", payload: error.message });
  }
};

export const scheduleInterview = (interviewData) => async (dispatch) => {
  try {
    console.log("🚀 Sending Interview Data:", interviewData); 
    const response = await fetch("https://meet-connect-backend.onrender.com/api/interviews", {
  method: "POST",
  headers: {
    "Content-Type": "application/json",
  },
  credentials: "include", // Ensures cookies are sent
  body: JSON.stringify(interviewData),
});

    if (!response.ok) {
      throw new Error(`Error: ${response.status} - ${response.statusText}`);
    }

    const data = await response.json();
    console.log("Response from API:", data); 
    dispatch({ type: "SCHEDULE_INTERVIEW_SUCCESS", payload: data });

    // Fetch updated interview list after successful scheduling
    dispatch(fetchInterviews()); 
  } catch (error) {
    console.error("Error scheduling interview:", error);
    dispatch({ type: "SCHEDULE_INTERVIEW_FAILURE", payload: error.message });
  }
};


