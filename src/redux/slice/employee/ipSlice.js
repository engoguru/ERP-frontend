import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";
import { base_URL } from "../../../utils/BaseUrl";

// Create IP
export const createIp = createAsyncThunk(
  "ip/createIp",
  async (ipData, { rejectWithValue }) => {
    try {
      const response = await axios.post(`${base_URL}ip/create`, ipData,{withCredentials:true

      });
      return response.data; // { success: true, data: {...} }
    } catch (error) {
      return rejectWithValue(
        error.response?.data?.message || "Failed to create IP"
      );
    }
  }
);


const ipSlice = createSlice({
  name: "ip",
  initialState: {
    ipList: [],
    loading: false,
    error: null,
    success: false,
  },
  reducers: {
    resetIpState: (state) => {
      state.loading = false;
      state.error = null;
      state.success = false;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(createIp.pending, (state) => {
        state.loading = true;
        state.error = null;
        state.success = false;
      })
      .addCase(createIp.fulfilled, (state, action) => {
        state.loading = false;
        state.success = true;
        state.ipList.push(action.payload.data);
      })
      .addCase(createIp.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      });
  },
});

export const { resetIpState } = ipSlice.actions;

export default ipSlice.reducer;
