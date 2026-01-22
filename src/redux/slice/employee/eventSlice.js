import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";
import { base_URL } from "../../../utils/BaseUrl";

/* ================= CREATE EVENT ================= */

export const createEvent = createAsyncThunk(
  "event/create",
  async (formData, { rejectWithValue }) => {
    try {
        console.log('sdac')
      const res = await axios.post(`${base_URL}event/create`, formData, {
  headers: { "Content-Type": "application/json" },

      }  
      );

      return res.data;
    } catch (error) {
      return rejectWithValue(
        error.response?.data?.message || "Event creation failed"
      );
    }
  }
);

/* ================= SLICE ================= */

const eventSlice = createSlice({
  name: "event",
  initialState: {
    loading: false,
    error: null,
    success: false,
    event: null,
  },
  reducers: {
    resetEventState: (state) => {
      state.loading = false;
      state.error = null;
      state.success = false;
      state.event = null;
    },
  },
  extraReducers: (builder) => {
    builder

      /* CREATE EVENT */
      .addCase(createEvent.pending, (state) => {
        state.loading = true;
        state.error = null;
        state.success = false;
      })

      .addCase(createEvent.fulfilled, (state, action) => {
        state.loading = false;
        state.success = true;
        state.event = action.payload.data;
      })

      .addCase(createEvent.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
        state.success = false;
      });
  },
});

export const { resetEventState } = eventSlice.actions;
export default eventSlice.reducer;
