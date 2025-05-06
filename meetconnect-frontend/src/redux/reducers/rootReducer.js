import { combineReducers } from "redux";
import authReducer from "./authReducer";
import { interviewReducer } from "./interviewReducer";
import profileReducer from "./profileReducer";
import resourceReducer from "./resourceReducer";
import { feedbackReducer } from "./feedbackReducer";

const rootReducer = combineReducers({
  auth: authReducer, 
  interviewsState: interviewReducer, //interview reducer
  profile: profileReducer,//profile reducer
  resources: resourceReducer,//resourceReducer
  feedbackState: feedbackReducer // Added feedbackReducer

});

export default rootReducer;

