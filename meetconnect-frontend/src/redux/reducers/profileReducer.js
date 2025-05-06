const initialState = {
  name: "",
  email: "",
  contact: "",
  dob: "",
  loading: false,
  error: null,
};

const profileReducer = (state = initialState, action) => {
  switch (action.type) {
    case "FETCH_PROFILE_REQUEST":
      return { ...state, loading: true, error: null };

    case "FETCH_PROFILE_SUCCESS":
      return {
        ...state,
        ...action.payload,
        dob: action.payload.dob ? action.payload.dob.split("T")[0] : "", // YYYY-MM-DD format
        loading: false,
      };

    case "FETCH_PROFILE_FAILURE":
      return { ...state, error: action.payload, loading: false };

    case "UPDATE_PROFILE":
      return {
        ...state,
        ...action.payload,
        dob: action.payload.dob ? action.payload.dob.split("T")[0] : "", 
      };

    default:
      return state;
  }
};

export default profileReducer;
