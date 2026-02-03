import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";
import { base_URL } from "../../utils/BaseUrl";

// ==================== THUNKS ====================
// Fetch Dashboard User Data
export const fetchDashboardUserData = createAsyncThunk(
  "user/fetchDashboardData",
  async (_, { rejectWithValue }) => {
    try {
      const response = await axios.get(`${base_URL}employee/dashboardData`,{
        withCredentials:true
      }); 
      return response.data;
    } catch (error) {
      return rejectWithValue(error.response?.data || "Something went wrong");
    }
  }
);

// Fetch Dashboard Lead Data
export const fetchDashboardLeadData = createAsyncThunk(
  "leads/fetchDashboardLeadData",
  async (_, { rejectWithValue }) => {
    try {
      const response = await axios.get(`${base_URL}lead/dashboardData`,{
        withCredentials:true
      });
      return response.data;
    } catch (error) {
      return rejectWithValue(error.response?.data || "Something went wrong");
    }
  }
);

// ==================== INITIAL STATE ====================
const initialState = {
  userData: null,
  leads: null, 
      // Separate state for lead data
  loading: false,
  error: null,
};

// ==================== SLICE ====================
const userSlice = createSlice({
  name: "user",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    // User Dashboard
    builder
      .addCase(fetchDashboardUserData.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchDashboardUserData.fulfilled, (state, action) => {
        state.loading = false;
        state.userData = action.payload;
      })
      .addCase(fetchDashboardUserData.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      });

    // Lead Dashboard
    builder
      .addCase(fetchDashboardLeadData.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchDashboardLeadData.fulfilled, (state, action) => {
        state.loading = false;
        state.leads = action.payload;
      })
      .addCase(fetchDashboardLeadData.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      });
  },
});

export default userSlice.reducer;
