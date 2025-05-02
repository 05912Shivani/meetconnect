const initialState = {
    feedbacks: {},
    loading: false,
    error: null,
  };
  
  export const feedbackReducer = (state = initialState, action) => {
    switch (action.type) {
      case "SUBMIT_FEEDBACK_SUCCESS":
        return { ...state, feedbacks: { ...state.feedbacks, [action.payload.newFeedback.interviewId]: action.payload.newFeedback } };
      case "FETCH_FEEDBACK_SUCCESS":
        return { ...state, feedbacks: action.payload };
      case "SUBMIT_FEEDBACK_FAIL":
      case "FETCH_FEEDBACK_FAIL":
        return { ...state, error: action.payload };
      default:
        return state;
    }
  };
  

