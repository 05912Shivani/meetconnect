const initialState = {
    questions: [],
    blogs: [],
    loading: false,
    error: null,
  };
  
  const resourceReducer = (state = initialState, action) => {
    switch (action.type) {
      case "FETCH_RESOURCES_REQUEST":
        return { ...state, loading: true, error: null };
  
      case "FETCH_RESOURCES_SUCCESS":
        return { ...state, questions: action.payload.questions, blogs: action.payload.blogs, loading: false };
  
      case "FETCH_RESOURCES_FAILURE":
        return { ...state, error: action.payload, loading: false };
  
      default:
        return state;
    }
  };
  
  export default resourceReducer;
  