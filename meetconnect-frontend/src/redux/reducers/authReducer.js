const initialState = {
    user: null,
    isAuthenticated: false,
    loading: false,
    error: null,
  };
  
  const authReducer = (state = initialState, action) => {
    switch (action.type) {
      case "LOGIN_REQUEST":
      case "REGISTER_REQUEST":
        return { ...state, loading: true, error: null };
  
      case "LOGIN_SUCCESS":
      case "REGISTER_SUCCESS":
        return { ...state, user: action.payload, isAuthenticated: true, loading: false };
  
      case "LOGIN_FAILURE":
      case "REGISTER_FAILURE":
        return { ...state, error: action.payload, loading: false };
  
      case "LOGOUT":
        return { ...state, user: null, isAuthenticated: false };
  
      default:
        return state;
    }
  };
  
  export default authReducer;
  
  