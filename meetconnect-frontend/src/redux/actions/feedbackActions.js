export const fetchFeedback = (interviewId) => async (dispatch) => {
    dispatch({ type: "FETCH_FEEDBACK_REQUEST" });
  
    try {
      const response = await fetch(`https://meet-connect-backend.onrender.com/api/feedback/fetch/${interviewId}`
, {
        method: "GET",
        credentials: "include", // Ensures session authentication
      });
  
      if (!response.ok) {
        throw new Error(`Error: ${response.status} - ${response.statusText}`);
      }
  
      const data = await response.json();
      console.log("📌 Fetched Feedback:", data); 
  
      dispatch({ type: "FETCH_FEEDBACK_SUCCESS", payload: { interviewId, feedback: data } });
    } catch (error) {
      console.error("Error fetching feedback:", error);
      dispatch({ type: "FETCH_FEEDBACK_FAILURE", payload: error.message });
    }
  };
  
  export const submitFeedback = (feedbackData) => async (dispatch) => {
    try {
      console.log("🚀 Submitting Feedback:", feedbackData); 
  
      // Ensure rating is defined (default 0 or another sensible value)
      if (feedbackData.rating === undefined) {
        feedbackData.rating = 0;  // Set a default rating if missing
      }
  
      const response = await fetch("https://meet-connect-backend.onrender.com/api/feedback/create"
, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        credentials: "include",
        body: JSON.stringify(feedbackData),
      });
  
      if (!response.ok) {
        throw new Error(`Error: ${response.status} - ${response.statusText}`);
      }
  
      const data = await response.json();
      console.log("Feedback Submitted Successfully:", data);
  
      dispatch({ type: "SUBMIT_FEEDBACK_SUCCESS", payload: data });
    } catch (error) {
      console.error("Error submitting feedback:", error);
      dispatch({ type: "SUBMIT_FEEDBACK_FAILURE", payload: error.message });
    }
  };
  
