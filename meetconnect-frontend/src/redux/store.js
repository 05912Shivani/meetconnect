import { configureStore } from "@reduxjs/toolkit";
import authReducer from "./authSlice";
import { interviewReducer } from "./reducers/interviewReducer";


const store = configureStore({
  reducer: {
    auth: authReducer,
    interviewsState: interviewReducer, // ✅ Ensure this key matches `useSelector`
  },
});


export default store;



