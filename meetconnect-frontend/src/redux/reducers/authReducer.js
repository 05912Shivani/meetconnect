const initialState = {
    user: null,// Holds the logged-in user data
    isAuthenticated: false,
    loading: false,// Indicates if a request is in progress
    error: null,
  };
  
  const authReducer = (state = initialState, action) => {
    switch (action.type) {
      case "LOGIN_REQUEST":
      case "REGISTER_REQUEST":
        return { ...state, loading: true, error: null };// Set loading true and reset error on login/register request
  
      case "LOGIN_SUCCESS":
      case "REGISTER_SUCCESS":
        return { ...state, user: action.payload, isAuthenticated: true, loading: false };
  
      case "LOGIN_FAILURE":
      case "REGISTER_FAILURE":
        return { ...state, error: action.payload, loading: false };
  
      case "LOGOUT":
        return { ...state, user: null, isAuthenticated: false };
  
      default:
        return state;// Return current state for unknown actions
    }
  };
  
  export default authReducer;
  
  