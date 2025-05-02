const initialState = {
  interviews: [],  // Ensure it's always an array
  loading: false,
  error: null,
};

export const interviewReducer = (state = initialState, action) => {
  switch (action.type) {
    case "FETCH_INTERVIEWS_REQUEST":
      return { ...state, loading: true };
    case "FETCH_INTERVIEWS_SUCCESS":
      return { ...state, loading: false, interviews: action.payload };
    case "FETCH_INTERVIEWS_FAILURE":
      return { ...state, loading: false, error: action.payload };
    default:
      return state;
  }
};

// export default interviewReducer;
