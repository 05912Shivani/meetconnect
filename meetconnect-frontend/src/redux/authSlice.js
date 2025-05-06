import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios"; // Ensure axios is imported

// Async thunk for login
export const loginUser = createAsyncThunk(
  "auth/loginUser",
  async (userData, { rejectWithValue }) => {
    try {
      console.log("API Call Started:", userData); 

      const response = await axios.post("https://meet-connect-backend.onrender.com/api/auth/login"
, userData, {
        withCredentials: true,
      });

      console.log("API Response:", response.data); 

      return response.data;
    } catch (error) {
      console.log("API Error:", error.response?.data); 
      return rejectWithValue(error.response?.data?.message || "Login failed");
    }
  }
);
export const logoutUser = createAsyncThunk(
  "auth/logoutUser",
  async (_, { rejectWithValue }) => {
    try {
      
      await axios.post("https://meet-connect-backend.onrender.com/api/auth/logout"
, {}, { withCredentials: true });

      
      
      return true; // Indicate successful logout
    } catch (error) {
      return rejectWithValue(error.response?.data?.message || "Logout failed");
    }
  }
);



const authSlice = createSlice({
  name: "auth",
  initialState: {
    user: null,
    loading: false,
    error: null,
  },
  reducers: {
    logout: (state) => {
      state.user = null;
      state.error = null;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(loginUser.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(loginUser.fulfilled, (state, action) => {
        state.loading = false;
        state.user = action.payload;
      })
      .addCase(loginUser.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })
      .addCase(logoutUser.fulfilled, (state) => {
        state.user = null; // Clear user on successful logout
        state.error = null;
      })
      .addCase(logoutUser.rejected, (state, action) => {
        state.error = action.payload;
      });
      
  },
});

export const { logout } = authSlice.actions;
export default authSlice.reducer;

