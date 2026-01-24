import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";
import { base_URL } from "../../utils/BaseUrl";

// ===== Verify Company (license validate) =====
export const verifyCompany = createAsyncThunk(
  "company/verify",
  async (formData, { rejectWithValue }) => {
    try {
      const response = await axios.post(
        `${base_URL}license/validate`,
        formData,
        { withCredentials: true }
      );
      return response.data;
    } catch (error) {
      return rejectWithValue(
        error.response?.data?.message || error.message
      );
    }
  }
);

// ===== Get Company Details (from cookie/JWT) =====
export const companyDetails = createAsyncThunk(
  "company/details",
  async (_, { rejectWithValue }) => {
    try {
      const response = await axios.get(
        `${base_URL}license/get`,
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

// ===== Slice =====
const adminSlice = createSlice({
  name: "company",
  initialState: {
    loading: false,
    company: null,        // result of verifyCompany
    companyDetail: null,
    initialized:false,  // logged-in company data
    error: null,
  },
  reducers: {
    clearVerifyState: (state) => {
      state.loading = false;
      state.company = null;
      state.error = null;
    },
  },
  extraReducers: (builder) => {
    builder
      // VERIFY COMPANY
      .addCase(verifyCompany.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(verifyCompany.fulfilled, (state, action) => {
        state.loading = false;
        state.company = action.payload;
      })
      .addCase(verifyCompany.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })

      // GET COMPANY DETAILS
      .addCase(companyDetails.pending, (state) => {
        state.loading = true;
      })
      .addCase(companyDetails.fulfilled, (state, action) => {
        state.loading = false;
        state.initialized=true;
        state.companyDetail = action.payload;
        
      })
      .addCase(companyDetails.rejected, (state, action) => {
        state.loading = false;
         state.initialized=true;
        state.error = action.payload;
        
      });
  },
});

export const { clearVerifyState } = adminSlice.actions;
export default adminSlice.reducer;
