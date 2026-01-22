import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";
import { base_URL } from "../../../utils/BaseUrl";

// Employee Login
export const employeeLogin = createAsyncThunk(
  "login/employeeLogin",
  async (loginData, { rejectWithValue }) => {
    try {
      const response = await axios.post(
        `${base_URL}employee/login`,
        loginData,
        { withCredentials: true }
      );
      return response.data;
    } catch (error) {
      return rejectWithValue(
        error.response?.data || error.message
      );
    }
  }
);

// Get Logged-in Employee Details
export const employeeDetails = createAsyncThunk(
  "login/employeeDetails",
  async (_, { rejectWithValue }) => {
    try {
      const response = await axios.get(
        `${base_URL}employee/get`,
        { withCredentials: true }
      );
    
      return response.data;
    } catch (error) {
      return rejectWithValue(
        error.response?.data || error.message
      );
    }
  }
);

// Initial state
const initialState = {
  employee: null,
  employeeData:null,
    initialized: false,
  loading: false,
  error: null,
};

// Slice
const loginSlice = createSlice({
  name: "login",
  initialState,
  reducers: {
    logout: (state) => {
      state.employee = null;
      state.error = null;
    },
  },
  extraReducers: (builder) => {
    builder

      // LOGIN
      .addCase(employeeLogin.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(employeeLogin.fulfilled, (state, action) => {
        state.loading = false;
        state.employee = action.payload;
      })
      .addCase(employeeLogin.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })

      // GET EMPLOYEE DETAILS
      .addCase(employeeDetails.pending, (state) => {
        state.loading = true;
      })
      .addCase(employeeDetails.fulfilled, (state, action) => {
        state.loading = false;
         state.initialized=true,
        state.employeeData = action.payload.data;
      })
      .addCase(employeeDetails.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
         state.initialized = true;
      });
  },
});

export const { logout } = loginSlice.actions;
export default loginSlice.reducer;
