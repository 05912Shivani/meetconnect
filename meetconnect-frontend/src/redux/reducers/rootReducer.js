import { combineReducers } from "redux";
import authReducer from "./authReducer";
import { interviewReducer } from "./interviewReducer";
import profileReducer from "./profileReducer";
import resourceReducer from "./resourceReducer";
import { feedbackReducer } from "./feedbackReducer";

const rootReducer = combineReducers({
  auth: authReducer, 
  interviewsState: interviewReducer, // ✅ Ensure correct key name
  profile: profileReducer,
  resources: resourceReducer,
  feedbackState: feedbackReducer // ✅ Added feedbackReducer

});

export default rootReducer;

